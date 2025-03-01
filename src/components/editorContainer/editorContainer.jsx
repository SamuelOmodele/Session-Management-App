// import { useState } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript"; // Or any mode you need
// import styles from "./QuestionEditor.module.css"; // Importing the CSS module

// const EditorContainer = ({ question, onSubmit }) => {
//   const [code, setCode] = useState("");

//   const handleSubmit = () => {
//     onSubmit(question, code);
//     setCode("");
//   };

//   return (
// <div className={styles.container}>
//   <h3>{question}</h3>
//   <CodeMirror
//     value={code}
//     options={{
//       mode: "javascript",
//       theme: "material",
//       lineNumbers: true,
//     }}
//     onBeforeChange={(editor, data, value) => {
//       setCode(value);
//     }}
//   />
//   <button onClick={handleSubmit} className={styles.submitButton}>
//     Submit
//   </button>
// </div>
//   );
// };

// export default EditorContainer;
