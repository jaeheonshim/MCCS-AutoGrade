import styles from "../../styles/home.module.css"

export default function ChallengeItem() {
    return (
        <div className={styles.challenge}>
            <div className={styles["challenge-details"]}>
                <h3>Challenge #1</h3>
                <p>Greatest common multiple</p>
            </div>
            <div>
                <button>Solve!</button>
            </div>
        </div>
    );
}