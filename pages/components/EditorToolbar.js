export default function EditorToolbar(props) {
    return (
        <div>
            <label for="language">Language</label>
            <select id="language" value={props.value || ""} onChange={(event) => props.onLangChange(event.target.value)}>
                <option value="c">C (GCC 9.2.0)</option>
                <option value="java" defaultValue={true}>Java (OpenJDK 13.0.1)</option>
                <option value="javascript">Javascript (Node.js 12.14.0)</option>
                <option value="python">Python (3.8.1)</option>
            </select>
        </div>
    )
}