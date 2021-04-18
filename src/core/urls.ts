import { TrendingParams } from "./models/TrendingParams";

const BASE_URL = `https://github.com/trending`;

export const generateUrl = (params: TrendingParams): string => {
    let url = new URL(BASE_URL);
    
    if(params.language){
        url.pathname = `trending/${params.language}`;
    }
    if(params.since){
        url.searchParams.append(`since`, params.since);
    }
    if(params.spoken_language_code){
        url.searchParams.append(`spoken_language_code`, params.spoken_language_code);
    }
    return url.href;
}