import { NewsApiArticle } from "./news-api-article"

export interface NewsApiOk {
    status: string
    totalResults: number
    articles: NewsApiArticle[]
}