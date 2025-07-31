import { useRouter } from 'next/router'

interface Post {
  id: number
  title: string
  body: string
}

export default function Posts({ posts }: { posts: Post[] }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`} className="post-link">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
      <a href="/" className="link">Back to Home</a>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return {
    props: { posts: posts.slice(0, 10) },
  }
}
