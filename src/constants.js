const FETCH_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s";

const header = new Headers({
    "Content-Type": "application/json",
    'fetch-api-key': FETCH_API_KEY
});

const FETCH_API = "https://frontend-take-home-service.fetch.com";

const MAX_PAGE = 10;
const DATA_PER_PAGE = 25;

const COMMON_ARG = {
    method: 'GET',
    credentials: 'include',
    headers: header
}

const FILTERS_MENU = ["Breeds", "States", "Cities"];
const SORT_BY = [{value: 'asc', label: 'A to Z'}, {value: 'desc', label: 'Z to A'}];
const DEFAULT_MAX_AGE = {value: 14, label: 14};
const DEFAULT_MIN_AGE = {value: 1, label: 1};
const AGE_MENU = Array.from({length: DEFAULT_MAX_AGE.value}, (_, i) => i + 1);
const DEFAULT_SEARCH_QUERY = '/dogs/search?';

export {
    FETCH_API,
    header,
    MAX_PAGE,
    DATA_PER_PAGE,
    COMMON_ARG,
    FILTERS_MENU,
    SORT_BY,
    AGE_MENU,
    DEFAULT_MAX_AGE,
    DEFAULT_MIN_AGE,
    DEFAULT_SEARCH_QUERY
}