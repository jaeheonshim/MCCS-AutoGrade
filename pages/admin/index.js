import styles from "../../styles/admin/index.module.css"
import ChallengeList from "./components/ChallengeList";

export default function Index() {
    return (
        <div className={styles.container}>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Challenges (Click to edit)</h2>
                <ChallengeList />
            </div>
        </div>
    );
}