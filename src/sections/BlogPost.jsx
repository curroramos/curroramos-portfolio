import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getPostById, formatDate } from '../blog/blogUtils.js';

// Import highlight.js CSS for code syntax highlighting
import 'highlight.js/styles/github-dark.css';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostById(postId);

        if (!postData) {
          setNotFound(true);
          return;
        }

        setPost(postData);
      } catch (error) {
        console.error('Failed to load blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black-100 pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-black-100 pt-24">
      {/* Navigation */}
      <nav className="fixed top-16 left-0 right-0 z-50 bg-black-100/90 backdrop-blur-sm border-b border-black-300">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            <Link
              to="/"
              className="text-blue-500 hover:text-blue-400 transition-colors font-semibold"
            >
              Francisco
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-12">
            {post.featured && (
              <div className="mb-4">
                <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Featured Post
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-6">
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Cover Image */}
            {post.coverImage && (
              <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </div>
            )}
          </header>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                // Custom styling for markdown elements
                h1: ({children}) => (
                  <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
                ),
                h2: ({children}) => (
                  <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
                ),
                h3: ({children}) => (
                  <h3 className="text-xl font-semibold text-white mt-5 mb-2">{children}</h3>
                ),
                p: ({children}) => (
                  <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                ),
                code: ({inline, className, children}) => {
                  return inline ? (
                    <code className="bg-gray-800 text-blue-400 px-1 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                pre: ({children}) => (
                  <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400">
                    {children}
                  </blockquote>
                ),
                ul: ({children}) => (
                  <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({children}) => (
                  <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">
                    {children}
                  </ol>
                ),
                a: ({href, children}) => (
                  <a
                    href={href}
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                iframe: ({src, ...props}) => (
                  <div className="my-6 aspect-video">
                    <iframe
                      src={src}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      {...props}
                    />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                Published on {formatDate(post.date)} by {post.author}
              </div>

              <Link
                to="/blog"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors font-semibold"
              >
                Read More Posts
              </Link>
            </div>
          </footer>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;