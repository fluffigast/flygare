# flygare.nu — cutover till Azure (Loopia kvar)

Datum: 2026-06-30 (uppdaterad 2026-09-08)
Status: **CI/CD deploy:ar frontend till Azure Static Web Apps
(`brave-tree-08c5f0c03.4.azurestaticapps.net`) — DNS ej flyttad. flygare.nu
pekar fortfarande på Loopia/WordPress (46.246.119.63).**

## Kortaste vägen till cutover (utan Container Apps + Caddy)

Om Caddy/Coraza inte är kritiskt just nu — SWA har redan managed cert, CDN
och SPA-fallback. Enklaste path:

1. **Azure Portal → SWA `brave-tree-...` → Custom domains → Add** för både
   `flygare.nu` (Apex) och `www.flygare.nu`. Azure ger dig verification-token.
2. **Loopia cPanel Zone Editor**:
   - `flygare.nu` A → SWA:s IP (visas i Add-flödet) ELLER ALIAS/ANAME → SWA-FQDN
   - `www.flygare.nu` CNAME → `brave-tree-08c5f0c03.4.azurestaticapps.net`
   - `_dnsauth.flygare.nu` TXT → verification-token från steg 1
3. **Sänk TTL till 300 s** innan A-recordet ändras (samma dag).
4. Vänta på cert-provisionering (~5–20 min) → cutover klar.

MX/SPF/DKIM/autodiscover ORÖRDA (mail fortsätter på Loopia).

Detta hoppar över Phase 0–3 nedan (Container Apps + Caddy + Coraza + WAF).
Använd de faserna när du vill ha SIEM-loggning + WAF-regler.

---

## Full plan (Container Apps + Caddy + Coraza)

## Scope

Webben flyttas till Azure Container Apps. **Loopia behålls för domän, DNS, mail.** Front Door planeras senare; just nu sköts skyddet av en Caddy + Coraza-WAF inuti frontend-containern.

## Slutarkitektur

```
DNS @ Loopia  (mail-records ORÖRDA — mail.flygare.nu / MX / SPF / DKIM / autodiscover)
  flygare.nu        A      20.54.25.205        ← byts från 46.246.119.63
  www.flygare.nu    CNAME  flygare-web.greensea-05d6e47b.northeurope.azurecontainerapps.io
  cms.flygare.nu    CNAME  flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io
  asuid             TXT    <verification token för apex>
  asuid.www         TXT    <verification token för www>
  asuid.cms         TXT    <verification token för cms>

Container Apps Environment cae-flygare (static IP 20.54.25.205, delad mellan apparna)
  flygare-web   NY     Caddy + Coraza/OWASP CRS, serverar Vite-build
                       custom domains: flygare.nu + www.flygare.nu, managed cert
  flygare-cms   FINNS  custom domain: cms.flygare.nu, managed cert
                       skydd: Payload-inloggning + rate-limit (ingen IP-restriction)
```

## Variabler

```bash
export SUB=2cb112b2-024a-4ebd-a136-c95ade1d8def
export RG=rg-joltjoker
export ENV_NAME=cae-flygare
export ENV_IP=20.54.25.205
export ACR=flygareacr
export WEB_APP=flygare-web
export CMS_APP=flygare-cms
export DOMAIN=flygare.nu
az account set --subscription "$SUB"
```

---

## Fas 0 — Bygg och deploya frontend-containern

### 0.1 Lägg till Dockerfile + Caddyfile i repot

Se `docs/web-container/` (skapas i samma commit).

- `Dockerfile.web` — multi-stage: Vite-build + Caddy-with-Coraza runtime
- `Caddyfile` — serverar `/srv` med Coraza-direktiv som laddar OWASP CRS

### 0.2 Bygg och pusha image
```bash
az acr login --name $ACR
docker build -t $ACR.azurecr.io/flygare-web:1.0.0 -f Dockerfile.web .
docker push $ACR.azurecr.io/flygare-web:1.0.0
```

### 0.3 Skapa Container App
```bash
az containerapp create -n $WEB_APP -g $RG --environment $ENV_NAME \
  --image $ACR.azurecr.io/flygare-web:1.0.0 \
  --target-port 8080 --ingress external \
  --registry-server $ACR.azurecr.io \
  --min-replicas 1 --max-replicas 3 \
  --cpu 0.5 --memory 1Gi
```

### 0.4 Verifiera på Azure-host innan DNS rörs
```bash
WEB_FQDN=$(az containerapp show -n $WEB_APP -g $RG --query properties.configuration.ingress.fqdn -o tsv)
curl -sI https://$WEB_FQDN/ | head -5
```
Sajten ska serveras korrekt. Coraza-WAF ska logga (kolla `az containerapp logs show -n $WEB_APP -g $RG --tail 50`).

### 0.5 Sänk TTL i cPanel (Zone Editor)

Logga in i cPanel → sektionen **Domains** → **Zone Editor** → klicka **Manage** bredvid `flygare.nu`.

Steg:
1. Hitta raden `flygare.nu` typ `A` värde `46.246.119.63`. Klicka **Edit**.
2. Ändra **TTL** från `14400` till `300`. Klicka **Save Record**.
3. Upprepa för `www` CNAME-raden (om den finns) — sätt TTL = 300.
4. Vänta nuvarande TTL ut (14400 s ≈ 4 h) innan Fas 3-flippen, så att alla resolvers ser den nya korta TTL:n.

*Verifiera:* `dig flygare.nu` ska efter ~4 h visa TTL nära 300 i svaret.

**Rör inte** dessa rader i Zone Editor — de hör till mailen:
- `mail` A, `webmail` A, `ftp` A, `cpanel` A
- `autodiscover` A, `autoconfig` A
- `flygare.nu` MX
- `flygare.nu` TXT som börjar med `v=spf1`
- `default._domainkey` TXT

---

## Fas 1 — Verifiera domänägarskap

Container Apps kräver TXT-record `asuid.<host>` med en verifierings-token innan custom domain kan addas.

### 1.1 Hämta tokens
```bash
WEB_VERID=$(az containerapp show -n $WEB_APP -g $RG --query properties.customDomainVerificationId -o tsv)
CMS_VERID=$(az containerapp show -n $CMS_APP -g $RG --query properties.customDomainVerificationId -o tsv)
echo "asuid           TXT  $WEB_VERID"
echo "asuid.www       TXT  $WEB_VERID"
echo "asuid.cms       TXT  $CMS_VERID"
```

### 1.2 Lägg in TXT-records i cPanel (Zone Editor)

cPanel → **Zone Editor** → **Manage** bredvid `flygare.nu` → knappen **+ Add Record** (eller dropdown **Add Record → Add "TXT" Record**).

Lägg till 3 TXT-records, en åt gången:

| Name | Type | TTL | Record / TXT Data |
|---|---|---|---|
| `asuid` | TXT | 300 | `<klistra in WEB_VERID från steg 1.1>` |
| `asuid.www` | TXT | 300 | `<samma WEB_VERID>` |
| `asuid.cms` | TXT | 300 | `<klistra in CMS_VERID från steg 1.1>` |

Anmärkningar för cPanel-rutan:
- Skriv bara `asuid` (utan `.flygare.nu`) — cPanel lägger till zon-suffixet själv.
- Värdet behöver INTE omges av citationstecken — cPanel lägger till dem.
- Klicka **Add Record** efter varje. Du ska se 3 nya rader i listan när du är klar.

### 1.3 Verifiera propagering
```bash
for n in asuid asuid.www asuid.cms; do
  dig +short TXT $n.$DOMAIN @ns65.manufrog.com
done
```

---

## Fas 2 — Koppla custom domains + managed cert

### 2.1 cms.flygare.nu på CMS-appen
```bash
az containerapp hostname add      -n $CMS_APP -g $RG --hostname cms.$DOMAIN
az containerapp hostname bind     -n $CMS_APP -g $RG --hostname cms.$DOMAIN \
  --environment $ENV_NAME --validation-method CNAME
```
*OBS:* `bind` med managed cert kräver att CNAME redan pekar på Container App-FQDN. Antingen lägg in CNAME först (Fas 3) och kör `bind` efter, eller binda med egen pfx från Let's Encrypt först.

### 2.2 www.flygare.nu på Web-appen — samma metod
```bash
az containerapp hostname add  -n $WEB_APP -g $RG --hostname www.$DOMAIN
```

### 2.3 flygare.nu (apex) på Web-appen
```bash
az containerapp hostname add  -n $WEB_APP -g $RG --hostname $DOMAIN
```
Apex valideras med A-record + TXT (asuid). Cert bindas efter DNS-flip.

---

## Fas 3 — DNS-flip i Loopia

### 3.1 Web-flip i cPanel (Zone Editor)

cPanel → **Zone Editor** → **Manage** bredvid `flygare.nu`.

**Steg 1: ändra apex A-record**
1. Hitta raden `flygare.nu` typ `A` värde `46.246.119.63`.
2. **Skriv ner det gamla värdet** (`46.246.119.63`) på papper — behövs för rollback.
3. Klicka **Edit**. Ändra **Record** till `20.54.25.205`. **TTL** ska vara `300`. Klicka **Save Record**.

**Steg 2: hantera `www`**
- Om en `www` CNAME redan finns och pekar på `flygare.nu`: klicka **Edit** på den, ändra **Record** till `flygare-web.greensea-05d6e47b.northeurope.azurecontainerapps.io`, sätt **TTL** = `300`, **Save Record**.
- Om `www` inte finns: **+ Add Record** → Type `CNAME`, Name `www`, TTL `300`, Record `flygare-web.greensea-05d6e47b.northeurope.azurecontainerapps.io`, **Add Record**.

**Steg 3: lägg till `cms`**
**+ Add Record** → Type `CNAME`, Name `cms`, TTL `300`, Record `flygare-cms.greensea-05d6e47b.northeurope.azurecontainerapps.io`, **Add Record**.

**Glöm inte:** punkt i slutet av CNAME-värdet är inte obligatorisk i cPanel — det auto-kompletteras. Lägg INTE till `.flygare.nu` på Name-fältet.

### 3.2 Bind managed certs (efter DNS propagerat)
```bash
for HOST in $DOMAIN www.$DOMAIN; do
  az containerapp hostname bind -n $WEB_APP -g $RG --hostname $HOST \
    --environment $ENV_NAME --validation-method CNAME
done
az containerapp hostname bind -n $CMS_APP -g $RG --hostname cms.$DOMAIN \
  --environment $ENV_NAME --validation-method CNAME
```

### 3.3 Verifiera
```bash
for h in $DOMAIN www.$DOMAIN cms.$DOMAIN; do
  echo "--- $h ---"
  curl -sI https://$h/ | head -5
done
```
- `flygare.nu` → frontend via Caddy/Coraza
- `www.flygare.nu` → samma
- `cms.flygare.nu` → Payload

### 3.4 Höj TTL tillbaka
När allt är stabilt: sätt TTL = 3600 i Loopia.

---

## Rollback

| Symtom | Åtgärd | Tid |
|---|---|---|
| Web pekar fel | Loopia: sätt apex A tillbaka till `46.246.119.63`, ta bort `www`/`cms` CNAMEs | 5 min vid TTL 300 |
| Cert-bind fails | Container App fortsätter svara HTTP; vänta DNS, kör `bind` igen | — |
| Container-bygget kraschar | Frontend stannar på gamla Loopia-IPn så länge DNS inte är flippat | ingen påverkan |
| Mail bryts | Bör inte hända (orörda records). Verifiera med `dig MX flygare.nu` | omedelbart synligt |

## Records som ALDRIG ska röras under denna flytt

- `mail` A
- `webmail` A
- `ftp` A
- `cpanel` A
- `autodiscover` A
- `autoconfig` A
- MX
- TXT (SPF)
- `default._domainkey` TXT

## Pre-flight checklist

- [ ] Frontend-container byggd och pushad till ACR
- [ ] `flygare-web` Container App kör och svarar på `.azurecontainerapps.io`
- [ ] Coraza loggar 200/403 korrekt
- [ ] CMS svarar på `flygare-cms.greensea-...`
- [ ] Loopia DNS-editor-tillgång verifierad
- [ ] Loopia TTL sänkt till 300 (i god tid)
- [ ] Backup av Loopia-zonens nuvarande records exporterad (skärmdump eller textfil)
- [ ] `info@flygare.nu` mailtest skickat före + efter cutover

## Senare (uppskjutet)

- Front Door Standard + central WAF (ersätter Coraza-inuti-container)
- DMARC TXT (`v=DMARC1; p=none; rua=mailto:postmaster@flygare.nu`)
- Städa dubbletter: `flygare-pg` vs `flygare-website-server`, `flygareacr` vs `joltjokerflygareacr`
- Riv ACS-domänen `flygare-email/flygare.nu` (oanvänd) eller aktivera den separat för transaktionsmail
