import { ApiResult } from "@/interfaces/api-result"

interface Props {
    sortBy?: string
    page?: number
    pageSize?: number
    language?: string
}

interface Response {
    status: number
    data: ApiResult | null
}

export async function getArticles(params?: Props): Promise<Response> {
    try {
        let searchParams: string[] = []
    
        if(params) {
            const paramsArray = Object.entries(params)
            for(let i in paramsArray) {
                const key = paramsArray[i][0]
                const value = paramsArray[i][1]

                searchParams.push(`${key}=${value}`)
            }
        }

        const response = await fetch(`api/news${params ? `?${searchParams.join("&")}` : ""}`)
        if(response.ok) {
            return {
                status: response.status,
                data: await response.json()
            }
        }else {
            return {
                status: response.status,
                data: null
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}