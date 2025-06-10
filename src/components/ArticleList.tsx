import React, {useEffect, useState} from 'react';
import {Article} from "@/services/cmsApi";
import {ArticleCard} from "@/components/ArticleCard";
import {getArticles} from "@/services/cmsApi";

export const ArticleList = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function loadData() {
            try {
                const fetchedArticles = await getArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                // Optionally, set some error state to show in the UI
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
                <div className="col-span-full text-center text-gray-500">Loading articles...</div>
            ) : (
                articles.map((article) => (
                    <ArticleCard key={article.id} article={article}/>
                ))
            )}
        </div>
    );
};
