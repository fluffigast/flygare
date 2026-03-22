#!/bin/bash
# One-time setup: Azure Files persistent storage for CMS SQLite database
# Run this before the first CMS deployment
set -euo pipefail

RG="rg-joltjoker"
LOCATION="swedencentral"
CAE="cae-flygare"
STORAGE_ACCOUNT="stflygaredata"
SHARE_NAME="flygare-cms-data"
STORAGE_MOUNT_NAME="cmsdata"

echo "=== 1. Create storage account ==="
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RG" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  -o none

echo "=== 2. Get storage account key ==="
STORAGE_KEY=$(az storage account keys list \
  --account-name "$STORAGE_ACCOUNT" \
  --resource-group "$RG" \
  --query '[0].value' -o tsv)

echo "=== 3. Create file share ==="
az storage share create \
  --name "$SHARE_NAME" \
  --account-name "$STORAGE_ACCOUNT" \
  --account-key "$STORAGE_KEY" \
  -o none

echo "=== 4. Add storage to Container Apps Environment ==="
az containerapp env storage set \
  --name "$CAE" \
  --resource-group "$RG" \
  --storage-name "$STORAGE_MOUNT_NAME" \
  --azure-file-account-name "$STORAGE_ACCOUNT" \
  --azure-file-account-key "$STORAGE_KEY" \
  --azure-file-share-name "$SHARE_NAME" \
  --access-mode ReadWrite \
  -o none

echo "=== 5. Mount storage to container ==="
az containerapp update \
  --name "$CONTAINER_APP_NAME" \
  --resource-group "$RG" \
  --set-env-vars "DATABASE_URL=file:/app/data/flygare.db" \
  -o none

# Note: Volume mount must be added via ARM template or az containerapp create --yaml
# because `az containerapp update` doesn't support --mount-volume directly.
# Use this YAML patch or the Azure Portal:
cat <<'YAML'

Add to container app YAML spec:
  template:
    containers:
      - name: flygare-cms
        volumeMounts:
          - volumeName: cmsdata
            mountPath: /app/data
    volumes:
      - name: cmsdata
        storageName: cmsdata
        storageType: AzureFile
YAML

echo ""
echo "=== DONE ==="
echo "Storage account: $STORAGE_ACCOUNT"
echo "File share:      $SHARE_NAME"
echo "Mount name:      $STORAGE_MOUNT_NAME"
echo "Mount path:      /app/data"
