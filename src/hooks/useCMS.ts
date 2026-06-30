import { useState, useEffect } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { fetchCollection, fetchGlobal, fetchWithFallback, CMS_URL } from "../lib/cms";

// Generic hook: tries CMS, falls back to local data
function useCMSData<T>(fetcher: () => Promise<T>, fallback: T, deps: unknown[] = []) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchWithFallback(fetcher, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, loading };
}

// ── Live Preview wrapper for globals ──
// The Payload admin sends live field changes via postMessage when the
// frontend is loaded in the CMS iframe. useLivePreview listens for these
// events and merges incoming data into the returned object.
// We always call the hook (Rules of Hooks) but only use its output when
// we detect we're inside an iframe with a valid CMS URL.

export function useGlobalLivePreview<T extends Record<string, any>>(initialData: T): T {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL: CMS_URL || "https://localhost:3001",
    depth: 2,
  });
  // Outside the iframe or without CMS_URL, return initialData unchanged.
  // Inside the iframe, return the live-merged data from postMessage.
  if (!CMS_URL) return initialData;
  return data;
}

// ── Collection hooks ──

export const useNews = (fallback: any[]) =>
  useCMSData(() => fetchCollection("news", "&sort=-date"), fallback);

export const useBoardMembers = (fallback: any[]) =>
  useCMSData(() => fetchCollection("board-members", "&sort=sortOrder"), fallback);

export const useLaunches = (fallback: any[]) =>
  useCMSData(() => fetchCollection("launches", "&sort=sortOrder"), fallback);

export const useMilestones = (fallback: any[]) =>
  useCMSData(() => fetchCollection("milestones", "&sort=year"), fallback);

export const useWeatherLinks = (fallback: any[]) =>
  useCMSData(() => fetchCollection("weather-links", "&sort=sortOrder"), fallback);

export const useCompetitions = (fallback: any[]) =>
  useCMSData(() => fetchCollection("competitions"), fallback);

// ── Global hooks ──

export const useSiteSettings = (fallback: any) =>
  useCMSData(() => fetchGlobal("site-settings"), fallback);

export const useMembershipInfo = (fallback: any) =>
  useCMSData(() => fetchGlobal("membership-info"), fallback);

export const useContactInfo = (fallback: any) =>
  useCMSData(() => fetchGlobal("contact-info"), fallback);

export const usePage = (slug: string, fallback: any) =>
  useCMSData(
    () =>
      fetchCollection(
        "pages",
        `&${new URLSearchParams({ "where[slug][equals]": slug, limit: "1" }).toString()}`,
      ).then((docs) => docs[0] ?? fallback),
    fallback,
    [slug],
  );

export const useActivities = (fallback: any[]) =>
  useCMSData(() => fetchCollection("activities", "&sort=-date"), fallback);

export const useDocuments = (fallback: any[]) =>
  useCMSData(() => fetchCollection("documents", "&sort=-year"), fallback);

export const usePhotos = (fallback: any[]) =>
  useCMSData(() => fetchCollection("photos", "&sort=-year"), fallback);

// ── Global hooks ──

export const useSiteNavigation = (fallback: any) =>
  useCMSData(() => fetchGlobal("site-navigation"), fallback);

export const useClubInfo = (fallback: any) =>
  useCMSData(() => fetchGlobal("club-info"), fallback);

export const useBusRules = (fallback: any) =>
  useCMSData(() => fetchGlobal("bus-rules"), fallback);

export const useFlyingGuide = (fallback: any) =>
  useCMSData(() => fetchGlobal("flying-guide"), fallback);
