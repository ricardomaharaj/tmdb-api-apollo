export interface SearchResult {
    poster_path?:       string
    popularity?:        number
    id?:                number
    overview?:          string
    backdrop_path?:     string
    vote_average?:      number
    media_interface?:   string
    first_air_date?:    string
    origin_country?:    string
    genre_ids?:         number
    original_language?: string
    vote_count?:        number
    name?:              string
    original_name?:     string
    adult?:             boolean
    release_date?:      string
    original_title?:    string
    title?:             string
    video?:             boolean
    profile_path?:      string
}

export interface SearchResponse { results?: SearchResult[] }

interface Genre {
    id?:   number
    name?: string
}

interface ProductionCompany {
    id?:             number
    logo_path?:      string
    name?:           string
    origin_country?: string
}

interface ProductionCountry {
    iso_3166_1?: string
    name?:       string
}

interface SpokenLanguage {
    iso_639_1?: string
    name?:      string
}

interface CreatedBy {
    id?:           number
    credit_id?:    string
    name?:         string
    gender?:       number
    profile_path?: string
}

interface LastEpisodeToAir {
    air_date?:        string
    episode_number?:  number
    id?:              number
    name?:            string
    overview?:        string
    production_code?: string
    season_number?:   number
    still_path?:      string
    vote_average?:    number
    vote_count?:      number
}

interface Network {
    name?:           string
    id?:             number
    logo_path?:      string
    origin_country?: string
}

interface Season {
    air_date?:      string
    episode_count?: number
    id?:            number
    name?:          string
    overview?:      string
    poster_path?:   string
    season_number?: number
}

export interface Movie {
    adult?:                 boolean
    backdrop_path?:         string
    budget?:                number
    genres?:                Genre[]
    homepage?:              string
    id?:                    number
    imdb_id?:               string
    original_language?:     string
    original_title?:        string
    overview?:              string
    popularity?:            number
    poster_path?:           string
    production_companies?:  ProductionCompany[]
    production_countries?:  ProductionCountry[]
    release_date?:          string
    revenue?:               number
    runtime?:               number
    spoken_languages?:      SpokenLanguage[]
    status?:                string
    tagline?:               string
    title?:                 string
    video?:                 boolean
    vote_average?:          number
    vote_count?:            number
}

export interface TV {
    backdrop_path?:        string
    created_by?:           CreatedBy
    episode_run_time?:     number
    first_air_date?:       string
    genres?:               Genre[]
    homepage?:             string
    id?:                   number
    in_production?:        boolean
    languages?:            string
    last_air_date?:        string
    last_episode_to_air?:  LastEpisodeToAir
    name?:                 string
    networks?:             Network[]
    number_of_episodes?:   number
    number_of_seasons?:    number
    origin_country?:       string
    original_language?:    string
    original_name?:        string
    overview?:             string
    popularity?:           number
    poster_path?:          string
    production_companies?: ProductionCompany[]
    production_countries?: ProductionCountry[]
    seasons?:              Season[]
    spoken_languages?:     SpokenLanguage[]
    status?:               string
    tagline?:              string
    interface?:            string
    vote_average?:         number
    vote_count?:           number
}


export interface ResolverArguments { id?: number, query: string }
