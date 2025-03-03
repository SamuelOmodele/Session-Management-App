'use client'
import React, { useState } from 'react'
import styles from './createSessionModal.module.css'
import { IoAddOutline, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '@/redux/modalSlice';
import { BsCloudUpload } from "react-icons/bs";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import { createSession } from '@/services/createSession';
import Spinner from '../spinner/spinner';


const CreateSessionModal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // -- functions ---
    const closeModal = () => {
        dispatch(setIsModalOpen(false));
    }

    const handleInputChange = (id, field, value) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, [field]: value } : q
            )
        );
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            id: questions.length + 1,
            question: "",
            instruction: "",
            test_cases: [],
            flags: [],
        }]);
    };

    const changeLanguage = (index) => {
        if (languageIndex) {
            if (languageIndex === index) {
                setLanguageIndex('');
            } else {
                setLanguageIndex(index);
            }
        } else {
            setLanguageIndex(index)
        }
    }

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
                            matric_number: String(row["Matric Number"]),
                            fullname: String(row["Full Name"]),
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
                    matric_number: String(row["Matric Number"]),
                    fullname: String(row["Full Name"]),
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
        setStudents(prevStudents => [
            ...prevStudents,
            { matric_number: studentMatricNo, fullname: studentName }
        ]);

        // Optionally clear input fields after adding
        setStudentName('');
        setStudentMatricNo('');
    }

    const validateForm = () => {
        // const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";
        // console.log(BASE_URL);
        if (formstep === 1) {
            // if (!languageIndex) {
            //     toast.error('Select a language');
            //     return;
            // }
            // if (!version) {
            //     toast.error('language version is required');
            //     return;
            // }
            // if (!sessionStartDate) {
            //     toast.error('Session start date is required');
            //     return;
            // }
            // if (!sessionStartTime) {
            //     toast.error('Session start time is required');
            //     return;
            // }
            // if (!sessionEndDate) {
            //     toast.error('Session end date is required');
            //     return;
            // }
            // if (!sessionEndTime) {
            //     toast.error('Session end time is required');
            //     return;
            // }
            // if (!sessionName) {
            //     toast.error('Session name is requied');
            //     return;
            // }
            setFormStep(formstep => formstep + 1);
        } else if (formstep === 2) {
            setFormStep(formstep => formstep + 1);
        } else if (formstep === 3) {
            setFormStep(formstep => formstep + 1);
        } else if (formstep === 4) {
            setFormStep(4);
        }

    }

    const displayFormData = () => {
        console.log(languageIndex)
        console.log(['Python', 'MySQL', 'C#', 'Matlab'][languageIndex - 1])
        console.log(version)
        console.log(sessionStartDate, sessionStartTime)
        console.log(`${sessionStartDate} ${sessionStartTime}:00`);
        console.log(sessionEndDate, sessionEndTime)
        console.log(`${sessionEndDate} ${sessionEndTime}:00`);
        console.log(sessionName)
        console.log(allowReviewReport ? 'yes' : 'no')
        console.log(questions.map(({ id, ...rest }) => rest));
        // questions.map((question, index) => {
        //     console.log(transformCheckFlags(question.checkFlags));
        // })
        console.log(students)
        console.log(invitationExpiryDuration)
        // toast.success("Session created successfully!");
        submitSession();
    }

    const submitSession = async () => {
        try {
            setLoading(true);

            const response = await createSession({
                sessionData: {
                    language: ['Python', 'MySQL', 'C#', 'Matlab'][languageIndex - 1],
                    version: version,
                    startDateAndTime: `${sessionStartDate} ${sessionStartTime}:00`,
                    endDateAndTime: `${sessionEndDate} ${sessionEndTime}:00`,
                    sessionName: sessionName,
                    allowReviewReport: allowReviewReport ? 'yes' : 'no',
                    invitationExpiryDuration: invitationExpiryDuration,
                    questions: questions.map(({ id, ...rest }) => rest),
                    students: students,
                }
            });
            console.log('response', response);
            if (response.status) {
                toast.success(response.message);
                setTimeout(() => {
                    dispatch(setIsModalOpen(false));
                }, 1000);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // const transformCheckFlags = (checkFlags) =>
    //     checkFlags.map(flag => {
    //         const key = Object.keys(flag)[0];
    //         return { name: key.toLowerCase(), value: flag[key].toString() };
    //     });


    // Add a new test case
    const addTestCase = (qIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].test_cases.push({ input_data: "", expected_outcome: "", total_weight: 0 });
        setQuestions(updatedQuestions);
    };

    // Update test case details
    const updateTestCase = (qIndex, tIndex, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].test_cases[tIndex][key] = value;
        setQuestions(updatedQuestions);
    };

    // Handle check flag toggle and weight update
    // const handleCheckFlag = (qIndex, flag, weight) => {
    //     const updatedQuestions = [...questions];
    //     let flagIndex = updatedQuestions[qIndex].checkFlags.findIndex((f) => Object.keys(f)[0] === flag);

    //     if (weight === "" || weight === 0) {
    //         updatedQuestions[qIndex].checkFlags = updatedQuestions[qIndex].checkFlags.filter((f) => Object.keys(f)[0] !== flag);
    //     } else if (flagIndex === -1) {
    //         updatedQuestions[qIndex].checkFlags.push({ [flag]: parseInt(weight) });
    //     } else {
    //         updatedQuestions[qIndex].checkFlags[flagIndex][flag] = parseInt(weight);
    //     }

    //     setQuestions(updatedQuestions);
    // };

    // const handleCheckFlag = (qIndex, flag, weight) => {
    //     const updatedQuestions = [...questions];
    //     let flagIndex = updatedQuestions[qIndex].flags.findIndex((f) => f.name === flag);

    //     if (weight === "" || weight === 0) {
    //         // Remove the flag if weight is empty or 0
    //         updatedQuestions[qIndex].flags = updatedQuestions[qIndex].flags.filter((f) => f.name !== flag);
    //     } else if (flagIndex === -1) {
    //         // Add new flag in required format
    //         updatedQuestions[qIndex].flags.push({ name: flag, value: parseInt(weight) });
    //     } else {
    //         // Update existing flag weight
    //         updatedQuestions[qIndex].flags[flagIndex].value = parseInt(weight);
    //     }

    //     setQuestions(updatedQuestions);
    // };

    const handleCheckFlag = (qIndex, flag, weight) => {
        const updatedQuestions = [...questions];
        let flagIndex = updatedQuestions[qIndex].flags.findIndex((f) => f.name === flag);

        if (weight === "" || weight === "0") {
            // Remove the flag if weight is empty or "0"
            updatedQuestions[qIndex].flags = updatedQuestions[qIndex].flags.filter((f) => f.name !== flag);
        } else if (flagIndex === -1) {
            // Add new flag with value as a string
            updatedQuestions[qIndex].flags.push({ name: flag, value: weight.toString() });
        } else {
            // Update existing flag weight as a string
            updatedQuestions[qIndex].flags[flagIndex].value = weight.toString();
        }

        setQuestions(updatedQuestions);
    };

    // --- form interaction states ---
    const [formstep, setFormStep] = useState(1);
    const [enrollmentMethod, setEnrollmentMethod] = useState('file');
    const [languageIndex, setLanguageIndex] = useState('');

    // --- form inputs states ---
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            instruction: "",
            test_cases: [],
            flags: [],
        }
    ]);
    const [allowReviewReport, setAllowReviewReport] = useState(true);

    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [studentMatricNo, setStudentMatricNo] = useState('')

    const [version, setVersion] = useState('');
    const [sessionStartDate, setSessionStartDate] = useState('');
    const [sessionStartTime, setSessionStartTime] = useState('');
    const [sessionEndDate, setSessionEndDate] = useState('');
    const [sessionEndTime, setSessionEndTime] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [invitationExpiryDuration, setInvitationExpiryDuration] = useState(0);
    const checkFlagOptions = ["Coding style", "Correctness", "Successful execution", "Successful compilation"];


    return (
        <div className={styles['modal-page']}>

            <ToastContainer />
            <div className={styles['modal-container']}>
                <div className={styles['modal-head']}>
                    <h3>Create Session</h3>
                    <IoClose onClick={closeModal} className={styles['close-icon']} />
                </div>
                <div className={styles['modal-body']}>

                    {/* --- SIDEBAR --- */}
                    <div className={styles['sidebar']}>
                        <div className={styles['menu']}>
                            <div className={styles['circle-no']} id={formstep >= 1 ? styles['active'] : styles['']}>{formstep > 1 ? <FaCheck /> : 1}</div>
                            <p className={formstep >= 1 ? styles['active-text'] : styles['inactive-text']}>Session Initialization</p>
                        </div>
                        <div className={styles['menu']}>
                            <div className={styles['circle-no']} id={formstep >= 2 ? styles['active'] : styles['']}>{formstep > 2 ? <FaCheck /> : 2}</div>
                            <p className={formstep >= 2 ? styles['active-text'] : styles['inactive-text']}>Content configuration </p>
                        </div>
                        <div className={styles['menu']}>
                            <div className={styles['circle-no']} id={formstep >= 3 ? styles['active'] : styles['']}>{formstep > 3 ? <FaCheck /> : 3}</div>
                            <p className={formstep >= 3 ? styles['active-text'] : styles['inactive-text']}>Student enrollment</p>
                        </div>
                        <div className={styles['menu']}>
                            <div className={styles['circle-no']} id={formstep >= 4 ? styles['active'] : styles['']}>{formstep > 4 ? <FaCheck /> : 4}</div>
                            <p className={formstep >= 4 ? styles['active-text'] : styles['inactive-text']}>Confirmation</p>
                        </div>
                        {/* <div className={styles['menu']}>
              <div className={styles['circle-no']} id={formstep >= 5 ? styles['active'] : styles['']}>{formstep > 5 ? <FaCheck /> : 5}</div>
              <p className={formstep >= 5 ? styles['active-text'] : styles['inactive-text']}></p>
            </div> */}

                    </div>

                    <div className={styles['content']}>
                        {/* --- STEP 1 -- */}
                        {formstep === 1 &&
                            <div className={styles['content1']}>
                                <div className={styles['group']}>
                                    <p>Select supported programming languages</p>
                                    <div className={languageIndex === 1 ? styles['active-language'] : styles['language']} onClick={() => changeLanguage(1)}>Python {languageIndex === 1 && <IoClose size={18} />} </div>
                                    <div className={languageIndex === 2 ? styles['active-language'] : styles['language']} onClick={() => changeLanguage(2)}>MySQL {languageIndex === 2 && <IoClose size={18} />} </div>
                                    <div className={languageIndex === 3 ? styles['active-language'] : styles['language']} onClick={() => changeLanguage(3)}>C# {languageIndex === 3 && <IoClose size={18} />} </div>
                                    <div className={languageIndex === 4 ? styles['active-language'] : styles['language']} onClick={() => changeLanguage(4)}>Matlab {languageIndex === 4 && <IoClose size={18} />} </div>
                                </div>
                                <div className={styles['group']}>
                                    <p>Language version</p>
                                    <input style={{ width: '100%' }} type="number" placeholder='Enter language version' value={version} onChange={(e) => setVersion(e.target.value)} />
                                </div>

                                <div className={styles['group']}>
                                    <p>When will this session start?</p>
                                    <input type="date" placeholder='Select date' style={{ marginRight: '20px' }} value={sessionStartDate} onChange={(e) => setSessionStartDate(e.target.value)} />
                                    <input type="time" name="" id="" placeholder='select time' value={sessionStartTime} onChange={(e) => setSessionStartTime(e.target.value)} />
                                </div>
                                <div className={styles['group']}>
                                    <p>When will this session end?</p>
                                    <input type="date" placeholder='Select date' value={sessionEndDate} onChange={(e) => setSessionEndDate(e.target.value)} style={{ marginRight: '20px' }} />
                                    <input type="time" name="" id="" value={sessionEndTime} onChange={(e) => setSessionEndTime(e.target.value)} placeholder='select time' />
                                </div>
                                <div className={styles['group']}>
                                    <p>Session name or tag</p>
                                    <input style={{ width: '100%' }} type="text" value={sessionName} onChange={(e) => setSessionName(e.target.value)} placeholder='Enter a name or tag for this session (e.g. Web Development Practical)' />
                                </div>
                            </div>}

                        {/* --- STEP 2 --- */}
                        {formstep === 2 &&
                            <div className={styles['content1']}>
                                {questions.map((question, index) => (
                                    <div key={index}>
                                        <div className={styles['group']}>
                                            <p>Question {question.id} </p>
                                            <textarea name="" id="" placeholder={`Enter question ${question.id}`} style={{ width: '100%' }} rows={7} value={question.question} onChange={(e) => handleInputChange(question.id, "question", e.target.value)}></textarea>
                                        </div>
                                        <div className={styles['group']} style={{ marginBottom: '5px' }}>
                                            <p>Instruction for question {question.id} (if any)</p>
                                            <textarea name="" id="" placeholder='Enter Instruction' style={{ width: '100%' }} value={question.instruction} onChange={(e) => handleInputChange(question.id, "instruction", e.target.value)} rows={7}></textarea>
                                        </div>
                                        <>
                                            {question.test_cases.map((testcase, index) => (
                                                <div className={styles['test-cases']} key={index}>
                                                    <h3>Test case {index + 1}</h3>
                                                    <div className={styles['group']}>
                                                        <p>Input data</p>
                                                        <input type="text" placeholder='Enter input data' style={{ width: '100%' }} value={testcase.input_data} onChange={(e) => updateTestCase(question.id - 1, index, 'input_data', e.target.value)} />
                                                    </div>
                                                    <div className={styles['group']}>
                                                        <p>Expected Outcome</p>
                                                        <input type="text" placeholder='Enter expected outcome' style={{ width: '100%' }} value={testcase.expected_outcome} onChange={(e) => updateTestCase(question.id - 1, index, 'expected_outcome', e.target.value)} />
                                                    </div>
                                                    <div className={styles['group']}>
                                                        <p>Set test case weight</p>
                                                        <input type="text" placeholder='Enter weight' style={{ width: '50%' }} value={testcase.total_weight} onChange={(e) => updateTestCase(question.id - 1, index, 'total_weight', e.target.value)} />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className={styles['add']} onClick={() => addTestCase(question.id - 1)}>
                                                <IoAddOutline size={22} />
                                                <p> Add test case</p>
                                            </div>
                                        </>
                                        {/* <div className={styles['flag-container']}>
                                            <h3>Check flags</h3>
                                            {checkFlagOptions.map((flag) => {
                                                const existingFlag = question.flags.find((f) => f.name === flag);
                                                return (
                                                    <div className={styles['flags']} key={flag}>
                                                        <input
                                                            type="checkbox"
                                                            checked={!!existingFlag}
                                                            onChange={(e) => handleCheckFlag(question.id - 1, flag, e.target.checked ? 10 : "")}
                                                        />
                                                        <p>{flag}</p>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter weight"
                                                            value={existingFlag ? existingFlag.value : ""}
                                                            onChange={(e) => handleCheckFlag(question.id - 1, flag, e.target.value)}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div> */}

                                        <div className={styles['flag-container']}>
                                            <h3>Check flags</h3>
                                            {checkFlagOptions.map((flag) => {
                                                const existingFlag = question.flags.find((f) => f.name === flag);
                                                return (
                                                    <div className={styles['flags']} key={flag}>
                                                        <input
                                                            type="checkbox"
                                                            checked={!!existingFlag}
                                                            onChange={(e) => handleCheckFlag(question.id - 1, flag, e.target.checked ? "10" : "")}  // Ensure "10" is a string
                                                        />
                                                        <p>{flag}</p>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter weight"
                                                            value={existingFlag ? existingFlag.value : ""}
                                                            onChange={(e) => handleCheckFlag(question.id - 1, flag, e.target.value)}  // No need to convert to number
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                <div className={styles['allow']}>
                                    <p>Allow students to get review report after grading</p>
                                    <div className={styles['toggle-container']} style={{ backgroundColor: allowReviewReport ? '' : '#969696', cursor: 'pointer' }} onClick={() => setAllowReviewReport(value => !value)}>
                                        <div className={styles['toggle-circle']} style={{ marginLeft: allowReviewReport ? 'auto' : '0' }}></div>
                                    </div>
                                </div>
                                <div className={styles['add']} onClick={addQuestion}>
                                    <IoAddOutline size={22} />
                                    <p> Add another question</p>
                                </div>
                            </div>}

                        {formstep === 3 &&
                            <div className={styles['content1']}>
                                <div className={styles['group']} style={{ marginBottom: '15px' }}>
                                    <p>Enrollment method</p>
                                    <select name="" id="" value={enrollmentMethod} style={{ width: '100%' }} onChange={(e) => { setEnrollmentMethod(e.target.value); setStudents([]) }}>
                                        <option value="file">Add student from file</option>
                                        <option value="direct" >Direct invitation</option>
                                    </select>
                                </div>
                                {enrollmentMethod === 'file' && <label htmlFor='file'>
                                    <div className={styles['upload-container']}>
                                        <BsCloudUpload className={styles['upload-icon']} />
                                        <p className={styles['text1']}>Click to upload</p>
                                        <p className={styles['text2']}>CSV or XLS file up to 10mb. Ensure columns are labelled 'Full Name' and 'Matric Number'</p>
                                        <input type="file" name="" id="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} style={{ display: 'none' }} />
                                    </div>
                                </label>}
                                {console.log(students)}

                                {enrollmentMethod === 'direct' &&
                                    <div className={styles['group']}>
                                        <p>Student Information to invite</p>
                                        <input type="text" placeholder='Enter student full name' style={{ marginRight: '20px' }} value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                                        <input type="text" placeholder='Enter student matric number' value={studentMatricNo} onChange={(e) => setStudentMatricNo(e.target.value)} />
                                        <button className={styles['add-student']} onClick={addStudent}>Add</button>
                                    </div>
                                }

                                <div className={styles['student-container']}>
                                    <h4 className={styles['student-head-text']}>Students</h4>
                                    {students?.map((student, index) => (
                                        <div key={index} className={styles['student-box']}>
                                            <p>{student.fullname}</p>
                                            <p>{student.matric_number}</p>
                                        </div>

                                    ))}
                                </div>
                                <div className={styles['group']}>
                                    <p>When will invitation expire? (Optional)</p>
                                    <input type="number" placeholder='Enter number' style={{ marginRight: '20px' }} value={invitationExpiryDuration} onChange={(e) => setInvitationExpiryDuration(e.target.value)} />
                                    <select name="" id="">
                                        <option value="">Hours</option>
                                    </select>
                                </div>

                            </div>}

                        {formstep === 4 &&
                            <div className={styles['content1']}>
                                <div className={styles['group']} style={{ marginBottom: '15px' }}>
                                    <p>All set?</p>
                                    <span>Clicking the Submit button below confirms that all has been set for this session.</span>
                                </div>
                            </div>}
                    </div>
                </div>

                <div className={styles['modal-footer']}>
                    {formstep > 1 && <p onClick={() => setFormStep(formstep => formstep - 1)}>Back</p>}
                    <button className={styles['discard-btn']}>Discard changes</button>
                    {formstep < 4 && <button onClick={validateForm}>Continue</button>}
                    {formstep === 4 && <button onClick={displayFormData}>{loading ? <Spinner size={22} color={'white'} /> : 'Submit'}</button>}
                </div>
            </div>
        </div>
    )
}

export default CreateSessionModal