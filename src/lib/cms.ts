const CMS_URL = import.meta.env.VITE_PAYLOAD_URL || "";

interface CollectionResponse<T> {
  docs: T[];
  totalDocs: number;
}

// One-time probe: if CMS_URL is set but the server isn't running we don't want
// every page to log a TCP refusal to the browser console. After the first
// failure, mark the CMS as offline for this session and short-circuit fetches.
let cmsOffline = false;

async function fetchCollection<T>(slug: string, params = ""): Promise<T[]> {
  if (!CMS_URL || cmsOffline) throw new Error("No CMS URL");
  try {
    const res = await fetch(`${CMS_URL}/api/${slug}?limit=100${params}`);
    if (!res.ok) throw new Error(`CMS ${slug}: ${res.status}`);
    const json: CollectionResponse<T> = await res.json();
    return json.docs;
  } catch (err) {
    cmsOffline = true;
    throw err;
  }
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  if (!CMS_URL || cmsOffline) throw new Error("No CMS URL");
  try {
    const res = await fetch(`${CMS_URL}/api/globals/${slug}`);
    if (!res.ok) throw new Error(`CMS global ${slug}: ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    cmsOffline = true;
    throw err;
  }
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
