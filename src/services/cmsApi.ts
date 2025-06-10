"use client";

export interface Article {
    id: string;
    title: string;
    author: {
        name: string;
        avatarUrl: string;
    };
    publishedDate: string;
    summary: string;
    imageUrl: string;
    markdownContent?: string; // Optional field for markdown content
}

const MOCK_ARTICLES = [
    {
        id: '1',
        title: 'The Future of Web Development with Next.js',
        author: {name: 'Polodev', avatarUrl: '/polodev-logo.jpg'},
        publishedDate: 'June 7, 2025',
        summary: 'Exploring the new features in Next.js 14 and how they are changing the landscape of web development.',
        imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Tech',
        markdownContent: `
Under this line will be rendered as markdown content in the article page.
\`\`\`javascript
    async function getData() {
        const res = await fetch('https://api.example.com/...')
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return res.json()
    }

    export default async function Page() {
        const data = await getData()

        return <main>{/* ... */} < /main>
    }
\`\`\`


Under this line will be rendered as markdown content in the article page.
\`\`\`javascript
    async function getData() {
        const res = await fetch('https://api.example.com/...')
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return res.json()
    }

    export default async function Page() {
        const data = await getData()

        return <main>{/* ... */} < /main>
    }
\`\`\`

Under this line will be rendered as markdown content in the article page.
\`\`\`javascript
    async function getData() {
        const res = await fetch('https://api.example.com/...')
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return res.json()
    }

    export default async function Page() {
        const data = await getData()

        return <main>{/* ... */} < /main>
    }
\`\`\`
            `
    },
    {
        id: '2',
        title: 'A Deep Dive into Headless CMS Architectures',
        author: {name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026702d'},
        publishedDate: 'June 5, 2025',
        summary: 'Headless CMS offers unparalleled flexibility. We look at the pros and cons of different architectures.',
        imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=CMS',
        markdownContent: `
\\![\\[Pasted image 20240821205927.png\\]\\]

## APIs descriptions

## Get article by id

Public endpoint:

    https://cms-api.tienhoangdev.com/articles/:id

Method: **GET** Response:

\`\`\` json
{
    "id":1,
    "title":"Title of the article",
    "keywords":["kw1","kw2"],
    "content":"https://minio-host.tienhoangdev.com/cms-data/1/content.md"
}
\`\`\`

### Upload article

Endpoint:

    https://cms-api.tienhoangdev.com/articles/upload

Method: **POST** Headers: API_KEY

- [ ] #todo The text content inside the markdown file will be save to
  \`content\` field in \`articles\` table

- [x] \`.zip\` file will include one markdown file \`.md\` and can contain
  multiple images. Supported formats: \`jpg\`, \`png\`, \`gif\`

- [x] All files will be save to minio bucket

- [x] #todo Add \`keywords\` support for articles ✅ 2024-08-24

- [ ] #todo Schema for uploading article files

  - [x] Main content will be in \`content.md\`
  - [ ] Thumbnail will be in \`thumbnail.png\` or \`thumbnail.jpg\`
  - [ ] Other files will be in \`{articleId}/{fileName}\` \\### Update
    article Endpoint

  <!-- -->

      https://cms-api.tienhoangdev.com/articles/:articleId/update

  Method: **PATCH** Body payload:

  \`\`\` json
  {
    "title":"Updated title",
    "description":"Updated description",
    "keywords":["kw1","kw2"],
  }
  \`\`\`

### Count number of articles by keywords

Endpoint

    https://cms-api/tienhoangdev.com/articles/statistics?keywords=kw1,kw2

Method: **GET** Response payload example:

\`\`\` json
{
  "kw1": 2,
  "kw3": 4
}
\`\`\`

## Article content

- Main markdown file: should be \`content.md\`
- Cover Image: should be in \`conver_image.png\` or \`cover_image.jpg\`
- All other images will be in

        `
    },
    {
        id: '3',
        title: 'Mastering TypeScript for Large-Scale Applications',
        author: {name: 'Emily White', avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026706d'},
        publishedDate: 'June 2, 2025',
        summary: 'Learn advanced patterns for maintaining a large and complex codebase with confidence.',
        imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Code',
    },
    {
        id: '4',
        title: 'UI/UX Design Trends to Watch in 2025',
        author: {name: 'Chris Green', avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026708d'},
        publishedDate: 'May 30, 2025',
        summary: 'From bento grids to kinetic typography, we explore the visual and interactive trends for the coming year.',
        imageUrl: 'https://placehold.co/600x400/9b59b6/ffffff?text=Design',
    },
]

export async function getArticles(): Promise<Article[]> {
    console.log('Fetching articles from CMS...');
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return MOCK_ARTICLES;
}

export async function getArticleById(id: string): Promise<Article> {
    return new Promise((resolve, reject) => {
        const article = MOCK_ARTICLES.find(article => article.id == id)
        setTimeout(() => {
            if (article) resolve(article);
            if (!article) reject('Article not found');
        }, 300);
    })
}