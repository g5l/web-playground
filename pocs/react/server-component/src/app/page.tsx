import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link className={styles.primary} href="/pocs">
        RSC POCs
      </Link>
    </div>
  );
}
