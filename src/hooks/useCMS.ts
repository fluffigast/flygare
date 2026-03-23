import { useState, useEffect, useCallback } from "react";
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

// ── Live Preview hook ──
// Listens for postMessage from CMS admin panel.
// Call once per view, pass the setter for the data you want to update live.
export function useCMSLivePreview(onData: (data: any) => void) {
  const stableOnData = useCallback(onData, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Only activate when loaded inside an iframe (CMS admin Live Preview)
    if (window.self === window.top) return;

    // Tell the CMS admin we're ready to receive live updates
    window.parent.postMessage({ type: "payload-live-preview-ready" }, CMS_URL || "*");

    function handleMessage(event: MessageEvent) {
      // Validate origin matches CMS
      if (CMS_URL && event.origin !== new URL(CMS_URL).origin) return;

      const msg = event.data;
      if (msg?.type === "payload-live-preview") {
        stableOnData(msg.data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [stableOnData]);
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
