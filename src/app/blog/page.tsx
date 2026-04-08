import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - DevToolkit',
  description:
    'Read articles and guides on developer tools, best practices, and tutorials.',
};

const blogPosts = [
  {
    id: 'cron-expression-guide',
    title: 'Cron Expression Cheat Sheet — Syntax, Examples, and Common Schedules',
    excerpt:
      'Master cron expressions with our comprehensive cheat sheet. Learn 5-field syntax, wildcards, and 15+ practical examples for scheduling tasks.',
    date: 'April 7, 2026',
    category: 'Cheat Sheet',
    readTime: '12 min read',
  },
  {
    id: 'jwt-decoder-guide',
    title: 'How to Decode and Debug JWT Tokens Online',
    excerpt:
      'Learn how to safely decode and understand JWT tokens without exposing your secrets. Step-by-step guide with practical examples.',
    date: 'April 7, 2026',
    category: 'Tutorial',
    readTime: '8 min read',
  },
  {
    id: 'regex-testing-guide',
    title: 'The Complete Guide to Testing Regular Expressions',
    excerpt:
      'Master regex patterns with our comprehensive guide. Learn how to test, debug, and optimize your regular expressions.',
    date: 'April 7, 2026',
    category: 'Guide',
    readTime: '10 min read',
  },
  {
    id: 'base64-encoding-explained',
    title: 'Base64 Encoding Explained — When and How to Use It',
    excerpt:
      'Understand Base64 encoding, its use cases, and when to use it in your projects. Complete guide with examples.',
    date: 'April 7, 2026',
    category: 'Educational',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-700">
          Guides, tutorials, and tips for developer tools and best practices.
        </p>
      </div>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <Link
                  href={`/blog/${post.id}`}
                  className="group"
                >
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700 transition"
            >
              Read Article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
