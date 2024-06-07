'use client'

import { Article } from "@/interfaces/article"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface NewsContextType {
    news: Article[]
    setNews: Dispatch<SetStateAction<Article[]>>
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: React.ReactNode }) {
    const [news, setNews] = useState<Article[]>([])

    return (
        <NewsContext.Provider value={{news, setNews}}>
            {children}
        </NewsContext.Provider>
    )
}

export function useNews() {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error("Need a NewsProvider")
    }

    return context
}