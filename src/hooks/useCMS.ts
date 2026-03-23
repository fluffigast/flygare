import { useState, useEffect, useRef } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { fetchCollection, fetchGlobal, fetchWithFallback, CMS_URL } from "../lib/cms";

const serverURL = CMS_URL || undefined;

// Generic hook: tries CMS, falls back to local data, then threads through Live Preview
function useCMSData<T extends Record<string, any>>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const resolved = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetchWithFallback(fetcher, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
        resolved.current = true;
      }
    });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Live Preview: listens for postMessage from CMS admin iframe
  const { data: liveData } = useLivePreview<T>({
    initialData: data,
    serverURL: serverURL ?? "",
    depth: 2,
  });

  return { data: liveData, loading };
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
