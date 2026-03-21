import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { importMap } from '../importMap'
import config from '@payload-config'

export { generatePageMetadata as generateMetadata } from '@payloadcms/next/views'

import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

const Page = ({ params, searchParams }: AdminViewProps) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
