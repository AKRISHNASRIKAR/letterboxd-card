/** Single source of truth for the URLs and copy repeated across sections. */

export const SITE_URL = 'https://letterboxd-card.vercel.app'
export const REPO_URL = 'https://github.com/AKRISHNASRIKAR/letterboxd-card-backend'

export const REPO_LINKS = [
  { label: 'GitHub',       href: REPO_URL },
  { label: 'Issues',       href: `${REPO_URL}/issues` },
  { label: 'MIT License',  href: `${REPO_URL}/blob/main/LICENSE` },
  { label: 'CONTRIBUTING', href: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
] as const

export const DEMO_USER = 'akrishnasrikar'
