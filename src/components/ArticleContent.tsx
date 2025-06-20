import React, {useEffect, useState} from 'react';
import remarkGfm from 'remark-gfm';
// import rehypeStarryNight from 'rehype-starry-night'
import rehypeRaw from "rehype-raw";
// import {Article} from '@/services/cmsApi';
// import {MarkdownHooks} from "react-markdown";
import MDEditor from '@uiw/react-md-editor';
import {CustomNavbar} from "@/components/CustomNavbar";
import {Article} from "@/services/cmsApi";
import Image from "next/image";

export const ArticleContent = ({article}: { article: Article }) => {
    const [markdownContent, setMarkdownContent] = useState("");
    useEffect(() => {
        if (article.content) {
            fetch(article.content)
                .then(response => response.text())
                .then(text => setMarkdownContent(text))
        }
    }, [article.content]);
    return (
        <div className="max-w-3xl mx-auto">
            <CustomNavbar/>
            <main className="container mx-auto px-2 py-8 pt-28">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
                <div className="flex items-center mb-8 text-gray-500">
                    <Image width={40} height={40} className="w-12 h-12 rounded-full mr-4" src={article.author.avatarUrl}
                           alt={article.author.name}/>
                    <div>
                        <p className="font-semibold text-gray-800">{article.author.name}</p>
                        <p>{article.publish_on}</p>
                    </div>
                </div>
                {/* The `prose` class from TailwindCSS provides beautiful typography styling for markdown content */}
                {/*<article className="prose lg:prose-xl max-w-none">*/}
                <article>
                    {/*<MarkdownHooks remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>*/}
                    {/*    {article.markdownContent}*/}
                    {/*</MarkdownHooks>*/}
                    {/*<MDEditor*/}
                    {/*    value={article.markdownContent}*/}
                    {/*    fullscreen={true}*/}
                    {/*    // onChange={setValue}*/}
                    {/*/>*/}
                    <MDEditor.Markdown source={markdownContent}
                                       style={{whiteSpace: 'pre-wrap'}}
                                       wrapperElement={{"data-color-mode": "light"}}
                                       rehypePlugins={[rehypeRaw]}
                                       remarkPlugins={[remarkGfm]}
                    />
                </article>
            </main>

        </div>
    );
};
