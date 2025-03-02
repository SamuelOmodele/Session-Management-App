"use client";
import EditorSidebar from "@/components/editorSideBar/editorSideBar";
import EditorContainer from "@/components/editorContainer/editorContainer";
import React from "react";
import styles from "./layout.module.css";

const EditorLayout = ({ children }) => {
  return (
    <div className={styles["layout"]}>
      {/* <EditorContainer
        question={selectedQuestion}
        onSubmit={handleCodeSubmit}
      />{" "} */}
      <div className={styles["children-container"]}>{children}</div>
      <EditorSidebar />
    </div>
  );
};

export default EditorLayout;
