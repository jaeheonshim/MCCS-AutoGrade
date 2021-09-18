import styles from "../../../styles/admin/challenge.module.css"
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/dist/client/router";
import EditorToolbar from "../../components/EditorToolbar";
import Editor from "@monaco-editor/react";

export default function Challenge(props) {
    const [shortDescription, setShortDescription] = useState(props.shortDescription || "");
    const [description, setDescription] = useState(props.description || "");
    const [name, setName] = useState(props.name || "");

    const editor = useRef();
    const defaultCode = useRef(props.defaultCode);
    const [currentLanguage, setCurrentLanguage] = useState("java");

    const [saveEnabled, setSaveEnabled] = useState(true);
    const [errorText, setErrorText] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!props.name && props._id !== "new") {
            setSaveEnabled(false);
            setErrorText("Error: Not Found");
        }
    }, []);

    useEffect(() => {
        if(editor.current) {
            editor.current.setValue(defaultCode.current[currentLanguage] || "");
        }
    }, [currentLanguage]);

    function onEditorMount(e) {
        editor.current = e;
        editor.current.setValue(defaultCode.current[currentLanguage] || "");
    }

    return (
        <div className={styles.container}>
            <div className={styles.fields}>
                <div className="error">{errorText}</div>
                <label className={styles.label} htmlFor="name">
                    Challenge Name
                </label>
                <input type="text" id="name" className={[styles.nameinput, styles.input].join(" ")} value={name} onChange={(event) => setName(event.target.value)}></input>
                <label className={styles.label} htmlFor="shortdescription">
                    Challenge Short Description
                </label>
                <input type="text" size={50} id="shortdescription" value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} className={styles.input}></input>
                <label className={styles.label} htmlFor="description">
                    Challenge Description
                </label>
                <textarea cols="50" rows="30" className={[styles.textarea, styles.input].join(" ")} value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <br />
                <EditorToolbar onLangChange={setCurrentLanguage} value={currentLanguage} />
                <div className={styles.codeEditor}>
                    <Editor
                        theme="vs-dark"
                        language={currentLanguage}
                        value={defaultCode[currentLanguage]}
                        onChange={onCodeEdit}
                        onMount={onEditorMount}
                    />
                </div>
                <button className={styles.save} onClick={save} disabled={!saveEnabled}>Save</button>
                <button className={styles.delete} onClick={deleteChallenge} disabled={!saveEnabled}>Delete</button>
            </div>
            <div className={styles.preview}>
                <ReactMarkdown linkTarget="_blank">{description}</ReactMarkdown>
            </div>
        </div>
    );

    function onCodeEdit(str) {
        defaultCode.current[currentLanguage] = editor.current.getValue();
    }

    async function deleteChallenge() {
        setSaveEnabled(false);
        const res = await fetch(`/api/challenges/${props._id}`, {
            method: "DELETE"
        });
        setSaveEnabled(true);

        const data = await res.text();

        if (res.status != 200) {
            setErrorText(data);
        } else {
            router.push("/admin")
        }
    }

    async function save() {
        setSaveEnabled(false);

        for(let key in defaultCode.current) {
            defaultCode.current[key] = Buffer.from(defaultCode.current[key]).toString("base64");
        }

        const res = await fetch(`/api/challenges/${props._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                shortDescription: shortDescription,
                defaultCode: defaultCode.current
            })
        });
        setSaveEnabled(true);
        const data = await res.text();

        if (res.status != 200) {
            setErrorText(data);
        } else {
            router.push("/admin")
        }
    }
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    if (id === "new") return {
        props: {
            _id: id
        }
    };

    const res = await fetch(`http://localhost:3000/api/challenges/${id}`);
    if (res.status != 200) {
        return {
            props: {
                _id: id
            }
        }
    }

    const data = await res.json();

    for(let key in data.defaultCode) {
        data.defaultCode[key] = Buffer.from(data.defaultCode[key], "base64").toString("utf8");
    }

    return {
        props: {
            ...data
        }
    }
}