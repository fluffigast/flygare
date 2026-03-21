import { useState, useEffect } from 'react'
import {
  getNews,
  getBoardMembers,
  getLaunches,
  getOtherSites,
  getCompetitions,
  getMilestones,
  getWeatherLinks,
  getSiteSettings,
  getMembershipInfo,
  getContactInfo,
  getBusRules,
  getFlyingGuide,
  type NewsItem,
  type BoardMember,
  type Launch,
  type OtherSite,
  type Competition,
  type Milestone,
  type WeatherLink,
  type SiteSettings,
  type MembershipInfo,
  type ContactInfo,
  type BusRulesData,
  type FlyingGuide,
} from '../lib/payload'

function useCMSData<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetcher()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useNews() {
  return useCMSData<NewsItem[]>(getNews)
}

export function useBoardMembers() {
  return useCMSData<BoardMember[]>(getBoardMembers)
}

export function useLaunches() {
  return useCMSData<Launch[]>(getLaunches)
}

export function useOtherSites() {
  return useCMSData<OtherSite[]>(getOtherSites)
}

export function useCompetitions() {
  return useCMSData<Competition[]>(getCompetitions)
}

export function useMilestones() {
  return useCMSData<Milestone[]>(getMilestones)
}

export function useWeatherLinks() {
  return useCMSData<WeatherLink[]>(getWeatherLinks)
}

export function useSiteSettings() {
  return useCMSData<SiteSettings>(getSiteSettings)
}

export function useMembershipInfo() {
  return useCMSData<MembershipInfo>(getMembershipInfo)
}

export function useContactInfo() {
  return useCMSData<ContactInfo>(getContactInfo)
}

export function useBusRules() {
  return useCMSData<BusRulesData>(getBusRules)
}

export function useFlyingGuide() {
  return useCMSData<FlyingGuide>(getFlyingGuide)
}
