import editorcss from "../../styles/editorarea.module.css"

export default function CodeRunner(props) {
    return (<div>
        <button>Run Tests</button>
        <button>Submit</button>
        <div id={editorcss.console}>
            Running tests...

            Line<br />
        </div>
    </div>)
}