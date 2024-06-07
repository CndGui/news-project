'use client'

import { Article } from "@/interfaces/article"
import { useNews } from "@/lib/contexts/news-context"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetalhedPage({ params }: { params: { slug: string } }) {
    const title = decodeURIComponent(params.slug).replace(/-/g, " ")

    const { news } = useNews()

    const router = useRouter()

    const [article, setArticle] = useState<Article>()

    useEffect(() => {
        if (news.find((article) => article.title.toLowerCase() == title)) {
            setArticle(news.find((article) => article.title.toLowerCase() == title))
        } else {
            router.push("/")
        }
    }, [news])

    return (
        article &&
        <div className="flex flex-col justify-center items-center py-4 mx-[40rem] max-[1746px]:mx-[30rem] max-[1537px]:mx-[24rem] max-[1281px]:mx-[18rem] max-[1098px]:mx-[10rem] max-[961px]:mx-[4rem] max-md:mx-[1rem]">
            <div className="flex flex-col gap-5">
                <p className="text-2xl">{article.title}</p>

                <p>{article.introduction}</p>
            </div>

            <div className="border rounded-md bg-slate-100 p-2 mt-6">
                <div className="flex mb-2">
                    <a href={article.font.url} className="hover:text-purple-800 text-sm">{article.font.name}</a>

                    <p className="text-sm ml-auto">{format(new Date(article.publishedAt), "dd/MM/yyyy HH:mm")}</p>
                </div>

                <img src={article.imageUrl} alt="Image" />
            </div>

            <p className="mt-6">{article.content.substring(0, 200)}</p>

            <a className="mt-10" href={article.font.url}>Clique aqui para terminar de ler sua notícia</a>
        </div>
    )
}