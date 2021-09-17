import { useEffect, useState } from "react";
import styles from "../styles/home.module.css"
import ChallengeItem from "./components/challengeitem";

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [challengeList, setChallengeList] = useState();

    useEffect(() => {
        fetch("/api/challenges")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);  
                    setChallengeList(result.map((e) => <ChallengeItem name={e.name} />)); 
                }
            );
    }, []);

    return (
        <div>
            <h1>Welcome, Jaeheon</h1>
            <div className={styles.container}>
                <div>
                    <h2>Available Challenges</h2>
                    <div className={styles["flex-list"]}>
                        {
                            !isLoaded ? "Loading..." : challengeList
                        }
                    </div>
                </div>
                <div>
                    <h2>Solved Challenges</h2>
                </div>
            </div>
        </div>
    );
}