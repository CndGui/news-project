import { NextRequest, NextResponse } from "next/server";
import { NewsApiOk } from "../interfaces/news-api-ok";
import { NewsApiError } from "../interfaces/news-api-error";

enum StatusCode {
    BAD_REQUEST = 400
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const sortBy = searchParams.get("sortBy") ? searchParams.get("sortBy") : "publishedAt"
    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize") as string) : 10
    const language = searchParams.get("language") ? searchParams.get("language") : "pt"

    if(!pageSize || pageSize < 1) {
        return NextResponse.json({
            status: StatusCode.BAD_REQUEST,
            message: "Query params is incorrect."
        }, {
            status: StatusCode.BAD_REQUEST
        })
    }

    const apiKey = process.env.NEWSAPI_KEY

    const response = await fetch(
        `https://newsapi.org/v2/everything?q=a&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&language=${language}&apiKey=${apiKey}`
    )

    if(response.ok) {
        const data: NewsApiOk = await response.json()

        const filteredData = {
            results: data.totalResults,
            maxPages: (data.totalResults / pageSize) > 10 ? Math.floor(100 / pageSize) : Math.floor(data.totalResults / pageSize), // Esse "maxPages" é só para no front, eu ter uma ideia de quantas paginas irão ter
            articles: data.articles.map(article => ({
                font: {
                    name: article.source.name,
                    url: article.url
                },

                publishedAt: article.publishedAt,
                imageUrl: article.urlToImage,
                title: article.title,
                introduction: article.description,
                content: article.content
            }))
        }

        return NextResponse.json(filteredData)
    }else {
        const data: NewsApiError = await response.json()

        return NextResponse.json({
            status: response.status,
            message: data.message
        }, {
            status: response.status
        })
    }
}