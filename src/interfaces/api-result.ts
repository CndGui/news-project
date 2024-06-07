import { Article } from "./article"

export interface ApiResult {
    results: number
    maxPages: number
    articles: Article[]
}