import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastCodes = {
   SUCCESS:'SUCCESS',
   FAILURE:'FAILURE',
   WARNING:'WARNING'
};

export default function customToast(text,result){
   // console.log(text,result);
   if(result.toUpperCase()==='SUCCESS')
   return toast.success(text,{
    position: toast.POSITION.TOP_RIGHT 
   });
   else if(result.toUpperCase()==='FAILURE')
   return toast.error(text,{
    position: toast.POSITION.TOP_RIGHT
   });
   else if(result.toUpperCase()==='WARNING')
   return toast.warn(text,{
    position: toast.POSITION.TOP_RIGHT
   });
}


