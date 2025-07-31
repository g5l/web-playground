interface Post {
  title: string
  body: string
}

export default function PostDetails({ post }: { post: Post }) {
  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p className="post-body">{post.body}</p>
    </div>
  )
}
