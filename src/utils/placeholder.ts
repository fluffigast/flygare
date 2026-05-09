/**
 * Returns a stable image for a given ID string.
 * Same ID always returns the same image — no flickering on re-render.
 */
export function getPlaceholderImage(id: string): string {
  const images = getAllPlaceholderImages();
  if (images.length === 0) return 'https://placehold.co/400x600';
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return images[Math.abs(hash) % images.length];
}

/**
 * Gets a random image from the public/unsplash folder
 */
export function getRandomPlaceholderImage(): string {
  const images = getAllPlaceholderImages();
  if (images.length === 0) return 'https://placehold.co/400x600';
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export function getAllPlaceholderImages(): string[] {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const b = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  return [
    `${b}unsplash/_uP1NW_gbBU.jpg`,
    `${b}unsplash/-nte12rkTok.jpg`,
    `${b}unsplash/0s81Kf6lWzY.jpg`,
    `${b}unsplash/8mYncdaPc98.jpg`,
    `${b}unsplash/AVv_dVCQ5k8.jpg`,
    `${b}unsplash/BWJNI_g8FLw.jpg`,
    `${b}unsplash/dAj9D3q7kT0.jpg`,
    `${b}unsplash/EJFabiZWAiQ.jpg`,
    `${b}unsplash/ER7MHUngu_0.jpg`,
    `${b}unsplash/EvHdiHCZfEA.jpg`,
    `${b}unsplash/F8ccXuGnflg.jpg`,
    `${b}unsplash/g-EHLcgpVqQ.jpg`,
    `${b}unsplash/G8dAAP0IrRk.jpg`,
    `${b}unsplash/GPBeiGsbZ_4.jpg`,
    `${b}unsplash/jTP3p3tAF-E.jpg`,
    `${b}unsplash/jX61Kll0Q5g.jpg`,
    `${b}unsplash/kQu71SCrwns.jpg`,
    `${b}unsplash/NHEV2Vhv_uU.jpg`,
    `${b}unsplash/Nxn8Nm2yx0I.jpg`,
    `${b}unsplash/o2cZ37sR0u0.jpg`,
    `${b}unsplash/PtnZ24-yXdU.jpg`,
    `${b}unsplash/R4679uf28lY.jpg`,
    `${b}unsplash/sAMBxQHUfB0.jpg`,
    `${b}unsplash/sJbuC8T0yOw.jpg`,
    `${b}unsplash/tkrbKM0r_Rs.jpg`,
    `${b}unsplash/tqXOn8lw-kc.jpg`,
    `${b}unsplash/uQaXNlWfzuY.jpg`,
    `${b}unsplash/wKOErkcAjLo.jpg`,
    `${b}unsplash/WRncbwcYH3U.jpg`,
    `${b}unsplash/ywJVYGIgZw4.jpg`,
    `${b}unsplash/zcxr2cdQnig.jpg`,
  ];
}
