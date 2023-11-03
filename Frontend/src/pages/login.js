import react, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios';
function Login(){
    localStorage.removeItem('user');
    const [username, SetUsername ]=useState("");
    const [password, SetPassword] = useState("");
    const [usernameerror, SetUsernameerror]= useState("");
    const [passworderror, setPassworderror]= useState("");
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('')
    
// Email and phone number Validation
const onSubmit=()=>{
    var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    if (username == "") {
        setEmailError( "  Please enter your Email or Phone Number  ");
        return
    }
    else if (!mailFormat.test(username)) {
        setEmailError( "EmailAddress/PhoneNumber is not valid.");
        return ;
    
    }
    else if(password.length == 0){
        setPassworderror("password should not be empty")
        return
    }
    else{
        setEmailError("")
    }
}

    {/*this is for login button*/}
   const handlesubmit= async (e)=>{
        e.preventDefault();
        
        onSubmit();

        
            const data = new FormData();
            data.append("username",username)
            data.append("password",password)
            const config = {
              method: "post",
              url: "http://127.0.0.1:5000/login",
              data: data,
            };
            const response = await axios.request(config);
            console.log(response.data.message)
            if(response.data.message ==="login failed"){
                console.log("login failed")
                SetUsernameerror('userId or password is invalid');
                return
            }
                else if (response.data.access_token) {
                console.log(response.data.access_token)
                localStorage.setItem('user', JSON.stringify(response.data.access_token));
                console.log(localStorage.getItem('user'));
                navigate('/home');
            }  
                
            
          
       };
    {/*this is for forget password */}
    const forgetpass=(e)=>{
        console.log("hello");
        navigate("forgetpass");
    }
    {/*this is for reset button*/}
    const handlereset=()=>{
        SetUsername("");
        SetPassword("");
    }
    const notregister =()=>{
        navigate("/signup");
    }
    const onChangeHandlerusername=(e)=>{
        setEmailError("") 
        SetUsernameerror("")
        SetUsername(e.target.value)
    }
    const onChangeHandlerpassword =(e)=>{
        setPassworderror("")
        SetPassword(e.target.value)
    } 
    return(
            <div className='total-login1'>
                <div className='login-form1'>
                    <form className='form-op1'  method='post'>
                        <label className='label'>Mobile No./Email:<br/>
                        <input type="text" className='inputs1' value={username} onChange={onChangeHandlerusername} placeholder='Enter Username or Number' /></label><br />
                        <span className='error-style'>{emailError}</span><br/>
                        <label className='label'>Password:<br/>
                        <input type="Password" className='inputs1' value={password} onChange={ onChangeHandlerpassword} placeholder='Enter Password' /></label><br />
                        <span className='error-style'>{passworderror}</span><br/>
                        <span id='forget-password1' onClick={forgetpass}>Forget password..?</span><br />
                        <span className='error-style'>{usernameerror}</span><br/>
                        <button onClick={handlesubmit} className='button-29' id='login-submit'>Login</button><input type='reset' className='button-29' id='reset-button' onClick={handlereset} value='reset' /><br/>

                        <span className='label' id='not-reg' >Not Registered.?<button id='signup-button' className='button-29' onClick={notregister}>Signup</button></span>
                    </form>
                </div>
            </div>            
             )
}
export default Login;