'use client'
import React, { useState } from 'react'
import styles from './modal.module.css'
import { IoAddOutline, IoClose } from "react-icons/io5";
import { PiCopySimpleFill } from 'react-icons/pi';


const Modal = () => {

  const [formstep, setFormStep] = useState(1);

  const [copied, setCopied] = useState(false);
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

  return (
    <div className={styles['modal-page']}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-head']}>
          <h3>Create Session</h3>
          <IoClose />
        </div>
        <div className={styles['modal-body']}>

          {/* --- SIDEBAR --- */}
          <div className={styles['sidebar']}>
            <div className={styles['menu']} onClick={() => setFormStep(1)}>
              <div className={styles['circle-no']} id={formstep === 1 ? styles['active'] : styles['']}>1</div>
              Session Initialization
            </div>
            <div className={styles['menu']} onClick={() => setFormStep(2)}>
              <div className={styles['circle-no']} id={formstep === 2 ? styles['active'] : styles['']}>2</div>
              Content configuration
            </div>
            <div className={styles['menu']} onClick={() => setFormStep(3)}>
              <div className={styles['circle-no']} id={formstep === 3 ? styles['active'] : styles['']}>3</div>
              Group management
            </div>
            <div className={styles['menu']} onClick={() => setFormStep(4)}>
              <div className={styles['circle-no']} id={formstep === 4 ? styles['active'] : styles['']}>4</div>
              Student enrollment
            </div>
            <div className={styles['menu']} onClick={() => setFormStep(5)}>
              <div className={styles['circle-no']} id={formstep === 5 ? styles['active'] : styles['']}>5</div>
              Confirmation
            </div>

          </div>

          <div className={styles['content']}>
            {/* --- STEP 1 -- */}
            {formstep === 1 &&
              <div className={styles['content1']}>
                <div className={styles['group']}>
                  <p>Select supported programming languages</p>
                  <div className={styles['language']}>Python</div>
                  <div className={styles['language']}>MySQL</div>
                  <div className={styles['language']}>C#</div>
                  <div className={styles['language']}>Matlab</div>
                </div>
                <div className={styles['group']}>
                  <p>Set duration for the session</p>
                  <input type="number" placeholder='Enter number' style={{ marginRight: '20px' }} />
                  <select name="" id="">
                    <option value="">Hours</option>
                  </select>
                </div>
                <div className={styles['group']}>
                  <p>When will this session start?</p>
                  <input type="date" placeholder='Select date' style={{ marginRight: '20px' }} />
                  <input type="time" name="" id="" placeholder='select time' />
                </div>
                <div className={styles['group']}>
                  <p>When will this session end?</p>
                  <input type="date" placeholder='Select date' style={{ marginRight: '20px' }} />
                  <input type="time" name="" id="" placeholder='select time' />
                </div>
                <div className={styles['group']}>
                  <p>Session name or tag</p>
                  <input style={{ width: '100%' }} type="text" placeholder='Enter a name or tag for this session (e.g. Web Development Practical)' />
                </div>
              </div>}

            {/* --- STEP 2 --- */}
            {formstep === 2 &&
              <div className={styles['content1']}>
                <div className={styles['group']}>
                  <p>Question 1</p>
                  <textarea name="" id="" placeholder='Enter question 1' style={{ width: '100%' }} rows={7}></textarea>
                </div>
                <div className={styles['group']} style={{ marginBottom: '5px' }}>
                  <p>Instruction for question 1 (if any)</p>
                  <textarea name="" id="" placeholder='Enter Instruction' style={{ width: '100%' }} rows={7}></textarea>
                </div>
                <div className={styles['attach']}>
                  <input type="checkbox" style={{ Width: '10px' }} name="" id="" />
                  <p>Attach this instruction for all questions</p>
                </div>
                <div className={styles['group']}>
                  <p>Set question 1 value</p>
                  <input type="number" placeholder='Enter total score/weight' style={{ marginRight: '20px' }} />
                  <input type="number" name="" id="" placeholder='Enter score percentage' />
                </div>
                <div className={styles['group']}>
                  <p>Input data for question 1</p>
                  <textarea name="" id="" placeholder='Enter Input data or link' style={{ width: '100%' }} rows={7}></textarea>
                </div>
                <div className={styles['group']}>
                  <p>Expected output for question 1</p>
                  <textarea name="" id="" placeholder='Enter Expected output' style={{ width: '100%' }} rows={7}></textarea>
                </div>

                <div className={styles['allow']}>
                  <p>Allow students to get review report after grading</p>
                  <div className={styles['toggle-container']}>
                    <div className={styles['toggle-circle']}></div>
                  </div>
                </div>
                <div className={styles['add']}>
                  <IoAddOutline size={22} />
                  <p> Add another question</p>
                </div>
              </div>}

            {formstep === 3 &&
              <div className={styles['content1']}>
                <div className={styles['group']}>
                  <p>Collaborative work settings</p>
                  <select name="" id="" style={{ width: '100%' }}>
                    <option value="">Single work group for the entire session</option>
                  </select>
                </div>
                <div className={styles['group']}>
                  <p>Group access type</p>
                  <select name="" id="" style={{ width: '100%' }}>
                    <option value="">Open</option>
                    <option value="">Close</option>
                  </select>
                </div>
              </div>}

            {formstep === 4 &&
              <div className={styles['content1']}>
                <div className={styles['group']} style={{marginBottom: '15px'}}>
                  <p>Enrollment method</p>
                  <select name="" id="" style={{ width: '100%' }}>
                    <option value="">Share invitation link</option>
                  </select>
                </div>

                <div className={styles['link']}>
                  <p>sessionmgtsite.com/session/s3201</p>
                  <span onClick={handleCopy}>{copied ? "Copied!" : "Copy"} <PiCopySimpleFill /></span>
                </div>

                <div className={styles['group']}>
                  <p>When will invitation expire? (Optional)</p>
                  <input type="number" placeholder='Enter number' style={{ marginRight: '20px' }} />
                  <select name="" id="">
                    <option value="">Hours</option>
                  </select>
                </div>

              </div>}

            {formstep === 5 &&
              <div className={styles['content1']}>
                <div className={styles['group']} style={{marginBottom: '15px'}}>
                  <p>All set?</p>
                  <span>Clicking the Submit button below confirms that all has been set for this session.</span>
                </div>
              </div>}
          </div>
        </div>
        <div className={styles['modal-footer']}>
          <button>Discard changes</button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Modal