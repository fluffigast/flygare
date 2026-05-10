import { useState, useEffect } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { fetchCollection, fetchGlobal, fetchWithFallback, CMS_URL } from "../lib/cms";

// Generic hook: tries CMS, falls back to local data
function useCMSData<T>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchWithFallback(fetcher, fallback).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, loading };
}

// ── Live Preview wrapper for globals ──
// Use this in views that display a single CMS global.
// The Payload admin sends live field changes via postMessage.
// Returns the live-updated data when inside the CMS iframe, otherwise returns initialData unchanged.
export function useGlobalLivePreview<T extends Record<string, any>>(initialData: T): T {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL: CMS_URL || "",
    depth: 2,
  });
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
