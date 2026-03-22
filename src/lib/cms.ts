const CMS_URL = import.meta.env.VITE_CMS_URL || "";

interface CollectionResponse<T> {
  docs: T[];
  totalDocs: number;
}

async function fetchCollection<T>(slug: string, params = ""): Promise<T[]> {
  if (!CMS_URL) throw new Error("No CMS URL");
  const res = await fetch(`${CMS_URL}/api/${slug}?limit=100${params}`);
  if (!res.ok) throw new Error(`CMS ${slug}: ${res.status}`);
  const json: CollectionResponse<T> = await res.json();
  return json.docs;
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  if (!CMS_URL) throw new Error("No CMS URL");
  const res = await fetch(`${CMS_URL}/api/globals/${slug}`);
  if (!res.ok) throw new Error(`CMS global ${slug}: ${res.status}`);
  return res.json() as Promise<T>;
}

/**
 * Try CMS first, fall back to local data.
 */
export async function fetchWithFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

// Re-export for use in hooks
export { fetchCollection, fetchGlobal, CMS_URL };
