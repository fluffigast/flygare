import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Åre Skärm- och Drakflygklubb";
const SITE_URL = "https://flygare.nu";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero-paragliding.jpg`;
const DEFAULT_DESC =
  "Åre Skärm- och Drakflygklubb — skärm- och drakflyg från Åreskutan sedan 1976. Startplatser, väder, flygregler, klubbresor och tävlingar.";

export interface SEOProps {
  /** Sidans titel (utan " – Åre..."-suffix, det läggs till automatiskt) */
  title?: string;
  /** Meta-beskrivning (max ~155 tecken). Faller tillbaka på DEFAULT_DESC. */
  description?: string;
  /** Absolut URL till bild för OG/Twitter. Faller tillbaka på hero. */
  image?: string;
  /** Path (utan domän) för canonical URL. */
  path?: string;
  /** "website" | "article" — påverkar OG-typ. */
  type?: "website" | "article";
}

/**
 * SEO-komponent per sida. Sätter title/description + OG- och Twitter-tags.
 *
 * Måste ha HelmetProvider som ancestor (satt i main.tsx runt <BrowserRouter>).
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_OG_IMAGE,
  path = "",
  type = "website",
}) => {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const desc = description.length > 155 ? description.slice(0, 152) + "…" : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="sv_SE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
