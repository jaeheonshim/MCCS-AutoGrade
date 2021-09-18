import styles from "../../styles/code.module.css"
import editorcss from "../../styles/editorarea.module.css"

import Editor, { useMonaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChallengeDescription from "../components/ChallengeDescription";
import CodeRunner from "../components/CodeRunner";
import EditorToolbar from "../components/EditorToolbar";

export default function Code(props) {
    const [showDescription, setShowDescription] = useState(true);
    const editorRef = useRef(null);

    const [language, setLanguage] = useState("java");
    const [codeValue, setCodeValue] = useState("");

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function changeShowDescription(show) {
        setShowDescription(show);
        editorRef.current.layout({width: "100%"});
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.h2}>Solving 'Challenge #1'</h2>
            </div>
            <div className={styles.workspace}>
                <div id={styles.expand} className={styles.div} style={{ visibility: showDescription ? "collapse" : "initial" }} onClick={() => changeShowDescription(true)} title="Expand Instructions"><p><span>»&nbsp;</span>Expand Instructions</p></div>
                <ChallengeDescription title={props.name} text={props.description} show={showDescription} onCollapse={() => changeShowDescription(false)} />
                <div id={editorcss.code} className={styles.div}>
                    <EditorToolbar onLangChange={setLanguage} />
                    <div id={editorcss.editor}>
                        <Editor
                            theme="vs-dark"
                            language={language}
                            value={codeValue}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                    <CodeRunner getCodeContent={() => editorRef.current.getValue()} getSelectedLanguage={() => language} />
                </div>
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