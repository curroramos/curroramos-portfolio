import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedPosts, formatDate } from '../blog/blogUtils.js';

const BlogPreviewCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="bg-black-200 rounded-lg overflow-hidden border border-black-300 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
          {post.coverImage && (
            <div className="w-full h-40 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="p-6 flex flex-col h-full">
            <div className="mb-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
              {post.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogPreview = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        setLoading(true);
        const posts = await getFeaturedPosts();
        // Limit to 3 most recent featured posts
        setFeaturedPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  if (loading) {
    return (
      <section className="c-space my-20" id="blog-preview">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-64 mx-auto mb-8"></div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-700 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null; // Don't show section if no featured posts
  }

  return (
    <section className="c-space my-20" id="blog-preview">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest from the Blog</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Thoughts on software engineering, AI, and my journey as a developer.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
          {featuredPosts.map((post, index) => (
            <BlogPreviewCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:scale-105"
          >
            <span>View All Posts</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;