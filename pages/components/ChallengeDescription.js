import ReactMarkdown from "react-markdown"
import styles from "../../styles/code.module.css"

export default function ChallengeDescription(props) {
  return (
    <div style={{ visibility: props.show ? "initial" : "collapse" }}>
      <div id={styles.collapse} onClick={() => props.onCollapse(false)} title="Collapse Instructions">«</div>
      <h1>{props.title}</h1>
      <ReactMarkdown className={styles.p}>{props.text}</ReactMarkdown>
    </div>
  );
}