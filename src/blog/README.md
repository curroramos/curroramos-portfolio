# Blog System

This portfolio includes a complete blog system built with React, React Router, and React Markdown.

## Features

- 📝 Markdown-based blog posts with syntax highlighting
- 🏷️ Tag-based filtering
- 🎨 Responsive design with dark theme
- 📱 Mobile-friendly navigation
- 🔍 Featured posts
- ⚡ Fast loading with Vite

## Architecture

### Folder Structure

```
src/blog/
├── posts/
│   ├── my-first-blog-post/
│   │   ├── content.md        # Markdown content
│   │   └── metadata.json     # Post metadata
│   └── building-ai-systems/
│       ├── content.md
│       └── metadata.json
├── blogUtils.js              # Utility functions
└── README.md                 # This file
```

### Components

- `Blog.jsx` - Blog listing/preview page
- `BlogPost.jsx` - Individual blog post page
- `blogUtils.js` - Utilities for loading posts

## Adding New Blog Posts

### 1. Create Post Directory

```bash
mkdir src/blog/posts/your-post-slug
```

### 2. Create content.md

Write your blog post in Markdown:

```markdown
# Your Post Title

Your content here...

## Code Examples

```javascript
const example = "code";
```

## Lists

- Item 1
- Item 2
```

### 3. Create metadata.json

```json
{
  "id": "your-post-slug",
  "title": "Your Post Title",
  "description": "Brief description of your post",
  "author": "Francisco Ramos",
  "date": "2024-12-28",
  "readTime": "5 min read",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "published": true,
  "coverImage": "/assets/blog/your-cover-image.jpg"
}
```

### 4. Post Will Auto-Load

The blog system automatically discovers and loads all posts from the `posts/` directory.

## Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (matches folder name) |
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | Brief description for previews |
| `author` | string | ✅ | Author name |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) |
| `readTime` | string | ✅ | Estimated read time |
| `tags` | array | ❌ | Array of tag strings |
| `featured` | boolean | ❌ | Show as featured post |
| `published` | boolean | ❌ | Whether to show the post |
| `coverImage` | string | ❌ | Path to cover image |

## Supported Markdown Features

- Headers (H1-H6)
- **Bold** and *italic* text
- Code blocks with syntax highlighting
- Inline `code`
- Lists (ordered and unordered)
- Links
- Blockquotes
- Tables (GitHub Flavored Markdown)

## Navigation

- `/blog` - Blog listing page
- `/blog/:postId` - Individual blog post
- Blog button in navbar (highlighted with blue styling)

## Styling

The blog uses the same design system as the portfolio:
- Dark theme
- Consistent spacing and typography
- Responsive design
- Smooth animations with Framer Motion

## Technical Details

### Dependencies

- `react-router-dom` - Routing
- `react-markdown` - Markdown rendering
- `remark-gfm` - GitHub Flavored Markdown
- `rehype-highlight` - Syntax highlighting
- `highlight.js` - Code highlighting themes

### Performance

- Lazy loading of markdown content
- Efficient post filtering
- Optimized bundle splitting with Vite

### SEO Considerations

- Proper meta tags for each post
- Semantic HTML structure
- Fast loading times