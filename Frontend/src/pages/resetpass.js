import React,{useEffect,useState} from "react"
import axios from "axios";  
import { useNavigate } from "react-router-dom";
import './resetpass.css'



function Reset(){
  const [otp,SetOtp]=useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [successfulmessage,setSuccessfulmessage]=useState("");
  const [message,setMessage]=useState("")
  const [otpmessage,setOtpmessage]=useState("")
  const navigate = useNavigate();
  const [password, SetPassword] = useState("");
  const [confirmpassword, SetConfirmpassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
    const username= localStorage.getItem("username")
   


  const handleOTP= async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username",username);
    data.append("otp",otp);
    const config = {
      method: "post",
      url: "http://127.0.0.1:5000/verifyotp",
      data: data,
    };
      const response = await axios.request(config);
      
      if(response.data.status==="OTP is verified"){
        console.log(response.data.status);
        setIsDisabled(false);
        setOtpmessage(response.data.status);}
      else
      setOtpmessage(response.data.status)
  }

    const checkPasswordMatch = () => {
        if (password === confirmpassword) {
          setPasswordsMatch(true);
        } else {
          setPasswordsMatch(false);
        }
      };
      useEffect(() => {
        checkPasswordMatch();
      }, [confirmpassword]);

      
  const resetpassword = async (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setMessage(
        'Password must be greater than or equal to 8 characters',
      )
      return
    }
    let countUpperCase = 0
    let countLowerCase = 0
    let countDigit = 0
    let countSpecialCharacters = 0

    for (let i = 0; i < password.length; i++) {
      const specialChars = ['!','@','#','$','%','^','&','*','(',')','_','-','+','=','[','{',']','}',':',';','<','>',]
      if (specialChars.includes(password[i])) {
        countSpecialCharacters++
      } else if (!isNaN(password[i] * 1)) {
        countDigit++
      } else {
        if (password[i] === password[i].toUpperCase()) {
          countUpperCase++
        }
        if (password[i] === password[i].toLowerCase()) {
          countLowerCase++
        }
      }
    }

    if (countLowerCase === 0) {
      setMessage('0 lower case characters in password')
      return
    }

    if (countUpperCase === 0) {
      setMessage('0 upper case characters in password')
      return
    }

    if (countDigit === 0) {
      setMessage(' 0 digit characters in password')
      return
    }

    if (countSpecialCharacters === 0) {
      setMessage(' 0 special characters in password')
      return
    }
    
      const data = new FormData;
      data.append("username",username)
      data.append('password', confirmpassword);
      const config = {
          method: "post",
          url: "http://127.0.0.1:5000/forget_password",
          data: data,
        };
        const response = await axios.request(config);
        console.log(response.data.message);
        setSuccessfulmessage(response.data.message);
        localStorage.removeItem('username');
        setTimeout(() => { 
          navigate("/"); 
      }, 5000);

  }
  const back= ()=>{
    localStorage.removeItem('username');
    navigate('/')
  }
  const emailback=()=>{
    navigate("/pages/forgetpass.js")
  }
    return(
      <div className="total-login">
      <div className='login-form'>
      <form className='form-op' method='post' >
        
        <p className='label'id='username'>Username:</p><p>{username}</p>
          {username !=null &&<><label  className='label'>OTP:<br/><input className='inputs' id='otp' type="number" value={otp} onChange={(e) => SetOtp(e.target.value)} placeholder='Enter OTP' /></label><br />
          <button  onClick={handleOTP} className='button-29' >Submit OTP</button><br/>

          <span className='error-style'>{otpmessage}</span><br/>
          <label  className='label'>Password:<br/><input className='inputs' type="Password" value={password} onChange={(e) => SetPassword(e.target.value)} placeholder='Enter Password' /></label><br />
          <span className='error-style'>{message}</span><br/>
          <label  className='label'>Confirm Password:<br/><input className='inputs' type="Password" value={confirmpassword} onChange={(e) => SetConfirmpassword(e.target.value)} placeholder='Enter Password' /></label><br />
          <div className='error-style'>{passwordsMatch ? (<p> </p> ) : (<p>Passwords do not match</p>)}</div>
          <button className='button-29' disabled={isDisabled} onClick={resetpassword}>Reset password</button><button  className='button-29' onClick={back} id='back'>back</button>
          <span className='error-style'>{successfulmessage}</span></>
          }
          {username == null && <><div>Please send otp to your mail id first. click below</div><button className='button-29' onClick={emailback} id='back'>back </button></>}
      </form>
      </div>
      </div>
)}
export default Reset;
