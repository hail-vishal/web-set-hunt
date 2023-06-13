import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Timer from '../pages/timer';
import { REMOVE_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { UPDATE_QUESTION } from '../reducers/questionReducer';
import styles from '../styles/Home4.module.css';
import networkRequest from '../utils/request';
import customToast from '../utils/toast';
import thank from '../public/thank.jpeg';

function Questions() {
  const currentQuestion = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const ansRef = useRef();
  const user = useSelector((state) => state.user);
  const loader = useSelector((state) => state.loader);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    async function fetchQuestion() {
      const url = process.env.NEXTAUTH_URL + '/api/questions';
      const response = await networkRequest('GET', url, {});
      // console.log(response);
      if (response.status === 200) {
        const { questionNo, questionURL } = response.data;
        dispatch(UPDATE_QUESTION({ questionNo, questionURL }));
      }
      else if (response.status === 201) {
        customToast('All questions done!', 'success');
        dispatch(UPDATE_QUESTION({ questionNo: 100, questionURL: '' }));
        setDisable(true);
      }
    }

    const startTime = new Date(process.env.START_TIME);
    const endTime = new Date(process.env.END_TIME);
    const current = new Date();
    let timeout;
    let timeout1;
    if (Date.parse(current) < Date.parse(endTime) && Date.parse(current) > Date.parse(startTime)) {
      fetchQuestion();
      if (loader) {
        dispatch(REMOVE_LOADER());
      }
    }
    else if (Date.parse(current) < Date.parse(startTime)) {
      dispatch(SHOW_LOADER());
      timeout = setTimeout(() => {
        fetchQuestion();
        dispatch(REMOVE_LOADER());
      }, Date.parse(startTime) - Date.parse(current));
    }
    else if(Date.parse(current)<Date.parse(endTime)) {
      timeout1 = setTimeout(() => {
        setDisable(true);
      }, Date.parse(endTime) - Date.parse(current));
    }
    else{
      setDisable(true);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (timeout1) {
        clearTimeout(timeout1);
      }
    }

  }, []);


  async function handleKeyDown(event) {
    if (event.key === 'Enter' && ansRef && ansRef.current && ansRef.current.value) {
      await handleSubmit(event);
    }
  }

  async function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    if (ansRef && ansRef.current && ansRef.current.value) {
      const url = process.env.NEXTAUTH_URL + '/api/questions';
      const data = {
        teamAns: ansRef.current.value
      }
      const response = await networkRequest('POST', url, data);
      // console.log(response);
      if (response.status === 200) {
        customToast(response.data.message, 'success');
        const { questionNo, questionURL } = response.data;
        dispatch(UPDATE_QUESTION({ questionNo, questionURL }));
        ansRef.current.value = '';
      }
      else if (response.status === 201) {
        customToast('All questions done!', 'success');
        setDisable(true);
        dispatch(UPDATE_QUESTION({ questionNo: 100, questionURL: null }));
        ansRef.current.value = '';
      }
      else {
        customToast(response.data.message, 'failure');
      }
    }
  }


  return (
    user ? user.teamName ?
      loader ?
        <Timer /> 
        : <div className={styles.gAquestionsComponent+`${disable?styles.fullSpaceContainer:''}`}>
          <ToastContainer theme="colored" />
          <div className={styles.gAquestionsContainer+`${disable?styles.fullSpace:''}`} >
            {
              currentQuestion ?
                <img src={currentQuestion.questionURL?currentQuestion.questionURL:thank.src} className={styles.gAquestion } />
                : <></>
            }
          </div>
          {
            !disable?
          <div className={styles.gAAnswersContainer}>
            <div style={{display:'flex',width:'300px',justifyContent:'space-between',alignItems:'center'}}>
              <h1 style={{fontSize:'35px',color:'#D5FC34',fontWeight:'800',textAlign:'center'}}>Hunt No:</h1>
              {
                currentQuestion && currentQuestion.questionNo ?
                <div style={{width:'60px',height:'60px',background:'#210c3a',
                color:'#D5FC34',display:'flex',justifyContent:'center',
                alignItems:'center',borderRadius:'50%',alignSelf:'center',fontSize:'30px',fontWeight:'650'}}>
                  {currentQuestion.questionNo}
                  </div>
                :<></>
              }
              </div>
            <form>
              <label>Your Answer</label>
              
              <input type='text' placeholder='Your answer' required onKeyDown={handleKeyDown} ref={ansRef} disabled={disable} />
              <input type='button' 
              value='Submit' required  
              style={{width:'120px',alignSelf:'center',height:'50px',padding:'5px'
              ,marginTop:'20px',borderRadius:'32px',cursor:'pointer'}}
              onClick={handleSubmit}
              />
            </form>
          </div>
          :<></>
          }
        </div>
      :
      <div style={{ minWidth: 'fit-content', height: 'fit-content', fontSize: '22px', fontWeight: '650', color: 'white', overflow: 'hidden', maxWidth: '40vw', textTransform: 'capitalize',color:'#9537FF' }}>
        Please update your profile and team details to continue
      </div>
      :
      <div style={{ minWidth: 'fit-content', height: 'fit-content', fontSize: '28px', fontWeight: '700', color: 'white', overflow: 'hidden', maxWidth: '40vw', textTransform: 'capitalize',color:'#9537FF' }}>Loading...</div>

  )
}

export default Questions;