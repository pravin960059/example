import react, { useState,useEffect } from 'react';
import axios from "axios";
import './forgetpass.css'
import { useNavigate } from "react-router-dom";

function Forgetpassword(){
    const [username,SetUsername ]=useState("");
    const [otp,SetOtp]=useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [hotp,setHotp]=useState(true);;
    const [message,setMessage]=useState("")
    const navigate = useNavigate();
    const [password, SetPassword] = useState("");
    const [confirmpassword, SetConfirmpassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const resetotp= async(e)=>{
      e.preventDefault();
        if (username.length === 0) {
            setMessage('Username empty')
            return
      }
      const data = new FormData();
      data.append("username",username)
      const config = {
        method: "post",
        url: "http://127.0.0.1:5000/email",
        data: data,
      };
      try {
        const response = await axios.request(config);
        console.log(response.data.message);
        if(response.data.message==="Email sent successfully!"||response.data.message==="OTP sent successfully"){
        localStorage.setItem('username',username);
        
          navigate("/reset"); 
      
        }
        else{
          setMessage(response.data.message)
        }
      }
      catch (error) {console.log(error);
      }
    }
   
    return(
        <div className='total-login'>
         <div className='login-form2'>
          <form className='form-op' method='post' >
            <label className='label'>Username:<br/><input className='inputs' type="text" value={username} onChange={(e) => SetUsername(e.target.value)} placeholder='Enter Username or Number' /></label><br />
            <button className='button-29' onClick={resetotp}>Send OTP</button><br/>
            <p className='error-style'>{message}</p>

          
          </form>
        </div>  
        {/*<div className='login-form'>
          <form className='form-op' method='post' >

          
            <label className='label'>Username:<br/><input className='inputs' type="text" value={username} onChange={(e) => SetUsername(e.target.value)} placeholder='Enter Username or Number' /></label><br />
            <button className='button-29' onClick={resetotp}>Send OTP</button><br/>
            <p>{message}</p>
            <label  className='label'>OTP:<br/><input className='inputs' id='otp' type="number" value={otp} onChange={(e) => SetOtp(e.target.value)} placeholder='Enter OTP' /></label><br />
            <button  onClick={handleOTP} className='button-29' >Submit OTP</button>
          
          </form>
    </div>*/}
        </div>
    );
}

export default Forgetpassword;