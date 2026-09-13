// Auto-loadable migration-registry. Payload läser denna via
// `import { migrations } from './migrations'` när prodMigrations
// konfigureras i payload.config.ts, samt av CLI `payload migrate`.

import * as m_20260909_add_pptx_audit_fields from './20260909_000000_add_pptx_audit_fields'
import * as m_20260911_migrate_news_categories from './20260911_000000_migrate_news_categories'

export const migrations = [
  {
    up: m_20260909_add_pptx_audit_fields.up,
    down: m_20260909_add_pptx_audit_fields.down,
    name: '20260909_000000_add_pptx_audit_fields',
  },
  {
    up: m_20260911_migrate_news_categories.up,
    down: m_20260911_migrate_news_categories.down,
    name: '20260911_000000_migrate_news_categories',
  },
]
