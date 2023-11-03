 import { useState,useEffect } from "react";
 import { useNavigate } from "react-router-dom";
import './signup.css';
import states,{India_state} from "./states";
import axios from 'axios'
function Signup() {
  const navigate = useNavigate();
  const [mobnum, setMobnum] = useState("");
  const[userid,setUserid]=useState("");
  const[message,setMessage]=useState("");
 
    const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
       //mobnum: '',
    gender:'',
    marital:'',
    occupation: '',
    age: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
      })
     
  const [formError, setFormError] = useState({})
  const onChangeHandler = (event) => {
        if (event.target.name === 'languages') {
      let copy = { ...formData }
      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }
      setFormData(copy)
    } else {
      setFormData(() => ({ 
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }
  const validateForm = () => {
    let err = {}
    if (formData.firstname === '') {
      err.firstname = 'FirstName required!'
      
    }
    if (formData.lastname === '') {
        err.lastname = 'Lastname required!'

      }
    if (formData.email === '') {
      err.email = 'Email required!'
  
    } else {
      let mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!mail.test(formData.email)) {
        err.email = 'Email not valid!' 
      }
    }
    if (formData.password === '' || formData.cpassword === '') {
      err.password = 'Password and Confirm Password required!'
      
    } else {
      if (formData.password !== formData.cpassword) {
        err.password = 'Password not matched!'
        
      } else {
        if (formData.password.length < 8) {
          err.password = 'Password should greater than 8 characters!'
          
        }
        let countUpperCase = 0
    let countLowerCase = 0
    let countDigit = 0
    let countSpecialCharacters = 0

    for (let i = 0; i < formData.password.length; i++) {
      const specialChars = ['!','@','#','$','%','^','&','*','(',')','_','-','+','=','[','{',']','}',':',';','<','>',]
      if (specialChars.includes(formData.password[i])) {
        countSpecialCharacters++
      } else if (!isNaN(formData.password[i] * 1)) {
        countDigit++
      } else {
        if (formData.password[i] === formData.password[i].toUpperCase()) {
          countUpperCase++
        }
        if (formData.password[i] === formData.password[i].toLowerCase()) {
          countLowerCase++
        }
      }
    }

    if (countLowerCase === 0) {
      err.password ='Invalid Form, 0 lower case characters in password'
      
    }

    if (countUpperCase === 0) {
      err.password ='Invalid Form, 0 upper case characters in password'
      
    }

    if (countDigit === 0) {
      err.password ='Invalid Form, 0 digit characters in password'
      
    }

    if (countSpecialCharacters === 0) {
      err.password ='Invalid Form, 0 special characters in password'
      
    }
      }
    }
    if(mobnum===''){
      err.mobnum="Mobile number should not be empty"
      
    }
      if (mobnum.length < 10) {
        err.mobnum = 'Mobile number should have 10 digits'
        
      }
      if (formData.gender === '') {
        err.gender = 'Gender required!'
        
      }
      
      if (formData.marital === '') {
        err.marital = 'Marital Status required!'
        
      }
         if (formData.occupation === '') {
      err.occupation = 'Occupation required!'
      
    }
    if (formData.age.length === ''||formData.age<13||formData.age>120) {
        err.age = 'Age required!'
        
      }
      if (formData.country === '') {
        err.country = 'Country required!'
        
      }
    if (formData.state === '') {
        err.state = 'State required!'
        
      }
      if (formData.city === '') {
        err.city = 'City required!'
        
      }
      if (formData.zipcode === '') {
        err.zipcode = 'Zipcode required!'
        
      }
      if(formData.zipcode.length<6||formData.zipcode.length>6){
        err.zipcode="zipcode should be 6 number"
      }
    setFormError({ ...err })
    
    return Object.keys(err).length < 1;
  }
     const onSubmitHandler = async(event) => {
    event.preventDefault()
    console.log(validateForm())
    
   // console.log("Form Data:", formData)
   
     validateForm()
     if(validateForm()=== false){
      return
     }else{
   const data=new FormData()
   data.append('firstname',formData.firstname);
   data.append('lastname',formData.lastname);
  //  data.append('password',formData.password);
   data.append('cpassword',formData.cpassword);
   data.append('email',formData.email);
   data.append('username',userid);
   data.append('mobnum',mobnum);
   data.append('gender',formData.gender);
   data.append('marital',formData.marital);
   data.append('occupation',formData.occupation);
   data.append('age',formData.age);
   data.append('country',formData.country);
   data.append('state',formData.state);
   data.append('city',formData.city);
   data.append('zipcode',formData.zipcode);
   const config = {
    method: "post",
    url: "http://127.0.0.1:5000/create",
    data: data,
  };
  try{
    const response = await axios.request(config);
    console.log(response.data.message)
    if(response.data.message==="signed in")
    setMessage("Signup Successful. redirecting to login page...")
    setTimeout(() => { 
      navigate("/"); 
  }, 5000);
    
  }
  catch (error){ 
      console.log(error);
  }
}
    }
  const loginpage=()=>{
    navigate("/")
  }

  
  return (
    <div className="total-login">
      <div  className='login-form'>
      <form className="signup-form" method='POST'>
       
        <div className="form-group">
          <input id='firstname' className="form-control" name="firstname" type='text' placeholder='Firstname*' onChange={onChangeHandler} value={formData.firstname} />
          <input id='lastname' className="form-control" name="lastname"   type='text' placeholder='Lastname*' onChange={onChangeHandler} value={formData.lastname} />
          <span  id='firstname' className='non-valid'>{formError.firstname}</span>
          <span id='lastname-error' className='non-valid'>{formError.lastname}</span>
          
        </div>
        <br/>
        <div className="form-group">
          <input className="form-control" name="email"  type='email' placeholder='E-mail*' onChange={onChangeHandler} value={formData.email} />
          <br/>
          <span className='non-valid'>{formError.email}</span>
        </div>
        <br/>
        <div className="form-group">
          <input className="form-control" name="mobilenumber" type='number' maxLength='6' placeholder='Mobile Number*' onChange={(e)=>setMobnum(e.target.value)} value={mobnum} />
         <br/>
          <span className='non-valid'>{formError.mobnum}</span>
        </div>
        <br/>
        <p>Select UserId: </p>
        <div className="form-group">
          <input type="radio" name="userid" onChange={(e)=>setUserid( e.target.value)} value={formData.email} checked={userid == formData.email} />E-mail  <br/>
          <input type="radio" name="userid" onChange={(e)=>setUserid( e.target.value)} value={mobnum} checked={userid == mobnum} />Mobile Number
        </div>
        <br/>
        <div className="form-group">
          <input className="form-control" name="password"  type='password' placeholder='Password*' onChange={onChangeHandler} value={formData.password} />
          <br/>
          <span className='non-valid'>{formError.password}</span>
        </div>
        <br/>
        <div className="form-group">
          <input className="form-control" name="cpassword"  type='password' placeholder='Confirm Password*' onChange={onChangeHandler} value={formData.cpassword} />
        </div>
        <br/>
       
        <div className="form-group">
                   <select className="form-select" name="gender"  type='text' onChange={onChangeHandler} value={formData.gender}>
            <option value="">-Select Gender-</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Others</option>
          </select>
          <span className='non-valid'>{formError.gender}</span>
        </div>
        <br/>
        <div className="form-group">
          <select className="form-select" name="marital"  type='text' placeholder='Marital Status*' onChange={onChangeHandler} value={formData.marital}>
            <option value="">-Select Marital Status-</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
          <span className='non-valid'>{formError.marital}</span>
        </div>
        <br/>
        <div className="form-group">
        <input className="form-control" name="occupation" type='text' placeholder='Occupation*' onChange={onChangeHandler} value={formData.occupation} />
          <span className='non-valid'>{formError.occupation}</span>
        </div>
        <br/>
        <div className="form-group">
        <input className="form-control" name="age" type='number' max='120' min='13' placeholder='Age*' onChange={onChangeHandler} value={formData.age} />
        <br/>
          <span className='non-valid'>{formError.age}</span>
        </div>
        <br/>
        <div className="form-group">
          <select className="form-select" name="country"  type='text' placeholder='Country*' onChange={onChangeHandler} value={formData.country}>
            <option value="">-Select Country-</option>
            <option value="India">India</option>
            <option value="United states">United States</option>
           
          </select>
          
          <span className='non-valid'>{formError.country}</span>
        </div>
        
        <br/>
            <div className="form-group">
            <select className="form-select" name="state"  type='text' placeholder='State*' onChange={onChangeHandler} value={formData.state}>
            <option value="">-Select State-</option>
            {formData.country=='United states' &&<>{states()}</> }
            {formData.country=='India' && <>{India_state()}</> }
            </select>
              
            <span className='non-valid'>{formError.state}</span>
          </div> 
 
        <br/>
         <div className="form-group"> 
          <input className="form-control" name="city" type='text' placeholder='City*' onChange={onChangeHandler} value={formData.city} />
          <br/>
          <span className='non-valid'>{formError.city}</span>
         </div>   
         <br/>
        <div className="form-group">
          <input className="form-control" name="zipcode" type='number'  placeholder='Zip-Code/pincode*' onChange={onChangeHandler} value={formData.zipcode} />
          <span className='non-valid'>{formError.zipcode}</span>
        </div>
        <br/>
          <div className="form-group">
          <button className="button-29"  onClick={onSubmitHandler} >Signup</button>
        </div>
        <br/>
        <span>{message}</span><br/>
        <span className="already-have-a-account" >Already have a account..?</span><button className="button-29" onClick={loginpage}>login</button>
        
        {/*<div>
          {username?formData.email:formData.mobilenumber}
          <button >email</button>
          <button>Mobile Number</button>
  </div>*/}
  </form>
  </div>
    </div>
  );
  };
export default Signup;