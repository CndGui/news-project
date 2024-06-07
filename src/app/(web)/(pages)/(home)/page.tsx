'use client'

import { useNews } from "@/lib/contexts/news-context"
import { getArticles } from "@/lib/hooks/get-articles"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HomePage() {
    const [pages, setPages] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const {news, setNews} = useNews()

    const router = useRouter()

    useEffect(() => {
        setNews([])
        setPages(0)
        async function get() {
            const response = await getArticles({ page: page })
            if (response.data) {
                setNews(response.data.articles)
                setPages(response.data.maxPages)
            }
        }

        get()
    }, [page])

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl font-semibold mb-6">Principais notícias</h1>

            <div className="grid grid-cols-2 max-[1098px]:grid-cols-1 gap-x-16 gap-y-5">
                {news.map((article, index) => (
                    <div
                        key={index}
                        className="flex w-[32rem] h-56 bg-slate-400/25 border border-slate-300 rounded-md overflow-hidden cursor-pointer"
                        onClick={() => {router.push(`/${article.title.replace(/\s+/g, '-')}`)}}
                    >
                        <div className="w-40 min-w-40 h-full">
                            <img src={article.imageUrl} alt="Image" className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4 flex flex-col">
                            <p className="font-medium">{article.title}</p>

                            <p className="mt-3 text-sm">
                                {
                                    article.introduction.length > 99 ?
                                    article.introduction.substring(0, 150).replace(/\.+$/, '') + "..." :
                                    article.introduction
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mt-6">{Array.from({ length: pages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => { setPage(index + 1) }}
                    disabled={(index + 1) == page}
                    className="disabled:text-neutral-500"
                >
                    {index + 1}
                </button>
            ))}</div>
        </div>
    )
}