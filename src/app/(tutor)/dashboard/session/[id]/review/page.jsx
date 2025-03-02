"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  LayoutGrid,
  FileText,
  Users,
  Grid,
  Star,
  User,
  MessageSquare,
  Clock,
} from "lucide-react";
import styles from "./page.module.css";

const StudentSubmissionReview = () => {
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [finalScore, setFinalScore] = useState("85");

  const testCases = [
    {
      name: "Basic String Test",
      status: "Passed",
      score: "20/20",
      time: "0.03s",
    },
    {
      name: "Special Characters",
      status: "Passed",
      score: "20/20",
      time: "0.04s",
    },
    {
      name: "Empty String Edge Case",
      status: "Failed",
      score: "5/20",
      time: "0.02s",
    },
    {
      name: "Long String Performance",
      status: "Passed",
      score: "20/20",
      time: "1.25s",
    },
    {
      name: "Unicode Characters",
      status: "Partial",
      score: "20/20",
      time: "0.07s",
    },
  ];

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Passed":
        return <CheckCircle className={styles.iconGreen} />;
      case "Failed":
        return <XCircle className={styles.iconRed} />;
      case "Partial":
        return <AlertTriangle className={styles.iconOrange} />;
      default:
        return null;
    }
  };

  const openModal = (testCaseName) => {
    setSelectedTestCase(testCaseName);
  };

  const closeModal = () => {
    setSelectedTestCase(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>GradeWise</h1>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            <LayoutGrid className={styles.navIcon} />
            Dashboard
          </a>
          <a href="#" className={`${styles.navLink} ${styles.active}`}>
            <FileText className={styles.navIcon} />
            Submissions
          </a>
          <a href="#" className={styles.navLink}>
            <Users className={styles.navIcon} />
            Students
          </a>
          <a href="#" className={styles.navLink}>
            <Grid className={styles.navIcon} />
            Exercises
          </a>
        </nav>
        <button className={styles.button}>Save Grade</button>
      </header>

      <div className={styles.breadcrumb}>
        Submissions &gt; Exercise #342 &gt; Student Review
      </div>
      <h2 className={styles.title}>Student Submission Review</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <User />
          </div>
          <h3 className={styles.cardTitle}>Alex Johnson</h3>
          <h4 className={styles.cardSubtitle}>Student Details</h4>
          <p className={styles.cardText}>Submission ID: SUB-78923</p>
          <p className={styles.cardText}>Submitted: May 15, 2023 at 14:32</p>
          <p className={styles.cardText}>Last Updated: May 15, 2023 at 14:32</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <Star />
          </div>
          <h3 className={styles.cardTitle}>85/100</h3>
          <h4 className={styles.cardSubtitle}>Current Score</h4>
          <p className={styles.cardText}>Based on 5 test cases</p>
          <button className={styles.button}>Adjust Score</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <FileText />
        </div>
        <h3 className={styles.cardTitle}>
          Exercise: String Manipulation Algorithm
        </h3>
        <p className={styles.cardText}>
          Create a function that reverses each word in a string while
          maintaining the original word order. The function should handle
          special characters and maintain spacing.
        </p>
      </div>

      <h3 className={styles.sectionTitle}>Test Case Results</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Test Case</th>
              <th>Status</th>
              <th>Score</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase) => (
              <tr key={testCase.name}>
                <td className={styles.testCaseName}>
                  {renderStatusIcon(testCase.status)} {testCase.name}
                </td>
                <td className={styles[`status${testCase.status}`]}>
                  {testCase.status}
                </td>
                <td>{testCase.score}</td>
                <td>{testCase.time}</td>
                <td>
                  <button
                    className={styles.iconButton}
                    onClick={() => openModal(testCase.name)}
                  >
                    <Eye />
                  </button>
                  <button className={styles.iconButton}>
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTestCase && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h3 className={styles.modalTitle}>
              Test Case Details: {selectedTestCase}
            </h3>
            <p className={styles.modalText}>Input: "example input"</p>
            <p className={styles.modalText}>
              Expected Output: "expected output"
            </p>
            <p className={styles.modalText}>Actual Output: "actual output"</p>
            <p className={styles.modalText}>
              Status:{" "}
              {testCases.find((tc) => tc.name === selectedTestCase)?.status}
            </p>
            <p className={styles.modalText}>
              Score:{" "}
              {testCases.find((tc) => tc.name === selectedTestCase)?.score}
            </p>
            <p className={styles.modalText}>
              Time: {testCases.find((tc) => tc.name === selectedTestCase)?.time}
            </p>
          </div>
        </div>
      )}

      <div className={styles.feedbackSection}>
        <h3 className={styles.sectionTitle}>Feedback</h3>
        <div className={styles.feedbackCard}>
          <div className={styles.feedbackIcon}>
            <MessageSquare />
          </div>
          <h4 className={styles.feedbackTitle}>Auto-Generated Feedback</h4>
          <p className={styles.feedbackText}>
            The solution fails to handle empty string inputs properly. Consider
            adding input validation.
          </p>
        </div>
        <div className={styles.feedbackCard}>
          <div className={styles.feedbackIcon}>
            <Clock />
          </div>
          <h4 className={styles.feedbackTitle}>Performance Note</h4>
          <p className={styles.feedbackText}>
            Good performance on long strings. Time complexity appears to be
            O(n).
          </p>
        </div>
        <div className={styles.feedbackCard}>
          <div className={styles.feedbackIcon}>
            <FileText />
          </div>
          <h4 className={styles.feedbackTitle}>Code Quality</h4>
          <p className={styles.feedbackText}>
            Well-structured code with good variable naming. Consider adding more
            comments.
          </p>
        </div>
        <h4 className={styles.feedbackTitle}>Add Custom Feedback</h4>
        <textarea
          className={styles.textArea}
          placeholder="Type your feedback here..."
        />
      </div>

      <h3 className={styles.sectionTitle}>Grade Adjustment</h3>
      <div className={styles.gradeAdjustment}>
        <label className={styles.label}>Final Score (0-100)</label>
        <input
          type="number"
          value={finalScore}
          onChange={(e) => setFinalScore(e.target.value)}
          min="0"
          max="100"
          className={styles.input}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>Save Draft</button>
        <button className={`${styles.button} ${styles.primaryButton}`}>
          Submit Final Grade
        </button>
      </div>
    </div>
  );
};

export default StudentSubmissionReview;
