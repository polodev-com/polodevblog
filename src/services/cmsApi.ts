"use client";
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export interface Article {
    id: number;
    title: string;
    status: 'delisted' | 'published' | 'hidden';
    author: {
        name: string;
        avatarUrl: string;
    };
    description: string;
    publish_on: string;
    keywords: string[];
    thumbnail: string;
    content: string; // The url that contains the markdown content
}

export interface ArticleListQueries {
    page?: number;
    pageSize?: number;
    sortby?: 'publish_on' | 'title';
    sorttype?: 'asc' | 'desc';
    keywords?: string;
}

const defaultListQueries: ArticleListQueries = {
    page: 1,
    pageSize: 10,
    sortby: 'publish_on',
    sorttype: 'desc',
    keywords: ''
}


// This hook is for client-side data fetching with SWR
export function useArticles(queryOptions: Partial<ArticleListQueries> = {}) {
    const queries = {...defaultListQueries, ...queryOptions};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const queryString = new URLSearchParams(queries).toString();

    const {data, error, isLoading} = useSWR(
        `${process.env.PUBLIC_CMS_API_HOST}/articles?${queryString}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {
        articles: data?.data || [],
        isLoading,
        isError: error
    };
}

export async function getArticleById(id: string): Promise<Article> {
    const response = await fetch(`${process.env.PUBLIC_CMS_API_HOST}/articles/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch article');
    }

    return response.json();
}