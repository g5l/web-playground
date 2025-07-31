import { useRouter } from 'next/router'
import PostDetails from '../../components/post-details'

interface Post {
  id: number
  title: string
  body: string
}

export default function Post({ post }: { post: Post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <PostDetails post={post} />
      <a href="/posts" className="link">Back to Posts</a>
    </div>
  )
}

export async function getStaticPaths() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  
  return {
    paths: posts.slice(0, 10).map(post => ({
      params: { id: post.id.toString() }
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  )
  const post = await response.json()
  return {
    props: { post },
  }
}
