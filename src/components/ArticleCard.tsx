import React from 'react';
import {Article} from "@/services/cmsApi";
import Link from "next/link";

export const ArticleCard = ({article}: { article: Article }) => (
    <Link href={`/articles/${article.id}`} passHref>
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-50 w-full object-cover" src={article.imageUrl} onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400/ccc/ffffff?text=Image+Error';
            }} alt={`Image for ${article.title}`}/>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 h-15 overflow-hidden text-ellipsis">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 h-15 overflow-hidden text-ellipsis">
                    {article.summary}
                </p>
                <div className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-10 h-10 rounded-full mr-4" src={article.author.avatarUrl} onError={(e) => {
                        e.currentTarget.src = 'https://i.pravatar.cc/40';
                    }} alt={article.author.name}/>
                    <div className="text-sm">
                        <p className="text-gray-900 font-semibold">{article.author.name}</p>
                        <p className="text-gray-500">{article.publishedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);