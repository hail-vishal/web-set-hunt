import React, { useEffect, useRef } from 'react'
import {signIn,useSession} from 'next-auth/react';;
import bg_login from '../public/bg_login.png';
import micro from '../public/microbus.jpeg';
import google from '../public/google.svg';
import SocialMediaFooter from '../components/SocialMediaFooter';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import customToast, { toastCodes } from '../utils/toast';
import Layout from '../components/layout';
import Link from 'next/link';


const Login = () => {
  const emailRef= useRef();
  const passwordRef= useRef();
  const router = useRouter();
  const {data:session,status}=useSession();

  useEffect(()=>{
    if(status!=="loading"){
      if(status==="authenticated"){
        router.push('/lobby');
      }
    }
  },[session,status]);
 
  
  async function submitHandler(event){
    event.preventDefault();
    const result = await signIn('credentials',{
      redirect:false,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      callbackUrl:'/lobby'
    },);
    if(!result.ok){
      customToast('login failed',toastCodes.FAILURE);
    }
  }

  async function handleSignInGoogle(){
    const response = await signIn('google',{callbackUrl:'/lobby'});
    // console.log('heloo');
    // console.log(response);
  }

  return (

    <>
    <Layout >
    <style jsx>
    {`
        .bg-pos{
           background-size : 100% !important;
           background-color : black !important;
  
        }
        `}
    </style>
    

    <div className='h-screen w-full relative'>
      <ToastContainer />
      <div className='px-8 w-full h-full bg-pos no-repeat ' style={{'background':`url(${bg_login.src})`}}>
          <div className='w-full flex justify-center items-center py-6 overflow-hidden'>
            <img className='w-16' src={micro.src} alt="micro" />
          </div>
          <h1 className='text-xl lg:text-3xl font-semibold text-center text-neon mb-3 lg:mb-4'>Log in</h1>
          <div className='flex justify-center items-center mb-3 cursor-pointer' onClick={handleSignInGoogle}>
            <img className='w-10 rounded-md' src={google.src} alt="google" />
          </div>
          <p className='text-center text-white text-lg mb-3'>or</p>

          <div className='flex justify-center'>
            <form className='w-full lg:w-1/5'>
                <div className='mb-6'>
                  <label className='text-white font-semibold text-lg' htmlFor="email">Email</label> <br/>
                  <input className='bg-neon px-2 py-1 lg:px-4 lg:py-2 text-gray-700 text-lg mt-2 w-full rounded-lg hover:outline-0 border-0 ' type="email" id="email"  name="email" placeholder='Email' required ref={emailRef}/>
                </div>
                <div className='mb-10'>
                  <label className='text-white font-semibold text-lg' htmlFor="pass">Password</label> <br/>
                  <input className='bg-neon px-2 py-1 lg:px-4 lg:py-2 text-gray-700 text-lg mt-2 w-full rounded-lg hover:outline-0 border-0' type="password" id="pass"  name="password" placeholder='Password' required ref={passwordRef} />
                </div>

                <div className='flex justify-center'>
                  <button className='px-12 py-1 rounded-full bg-neon font-semibold text-lg' onClick={submitHandler}>
                    Log in
                  </button>
                </div>
              {/* <Link href='/signUp'><p className='text-xl mt-8 font-bold cursor-pointer' style={{color:'#D5FC34',width:'100%',textAlign:'center'}}>Don&apos;t have an account?</p></Link> */}
              </form>
          </div>
            
      </div>
      <SocialMediaFooter />
    </div>
    </Layout>
    
    </>
    
  )
}

export default Login