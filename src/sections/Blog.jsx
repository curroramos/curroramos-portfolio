import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllPosts, formatDate } from '../blog/blogUtils.js';

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="bg-black-200 rounded-lg overflow-hidden border border-black-300 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full flex flex-col">
          {/* Image section - always show with fallback */}
          <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Show placeholder on error
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                      <div class="text-center text-gray-400">
                        <svg class="w-12 h-12 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                        </svg>
                        <p class="text-sm">Blog Post</p>
                      </div>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                  <p className="text-sm">Blog Post</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-3 flex gap-2">
              {post.featured && (
                <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              {post.public === false && (
                <span className="bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Private
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
              {post.description}
            </p>

            <div className="mt-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags && post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Date and read time */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="c-space my-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="c-space pt-32 pb-20" id="blog">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thoughts on software engineering, AI, and my journey as a developer.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8 justify-items-center">
            {posts.map((post, index) => (
              <div key={post.id} className="w-full max-w-sm h-[380px]">
                <BlogCard post={post} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;