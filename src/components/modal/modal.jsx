"use client";
import React, { useState } from "react";
import styles from "./modal.module.css";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { PiCopySimpleFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setIsModalOpen } from "@/redux/modalSlice";
import { BsCloudUpload } from "react-icons/bs";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const Modal = () => {
  const [formstep, setFormStep] = useState(1);

  const [copied, setCopied] = useState(false);
  const [enrollmentMethod, setEnrollmentMethod] = useState("file");

  const link = "https://sessionmgtsite.com/session/s3201";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      // --- reset it after 2 seconds ---
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const [languageIndex, setLanguageIndex] = useState("");

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const [totalQuestionNumber, setTotalQuestionNumber] = useState(1);
  const [totalTestCaseNumber, setTotalTestCaseNumber] = useState(
    Array(totalQuestionNumber).fill(1)
  );
  const [flagState, setFlagState] = useState(
    Array(totalQuestionNumber)
      .fill([])
      .map(() => Array(4).fill(false))
  );

  const handleFlagChange = (e, questionIndex, flagIndex) => {
    const newFlagState = [...flagState];
    newFlagState[questionIndex][flagIndex] = e.target.checked;
    setFlagState(newFlagState);
  };

  const handleContinue = () => {
    if (validateWeights()) {
      // Proceed to the next step if validation passes
      setFormStep((prevStep) => prevStep + 1);
    }
  };

  const [allowReviewReport, setAllowReviewReport] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentMatricNo, setStudentMatricNo] = useState("");

  const updateLanguage = (index) => {
    if (languageIndex) {
      if (languageIndex === index) {
        setLanguageIndex("");
      } else {
        setLanguageIndex(index);
      }
    } else {
      setLanguageIndex(index);
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file)
  //   if (!file) {
  //     console.log('nothing');
  //     return;
  //   };

  //   // Ensure file is a CSV
  //   if (file.type !== "text/csv") {
  //     alert("Please upload a valid CSV file.");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = ({ target }) => {
  //     const csv = target.result;
  //     Papa.parse(csv, {
  //       header: true, // Treat first row as column names
  //       skipEmptyLines: true, // Ignore empty rows
  //       complete: (result) => {
  //         const formattedData = result.data.map((row) => ({
  //           matricNumber: row["matric_no"],
  //           fullName: row["Fullname"],
  //         }));
  //         setStudents(formattedData);
  //       },
  //     });
  //   };
  //   reader.readAsText(file);
  // };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const data = target.result;

      if (fileExtension === "csv") {
        // Parse CSV file
        Papa.parse(data, {
          header: true, // Assumes first row contains column names
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map((row) => ({
              matricNumber: row["Matric Number"],
              fullName: row["Full Name"],
            }));
            setStudents(parsedData);
          },
        });
      } else if (["xls", "xlsx"].includes(fileExtension)) {
        // Parse Excel file
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const parsedData = sheetData.map((row) => ({
          matricNumber: row["Matric Number"],
          fullName: row["Full Name"],
        }));

        setStudents(parsedData);
      } else {
        alert("Unsupported file type! Please upload CSV or Excel files.");
      }
    };

    if (fileExtension === "csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const addStudent = () => {
    if (!studentName || !studentMatricNo) {
      return;
    }
    setStudents((prevStudents) => [
      ...prevStudents,
      { matricNumber: studentMatricNo, fullName: studentName },
    ]);

    // Optionally clear input fields after adding
    setStudentName("");
    setStudentMatricNo("");
  };

  return (
    <div className={styles["modal-page"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-head"]}>
          <h3>Create Session</h3>
          <IoClose onClick={closeModal} className={styles["close-icon"]} />
        </div>
        <div className={styles["modal-body"]}>
          {/* --- SIDEBAR --- */}
          <div className={styles["sidebar"]}>
            <div className={styles["menu"]}>
              <div
                className={styles["circle-no"]}
                id={formstep >= 1 ? styles["active"] : styles[""]}
              >
                {formstep > 1 ? <FaCheck /> : 1}
              </div>
              <p
                className={
                  formstep >= 1
                    ? styles["active-text"]
                    : styles["inactive-text"]
                }
              >
                Session Initialization
              </p>
            </div>
            <div className={styles["menu"]}>
              <div
                className={styles["circle-no"]}
                id={formstep >= 2 ? styles["active"] : styles[""]}
              >
                {formstep > 2 ? <FaCheck /> : 2}
              </div>
              <p
                className={
                  formstep >= 2
                    ? styles["active-text"]
                    : styles["inactive-text"]
                }
              >
                Content configuration{" "}
              </p>
            </div>
            <div className={styles["menu"]}>
              <div
                className={styles["circle-no"]}
                id={formstep >= 3 ? styles["active"] : styles[""]}
              >
                {formstep > 3 ? <FaCheck /> : 3}
              </div>
              <p
                className={
                  formstep >= 3
                    ? styles["active-text"]
                    : styles["inactive-text"]
                }
              >
                Student enrollment
              </p>
            </div>
            <div className={styles["menu"]}>
              <div
                className={styles["circle-no"]}
                id={formstep >= 4 ? styles["active"] : styles[""]}
              >
                {formstep > 4 ? <FaCheck /> : 4}
              </div>
              <p
                className={
                  formstep >= 4
                    ? styles["active-text"]
                    : styles["inactive-text"]
                }
              >
                Confirmation
              </p>
            </div>
            {/* <div className={styles['menu']}>
              <div className={styles['circle-no']} id={formstep >= 5 ? styles['active'] : styles['']}>{formstep > 5 ? <FaCheck /> : 5}</div>
              <p className={formstep >= 5 ? styles['active-text'] : styles['inactive-text']}></p>
            </div> */}
          </div>

          <div className={styles["content"]}>
            {/* --- STEP 1 -- */}
            {formstep === 1 && (
              <div className={styles["content1"]}>
                <div className={styles["group"]}>
                  <p>Select supported programming languages</p>
                  <div
                    className={
                      languageIndex === 1
                        ? styles["active-language"]
                        : styles["language"]
                    }
                    onClick={() => updateLanguage(1)}
                  >
                    Python {languageIndex === 1 && <IoClose size={18} />}{" "}
                  </div>
                  <div
                    className={
                      languageIndex === 2
                        ? styles["active-language"]
                        : styles["language"]
                    }
                    onClick={() => updateLanguage(2)}
                  >
                    MySQL {languageIndex === 2 && <IoClose size={18} />}{" "}
                  </div>
                  <div
                    className={
                      languageIndex === 3
                        ? styles["active-language"]
                        : styles["language"]
                    }
                    onClick={() => updateLanguage(3)}
                  >
                    C# {languageIndex === 3 && <IoClose size={18} />}{" "}
                  </div>
                  <div
                    className={
                      languageIndex === 4
                        ? styles["active-language"]
                        : styles["language"]
                    }
                    onClick={() => updateLanguage(4)}
                  >
                    Matlab {languageIndex === 4 && <IoClose size={18} />}{" "}
                  </div>
                </div>
                <div className={styles["group"]}>
                  <p>Language version</p>
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Enter language version"
                  />
                </div>

                <div className={styles["group"]}>
                  <p>When will this session start?</p>
                  <input
                    type="date"
                    placeholder="Select date"
                    style={{ marginRight: "20px" }}
                  />
                  <input type="time" name="" id="" placeholder="select time" />
                </div>
                <div className={styles["group"]}>
                  <p>When will this session end?</p>
                  <input
                    type="date"
                    placeholder="Select date"
                    style={{ marginRight: "20px" }}
                  />
                  <input type="time" name="" id="" placeholder="select time" />
                </div>
                <div className={styles["group"]}>
                  <p>Session name or tag</p>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Enter a name or tag for this session (e.g. Web Development Practical)"
                  />
                </div>
              </div>
            )}

            {/* --- STEP 2 --- */}
            {formstep === 2 && (
              <div className={styles["content1"]}>
                {Array.from({ length: totalQuestionNumber }, (_, index) => (
                  <div key={index}>
                    <div className={styles["group"]}>
                      <p>Question {index + 1} </p>
                      <textarea
                        name=""
                        id=""
                        placeholder="Enter question 1"
                        style={{ width: "100%" }}
                        rows={7}
                      ></textarea>
                    </div>
                    <div
                      className={styles["group"]}
                      style={{ marginBottom: "5px" }}
                    >
                      <p>Instruction for question {index + 1} (if any)</p>
                      <textarea
                        name=""
                        id=""
                        placeholder="Enter Instruction"
                        style={{ width: "100%" }}
                        rows={7}
                      ></textarea>
                    </div>
                    <div className={styles["attach"]}>
                      <input
                        type="checkbox"
                        style={{ Width: "10px" }}
                        name=""
                        id=""
                      />
                      <p>Attach this instruction for all questions</p>
                    </div>
                    <div className={styles["group"]}>
                      {Array.from(
                        { length: totalTestCaseNumber[index] },
                        (_, testCaseIndex) => (
                          <div
                            key={testCaseIndex}
                            className={styles["testcase"]}
                          >
                            <p className={styles["title"]}>
                              Test Case {testCaseIndex + 1}
                            </p>
                            <div className={styles["group"]}>
                              <p>Input data</p>
                              <input
                                type="text"
                                id={`input-data-${index}-${testCaseIndex + 1}`}
                                placeholder="Enter input data"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <div className={styles["group"]}>
                              <p>Expected outcome</p>
                              <input
                                type="text"
                                id={`expected-outcome-${index}-${
                                  testCaseIndex + 1
                                }`}
                                placeholder="Enter expected outcome"
                                style={{ width: "100%" }}
                              />
                            </div>
                            <div className={styles["group"]}>
                              <p>Set test case weight</p>
                              <input
                                type="number"
                                id={`test-case-value-${index}-${
                                  testCaseIndex + 1
                                }`}
                                placeholder="Enter weight"
                                style={{ marginRight: "20px" }}
                              />
                            </div>
                          </div>
                        )
                      )}
                      <div
                        className={styles["add"]}
                        onClick={() =>
                          setTotalTestCaseNumber((prev) => {
                            const newTestCaseNumber = [...prev];
                            newTestCaseNumber[index] += 1;
                            return newTestCaseNumber;
                          })
                        }
                      >
                        <IoAddOutline size={22} />
                        <p> Add another test case</p>
                      </div>
                    </div>
                    <div className={styles["flags"]}>
                      <p className={styles["title"]}>Check Flags </p>
                      {[
                        "Coding style",
                        "Correctness",
                        "Successful execution",
                        "Successful compilation",
                      ].map((flag, flagIndex) => (
                        <div key={flagIndex} className={styles["flag"]}>
                          <input
                            type="checkbox"
                            id={`flag-${index}-${flagIndex}`}
                            onChange={(e) =>
                              handleFlagChange(e, index, flagIndex)
                            }
                          />
                          <label htmlFor={`flag-${index}-${flagIndex}`}>
                            {flag}
                          </label>
                          <input
                            type="number"
                            id={`flag-weight-${index}-${flagIndex}`}
                            placeholder="Enter weight"
                            style={{ marginLeft: "10px" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className={styles["allow"]}>
                  <p>Allow students to get review report after grading</p>
                  <div
                    className={styles["toggle-container"]}
                    style={{
                      backgroundColor: allowReviewReport ? "" : "#969696",
                      cursor: "pointer",
                    }}
                    onClick={() => setAllowReviewReport((value) => !value)}
                  >
                    <div
                      className={styles["toggle-circle"]}
                      style={{ marginLeft: allowReviewReport ? "auto" : "0" }}
                    ></div>
                  </div>
                </div>
                <div
                  className={styles["add"]}
                  onClick={() => setTotalQuestionNumber((number) => number + 1)}
                >
                  <IoAddOutline size={22} />
                  <p> Add another question</p>
                </div>
              </div>
            )}

            {formstep === 3 && (
              <div className={styles["content1"]}>
                <div
                  className={styles["group"]}
                  style={{ marginBottom: "15px" }}
                >
                  <p>Enrollment method</p>
                  <select
                    name=""
                    id=""
                    value={enrollmentMethod}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setEnrollmentMethod(e.target.value);
                      setStudents([]);
                    }}
                  >
                    <option value="file">Add student from file</option>
                    <option value="direct">Direct invitation</option>
                  </select>
                </div>

                {/* <div className={styles['link']}>
      <p>sessionmgtsite.com/session/s3201</p>
      <span onClick={handleCopy}>{copied ? "Copied!" : "Copy"} <PiCopySimpleFill /></span>
    </div> */}
                {enrollmentMethod === "file" && (
                  <label htmlFor="file">
                    <div className={styles["upload-container"]}>
                      <BsCloudUpload className={styles["upload-icon"]} />
                      <p className={styles["text1"]}>Click to upload</p>
                      <p className={styles["text2"]}>
                        CSV or XLS file up to 10mb. Ensure columns are labelled
                        'Full Name' and 'Matric Number'
                      </p>
                      <input
                        type="file"
                        name=""
                        id="file"
                        accept=".csv,.xls,.xlsx"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                    </div>
                  </label>
                )}
                {console.log(students)}

                {enrollmentMethod === "direct" && (
                  <div className={styles["group"]}>
                    <p>Student Information to invite</p>
                    <input
                      type="text"
                      placeholder="Enter student full name"
                      style={{ marginRight: "20px" }}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter student matric number"
                      value={studentMatricNo}
                      onChange={(e) => setStudentMatricNo(e.target.value)}
                    />
                    <button
                      className={styles["add-student"]}
                      onClick={addStudent}
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className={styles["student-container"]}>
                  <h4 className={styles["student-head-text"]}>Students</h4>
                  {students?.map((student, index) => (
                    <div key={index} className={styles["student-box"]}>
                      <p>{student.fullName}</p>
                      <p>{student.matricNumber}</p>
                    </div>
                  ))}
                </div>
                <div className={styles["group"]}>
                  <p>When will invitation expire? (Optional)</p>
                  <input
                    type="number"
                    placeholder="Enter number"
                    style={{ marginRight: "20px" }}
                  />
                  <select name="" id="">
                    <option value="">Hours</option>
                  </select>
                </div>
              </div>
            )}

            {formstep === 4 && (
              <div className={styles["content1"]}>
                <div
                  className={styles["group"]}
                  style={{ marginBottom: "15px" }}
                >
                  <p>All set?</p>
                  <span>
                    Clicking the Submit button below confirms that all has been
                    set for this session.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles["modal-footer"]}>
          {formstep > 1 && (
            <p onClick={() => setFormStep((formstep) => formstep - 1)}>Back</p>
          )}
          <button className={styles["discard-btn"]}>Discard changes</button>
          {formstep < 4 && <button onClick={handleContinue}>Continue</button>}
          {formstep === 4 && <button>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
