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
  thisYearInfo?: {
    year: number
    accuracy: "exact" | "lower_bound" | "unavailable"
    source: "profile" | "rss" | null
  }
  recentFilms: Film[]
  fetchedAt:   number
}
