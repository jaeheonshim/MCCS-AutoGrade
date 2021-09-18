import { useEffect, useRef, useState } from "react";
import editorcss from "../../styles/editorarea.module.css"
import ReactHtmlParser from "react-html-parser"
import { Languages, StatusDefinition } from "../../src/Judge0";

export default function CodeRunner(props) {
    const consoleLines = useRef([]);
    const [consoleText, setConsoleText] = useState();

    const scrollAnchor = useRef(null);

    const [currentToken, setCurrentToken] = useState();
    const [currentInterval, setCurrentInterval] = useState();

    useEffect(() => {
        if(currentToken) {
            setCurrentInterval(setInterval(async () => {
                const status = await submissionStatus(currentToken);

                if(status.status.id != 1 && status.status.id != 2) {
                    setCurrentToken(null);
                    clearInterval(currentInterval);
                    processStatus(status);
                }
            }, 2000));
        } else {
            clearInterval(currentInterval);
        }
    }, currentToken);

    return (
        <div>
            <button onClick={submission}>Run Tests</button>
            <button>Submit</button>
            <div id={editorcss.console}>
                {
                    ReactHtmlParser(consoleText)
                }
                <div ref={scrollAnchor}></div>
            </div>
        </div>
    )

    function autoScroll() {
        scrollAnchor.current.scrollIntoView();
    }

    function consoleLine(text) {
        for(let line of text.split("\n")) {
            consoleLines.current.push(line);
        }
        
        setConsoleText(consoleLines.current.join("<br>"));
        autoScroll()
    }

    function consoleSuccess(text) {
        consoleLine(`<span style="color: green">${text}</span>`);
    }

    function consoleMegaSuccess(text) {
        consoleLine(`<span style="color: green; font-size: 2em;">${text}</span>`);
    }

    function consoleError(text) {
        consoleLine(`<span style="color: red">${text}</span>`)
    }

    function processStatus(status) {
        consoleLine(Buffer.from(status.stdout || "", "base64").toString("utf8"));
        if(StatusDefinition.good.includes(status.status.id)) {
            consoleMegaSuccess(status.status.description);
        } else {
            consoleError(status.status.description);
        }

        consoleLine("");
        consoleLine(Buffer.from(status.compile_output || "", "base64").toString("utf8"));
    }

    async function submissionStatus(token) {
        const res = await (await fetch(`/api/submission/status/${token}`)).json();

        return res;
    }

    async function submission() {
        consoleLine("Submitting code...\n");
        const code = Buffer.from(props.getCodeContent()).toString("base64");

        const res = await (await fetch("/api/submission/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                language: Languages[props.getSelectedLanguage()]
            })
        })).json();

        if (!res.token) {
            consoleError(JSON.stringify(res) + "\n");
        } else {
            setCurrentToken(res.token);
            consoleSuccess("Code submitted! Awaiting grading...\n");
        }
    }
}