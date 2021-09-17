import { useEffect, useState } from "react";
import Link from "next/link"

import styles from "../../../styles/admin/index.module.css"

export default function ChallengeList() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        fetch("/api/challenges")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);  
                    setChallenges(result); 
                }
            );
    }, []);

    if(!isLoaded) {
        return (<div>Loading</div>);
    } else {
        return <div>
            {
                challenges.map(item => (
                    <div className={styles.challenge} key={item._id}><Link href={`/admin/challenges/${item._id}`}>{item.name}</Link></div>
                ))
            }
        </div>
    }
}