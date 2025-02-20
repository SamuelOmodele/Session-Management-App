import React from 'react'
import styles from './modal.module.css'
import { IoClose } from "react-icons/io5";

const Modal = () => {
  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-head']}>
        <h3>Create Session</h3>
        <IoClose />
      </div>
      <div className={styles['modal-body']}>
        <div className={styles['sidebar']}>
          <div>
            <div className={styles['circle-no']}>1</div>
            Session Initialization
          </div>
          <div>
            <div className={styles['circle-no']}>2</div>
            Content configuration
          </div>
          <div>
            <div className={styles['circle-no']}>3</div>
            Group management
          </div>
          <div>
            <div className={styles['circle-no']}>4</div>
            Student enrollment
          </div>
          <div>
            <div className={styles['circle-no']}>5</div>
            Confirmation
          </div>

        </div>
        <div className={styles['content']}>
          <p>content here </p>

        </div>
      </div>
      <div className={styles['modal-footer']}>
        <button>Discard changes</button>
        <button>Continue</button>
      </div>
    </div>
  )
}

export default Modal