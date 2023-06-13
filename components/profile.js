import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { UPDATE_USER } from "../reducers/userReducer";
import styles from '../styles/Home4.module.css';
import networkRequest from "../utils/request";
import customToast from "../utils/toast";

const Profile = () => {
  const userData = useSelector(state=>state.user);
  const [editable,setEditable]=useState(true);
  const nameRef = useRef();
  const mobileNumberRef = useRef();
  const rollNumberRef= useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
      if(nameRef&&nameRef.current){
        nameRef.current.value = userData?.name? userData.name : ''
      }
      if(mobileNumberRef&&mobileNumberRef.current)
        mobileNumberRef.current.value = userData?.mobileNumber ? userData.mobileNumber : '';
      if(rollNumberRef && rollNumberRef.current)
        rollNumberRef.current.value = userData?.rollNumber ?userData.rollNumber: ''

  },[editable,nameRef,mobileNumberRef,rollNumberRef,userData]);

  function onEdit(event){
    setEditable((prev)=>{
      return !prev;
    });
  }

  async function updateUserDetails(){
      const name= nameRef?.current?.value;
      const email = emailRef?.current?.value;
      const mobileNumber = mobileNumberRef?.current?.value;
      const rollNumber = rollNumberRef?.current?.value;
      if(!name || !email || !mobileNumber || !rollNumber){
        customToast('fill all the details','warning');
        return;
      }
      const url = process.env.NEXTAUTH_URL+'/api/user';
      const data = {
        name,email,mobileNumber,rollNumber  
      }
      const result = await networkRequest('POST',url,data);
      // console.log(result);
      const val =result?.data?.message;
      if(result.status===200){
        customToast(val?val:'details updated','success');
        dispatch(UPDATE_USER(result.data.user));
        onEdit();
      }
      else{
        customToast(val?val:'updation failed','failure');
      }
  }

  return (
    <>
    <ToastContainer theme="colored" />
      <div className={styles.profileContainer}>
            <div className={styles.profileSection}>
              <button className={styles.profileEditButton+ ` ${editable?'':styles.hideButton }`} onClick={onEdit} >
                <div>

                </div>
                Edit
                </button>
            <div className={styles.profilePicture}>
                  
                </div>
              <div className={styles.profileDetails}>
                <div className={styles.profileDetail}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    
                    required
                    disabled={editable}
                    ref={nameRef}
                  />
                </div>
                <div className={styles.profileDetail}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="username@email.com"
                    value={userData?.email}
                    required
                    disabled={true}
                    ref={emailRef}
                  />
                </div>
                <div className={styles.profileDetail}>
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="eg. 9999123456"
                   
                    required
                    disabled={editable}
                    ref={mobileNumberRef}
                  />
                </div>
                <div className={styles.profileDetail}>
                  <label>Roll Number</label>
                  <input
                    type="number"
                    name="roll"
                    id="roll"
                    placeholder="eg. 12115071"
                    required
                    
                    disabled={editable}
                    ref={rollNumberRef}
                  />
                </div>
              </div>
              {!editable?<div className={styles.profileFooterButtons}>
                <button onClick={updateUserDetails} className={styles.saveChanges}>Save</button>
                <button onClick={onEdit} className={styles.saveChanges}>Cancel</button>
              </div>
              :<></>}
        </div>
      </div>
    </>
  );
};

export default Profile;
