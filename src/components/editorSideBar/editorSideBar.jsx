"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdPlayCircleOutline } from "react-icons/md";

import styles from "./editorSideBar.module.css";

const EditorSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleCollapse = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleCodeSubmit = (question, code) => {
    console.log(`Question: ${question}, Code: ${code}`);
    // Handle code submission here (e.g., send to an API)
  };

  useEffect(() => {
    setSelectedQuestion(null);
  }, [pathname]);

  const questions = [
    {
      id: 1,
      title: "QUESTION 1",
      content:
        "Your program should process the input efficiently, ensuring that it correctly handles different cases, including sentences with only one word, sentences where all words have the same frequency, and cases where punctuation needs to be stripped before counting. The output should be a single word—the most frequently occurring one—printed in lowercase. If the input is empty or contains no valid words, the program should return 'No words found'. To receive full credit, ensure that your solution is optimized for performance and correctly handles all edge cases. Your code should be well-structured, readable, and include comments explaining key parts of your logic.",
    },
  ];
  const testCases = [
    {
      id: 1,
      input: "7",
      expectedOutput: "14",
    },
  ];

  return (
    <div className={styles.sidebar}>
      <header className={styles["logo-container"]}>
        <div className={styles.logo}>LOGO</div>
      </header>
      <div className={styles["right-section"]}>
        <div className={styles.box}>
          <p className={styles.title}>INSTRUCTION</p>
          <p className={styles.text}>
            During this coding session, you are required to write a program
            based on the given problem statement. Carefully read the question
            and ensure that your solution meets all specified requirements. You
            may use any programming language permitted for the test. Your code
            should be well-structured, efficient, and properly commented to
            explain key logic.
          </p>
        </div>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`${styles.box} ${styles.clickable}`}
          >
            <p className={styles.title} onClick={() => toggleCollapse(index)}>
              {question.title} <RiArrowDownWideLine />
            </p>
            {expandedIndex === index && (
              <>
                <p className={styles.text}>{question.content}</p>
                <button onClick={() => handleQuestionClick(question)}>
                  Select question
                </button>
              </>
            )}
          </div>
        ))}
        <div className={styles.box}>
          <p className={styles.title}>ADDITIONAL INFORMATION</p>
          <ul>
            <li>
              <span>Supported Languages</span>
              <span>PHP, MySQL, C#, C++</span>
            </li>
            <li>
              <span>Input Data or Link</span>
              <span>
                <a href="#">getdataforfree.com</a>
              </span>
            </li>
          </ul>
        </div>
        <div className={styles["box"]}>
          <p className={styles["title"]}>Test Cases</p>
          {testCases.map((testCase, index) => (
            <ul key={index}>
              <li className={styles["test-case"]}>
                <div>
                  <strong>Test Case {testCase.id}</strong>
                </div>
              </li>
              <li className={styles["test-case"]}>
                <div>
                  <strong>Input:</strong> {testCase.input}
                </div>
                <div>
                  <strong>Expected Output:</strong> {testCase.expectedOutput}
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div className={styles.box}>
          <div className={styles["run-code"]}>
            <p className={styles.title}>RUN YOUR CODE</p>
            <MdPlayCircleOutline
              onClick={() => runCode("yourCodeHere", testCase)}
            />
          </div>
          <div>
            <h3>Results:</h3>
            <ul>
              <li>
                <strong>Test Case 1:</strong> 14
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSideBar;
