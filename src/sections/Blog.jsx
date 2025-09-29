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
        <div className="bg-black-200 rounded-lg overflow-hidden border border-black-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
          {post.coverImage && (
            <div className="w-full h-48 overflow-hidden">
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

          <div className="p-6">
            {post.featured && (
              <div className="mb-3">
                <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-3">
              {post.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
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
  const [selectedTag, setSelectedTag] = useState('all');

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

  const filteredPosts = selectedTag === 'all'
    ? posts
    : posts.filter(post => post.tags && post.tags.includes(selectedTag));

  const allTags = ['all', ...new Set(posts.flatMap(post => post.tags || []))];

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
    <section className="c-space my-20" id="blog">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thoughts on software engineering, AI, and my journey as a developer.
          </p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tag === 'all' ? 'All Posts' : tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {selectedTag === 'all'
                ? 'No blog posts available yet. Check back soon!'
                : `No posts found for tag "${selectedTag}"`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;