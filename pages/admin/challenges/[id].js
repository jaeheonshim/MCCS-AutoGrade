import styles from "../../../styles/admin/challenge.module.css"
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Challenge(props) {
    const [description, setDescription] = useState(props.description || "");
    const [name, setName] = useState(props.name || "");
    
    const [saveEnabled, setSaveEnabled] = useState(true);
    const [errorText, setErrorText] = useState("");
    
    useEffect(() => {
        if(!props.name) {
            setSaveEnabled(false);
            setErrorText("Error: Not Found");
        }
    }, []);    

    return (
        <div className={styles.container}>
            <div>
                <div class="error">{errorText}</div>
                <label className={styles.label} htmlFor="name">
                    Challenge Name
                </label>
                <input type="text" id="name" className={[styles.nameinput, styles.input].join(" ")}  value={name} onChange={(event) => setName(event.target.value)}></input>
                <label className={styles.label} htmlFor="description">
                    Challenge Description
                </label>
                <textarea cols="70" rows="30" className={[styles.textarea, styles.input].join(" ")} value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <button className={styles.save} onClick={save} disabled={!saveEnabled}>Save</button>
            </div>
            <div className={styles.preview}>
                <ReactMarkdown>{description}</ReactMarkdown>
            </div>
        </div>
    );

    async function save() {
        setSaveEnabled(false);
        const res = await fetch(`/api/challenges/${props._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                name: name,
                description: description
            })
        });
        setSaveEnabled(true);
        const data = await res.text();

        if(res.status != 200) {
            setErrorText(data);
        }
    }
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