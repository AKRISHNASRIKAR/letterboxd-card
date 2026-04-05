export interface Film {
  slug:      string
  name:      string
  rating:    string
  year:      string
  posterUrl: string
}

export interface LetterboxdStats {
  username:    string
  displayName: string
  memberSince: string
  avatar:      string
  stats: {
    totalFilms: number
    thisYear:   number
    following:  number
    followers:  number
    lists:      number
  }
  recentFilms: Film[]
  fetchedAt:   number
}

export type Theme = 'default' | 'dark' | 'minimal'

export interface CardConfig {
  username: string
  theme:    Theme
  width:    number
  count:    number
}
