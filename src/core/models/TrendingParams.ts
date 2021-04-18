export interface TrendingParams {
    language?: language_t;
    spoken_language_code?: spoken_language_code_t;
    since?: since_t;
}

export type since_t = 'daily' | 'weekly' | 'monthly' | undefined;
export type language_t = string | undefined; // todo
export type spoken_language_code_t = string | undefined; // todo