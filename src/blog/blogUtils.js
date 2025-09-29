// Blog utilities for loading and managing blog posts

// Import all blog posts metadata
const importMetadata = async () => {
  const modules = import.meta.glob('./posts/*/metadata.json');
  const metadataPromises = Object.entries(modules).map(async ([path, importFn]) => {
    const module = await importFn();
    return module.default;
  });
  return Promise.all(metadataPromises);
};

// Import markdown content for a specific post
const importContent = async (postId) => {
  try {
    const module = await import(`./posts/${postId}/content.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load content for post ${postId}:`, error);
    return null;
  }
};

// Get all published blog posts
export const getAllPosts = async () => {
  try {
    const allMetadata = await importMetadata();
    const publishedPosts = allMetadata
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return publishedPosts;
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
};

// Get a specific blog post by ID
export const getPostById = async (postId) => {
  try {
    const allPosts = await getAllPosts();
    const post = allPosts.find(p => p.id === postId);

    if (!post) {
      return null;
    }

    const content = await importContent(postId);

    return {
      ...post,
      content
    };
  } catch (error) {
    console.error(`Failed to load post ${postId}:`, error);
    return null;
  }
};

// Get featured posts
export const getFeaturedPosts = async () => {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => post.featured);
  } catch (error) {
    console.error('Failed to load featured posts:', error);
    return [];
  }
};

// Get posts by tag
export const getPostsByTag = async (tag) => {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post =>
      post.tags && post.tags.includes(tag)
    );
  } catch (error) {
    console.error(`Failed to load posts by tag ${tag}:`, error);
    return [];
  }
};

// Get all unique tags
export const getAllTags = async () => {
  try {
    const allPosts = await getAllPosts();
    const tags = new Set();

    allPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });

    return Array.from(tags).sort();
  } catch (error) {
    console.error('Failed to load tags:', error);
    return [];
  }
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate estimated read time (basic implementation)
export const calculateReadTime = (content) => {
  if (!content) return '0 min read';

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readTime} min read`;
};