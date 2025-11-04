import { getPostBySlug, posts } from '../../../lib/posts';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  // Pre-generate static routes for each post at build time
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    title: post ? `${post.title} | Blog` : 'Post | Blog',
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <section>
        <h1>Not Found</h1>
        <p>No post with slug "{params.slug}".</p>
      </section>
    );
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <a href="/blog">← Back to blog</a>
      </p>
    </article>
  );
}

