import React, {useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {Article, useArticles} from "@/services/cmsApi";
import {ArticleCard} from "@/components/ArticleCard";

export const ArticleList = () => {
    const [page, setPage] = useState(1);
    const {articles, isLoading, isError} = useArticles({page, pageSize: 10});
    const [allArticles, setAllArticles] = useState<Article[]>([]);

    // Setup the intersection observer for infinite scrolling
    const {ref, inView} = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Update allArticles when new articles are loaded
    React.useEffect(() => {
        if (articles && articles.length > 0) {
            setAllArticles(prev => {
                // Create a Map with ID as key to prevent duplicates
                const articlesMap = new Map(prev.map(article => [article.id, article]));

                // Add new articles to the map
                articles.forEach((article: Article) => {
                    articlesMap.set(article.id, article);
                });

                // Convert map back to array
                return Array.from(articlesMap.values());
            });
        }
    }, [articles]);

    // Load more articles when user scrolls to the bottom
    React.useEffect(() => {
        if (inView && !isLoading && articles.length > 0) {
            setPage(prevPage => prevPage + 1);
        }
    }, [inView, isLoading, articles]);

    // Check if we've reached the end of the content
    const hasMoreContent = articles.length > 0;

    return (
        <div className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {allArticles.map((article) => (
                    <ArticleCard key={article.id} article={article}/>
                ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
                <div className="col-span-full text-center text-gray-500 py-4">
                    Loading more articles...
                </div>
            )}

            {/* Error message */}
            {isError && (
                <div className="col-span-full text-center text-red-500 py-4">
                    Error loading articles. Please try again.
                </div>
            )}

            {/* Intersection observer target - when this comes into view, load more */}
            {hasMoreContent && (
                <div ref={ref} className="h-10 w-full"/>
            )}

            {/* End of content message */}
            {!hasMoreContent && !isLoading && allArticles.length > 0 && (
                <div className="text-center text-gray-500 py-4">
                    No more articles :(
                </div>
            )}
        </div>
    );
};