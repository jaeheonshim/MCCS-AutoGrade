import styles from "../../styles/home.module.css"

export default function ChallengeItem(props) {
    return (
        <div className={styles.challenge}>
            <div className={styles["challenge-details"]}>
                <h3>{props.name}</h3>
                <p>{props.shortdesc}</p>
            </div>
            <div>
                <button>Solve!</button>
            </div>
        </div>
    );
}