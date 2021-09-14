import styles from "../styles/code.module.css"
import editorcss from "../styles/editorarea.module.css"

import Editor from "@monaco-editor/react";

export default function Code() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.h2}>Solving 'Challenge #1'</h2>
            </div>
            <div className={styles.workspace}>
                <div id={styles.expand} className={styles.div} title="Expand Instructions"><p><span>»&nbsp;</span>Expand Instructions</p></div>
                <div id={styles.instructions} className={styles.div}>
                    <div id={styles.collapse} title="Collapse Instructions">«</div>
                    <h1>Challenge #1</h1>
                    <p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie auctor sapien, nec
                        facilisis massa. Vivamus non euismod diam. Cras id nulla tellus. Cras elementum risus neque, eu
                        rhoncus felis placerat a. Donec nisl nulla, tempor et ligula at, aliquam fermentum justo.
                        Aliquam cursus, ex vulputate imperdiet semper, metus mauris accumsan nunc, quis convallis ante
                        mi sit amet lacus. Etiam id turpis fermentum, tincidunt augue imperdiet, vestibulum metus.
                        Vivamus sed tellus quis lorem aliquet imperdiet non ac quam. Maecenas vitae ante mauris. Integer
                        ac sem ut nisl dignissim blandit at ac nisi. Integer mi sapien, vehicula quis aliquet id,
                        hendrerit a purus. Suspendisse potenti. Nulla posuere, turpis sit amet ullamcorper laoreet, enim
                        justo ornare turpis, nec varius orci leo faucibus tellus. Morbi tincidunt faucibus massa,
                        sollicitudin pharetra quam. Ut ac risus id leo tristique cursus a ut erat. Morbi eu risus
                        finibus, rhoncus enim in, porta nibh. </p>
                </div>
                <div id={editorcss.code} className={styles.div}>
                    <div id={editorcss.editor}>
                        <Editor 
                            theme="vs-dark"
                            defaultLanguage="javascript"
                        />
                    </div>
                    <div>
                        <button>Run Tests</button>
                        <button>Submit</button>
                        <div id={editorcss.console}>
                            Running tests...

                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                            Line<br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}