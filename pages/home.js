import styles from "../styles/home.module.css"
import ChallengeItem from "./components/challengeitem";

export default function Home() {
    return (
        <div>
            <h1>Welcome, Jaeheon</h1>
            <div className={styles.container}>
                <div>
                    <h2>Available Challenges</h2>
                    <div className={styles["flex-list"]}>
                        <ChallengeItem />
                        <ChallengeItem />
                        <ChallengeItem />
                    </div>
                </div>
                <div>
                    <h2>Solved Challenges</h2>
                </div>
            </div>
        </div>
    );
}