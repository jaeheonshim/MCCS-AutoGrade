export default function EditorToolbar(props) {
    return (
        <div>
            <label for="language">Language</label>
            <select id="language" onChange={(event) => props.onLangChange(event.target.value)}>
                <option value="java">Java</option>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
            </select>
        </div>
    )
}