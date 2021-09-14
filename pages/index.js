import styles from "../styles/index.module.css"

export default function Index() {
  return (
    <div className={styles.container}>
        <div>
            <h1 className={styles.h1}>Mill Creek CS Club</h1>
            <p className={styles.p}>Automated challenge testing</p>
            <div className={styles.options}>
                <h2>Sign in</h2>
            </div>
        </div>

        <div className={styles.leaderboard}>
            <h2>Leaderboard</h2>
        </div>
    </div>
  )
}
