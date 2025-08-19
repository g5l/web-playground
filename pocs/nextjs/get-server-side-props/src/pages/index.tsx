import { GetServerSideProps } from 'next';
import styles from '../styles/Posts.module.css';

type Post = {
  id: number;
  title: string;
};

type HomeProps = {
  posts?: Post[];
  error?: string;
};


export default function Home({ posts, error }: HomeProps) {
  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.errorTitle}>❌ Error loading data</h1>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✅ Posts from getServerSideProps</h1>
      <ul className={styles.postsList}>
        {posts?.map((post) => (
          <li key={post.id} className={styles.postItem}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if (!res.ok) {
      new Error(`Failed to fetch posts. Status: ${res.status}`);
    }

    const posts: Post[] = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (err: any) {
    console.error("Error in getServerSideProps:", err.message);

    return {
      props: {
        error: "Could not load posts. Please try again later.",
      },
    };
  }
};