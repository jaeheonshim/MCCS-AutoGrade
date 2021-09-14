import styles from "../../../styles/admin/challenge.module.css"
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Challenge(props) {
    const [description, setDescription] = useState(props.description || "");
    const [name, setName] = useState(props.name || "");

    return (
        <div className={styles.container}>
            <div>
                <label className={styles.label} htmlFor="name">
                    Challenge Name
                </label>
                <input type="text" id="name" className={[styles.nameinput, styles.input].join(" ")}  value={name} onChange={(event) => setName(event.target.value)}></input>
                <label className={styles.label} htmlFor="description">
                    Challenge Description
                </label>
                <textarea cols="70" rows="30" className={[styles.textarea, styles.input].join(" ")} value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <button className={styles.save}>Save</button>
            </div>
            <div className={styles.preview}>
                <ReactMarkdown>{description}</ReactMarkdown>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const res = await fetch(`http://localhost:3000/api/challenges/${id}`);
    if(res.status != 200) {
        return {
            props: {
                id: id
            }
        }
    }

    const data = await res.json();

    return {
        props: {
            ...data
        }
    }
}