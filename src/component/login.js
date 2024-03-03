// import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import"../css/login.css";
import React, { useState } from "react";
import Footer from "./footer";
import loginimg from "../component/image/login.jpg";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

const Login = () =>{
   

    const[email,setEmail]= useState('');
  
    const[password,setPassword]=useState('');
    const navigate = useNavigate();
    


    const login = async(e) =>{
        e.preventDefault();    
         if(email === '' || !email) {
          alert('Email is missing');
          return;
        }
        else if(password === '' || !password)
        {
          alert('Any of the password field cannot be empty');
          return;
        }
    
      
    
        if(password){
          
            let loginData = {   
            "userEmail" : email,
            "password" : password,
            }

            await axios.post(`http://localhost:4500/login/userLogin`,loginData).then(async response=>{
                console.log(response,'response');
                if(response.status === 200 && response.data.message === 'Login Successfull!!'){
                    alert(response.data.message);
                    await axios.get(`http://localhost:4500/users/getUserbyEmail?email=${email}`).then(async (userData)=>{
                        console.log(userData.data[0],'userData');
                        if(userData.data.length > 0){
                            localStorage.setItem("userInfo",JSON.stringify(userData.data[0]))
                            navigate('/',{replace:true});
                            window.location.reload();
                        }
                        else{
                            alert(response.data.message);
                            navigate('/',{replace:true});
                            window.location.reload();
                        }
                    })
                }
                else{
                    alert(response.data.message);
                    navigate('/login',{replace:true});
                    window.location.reload();
                }
            }).catch(err=>{
                alert(err);
                navigate('/login',{replace:true});
                window.location.reload();
            })
        }

        
    }


    return(
        <>
       

     <div className="login-container">
        <div className="login-form-container">
      
          <div className="login-image">
            <img src={loginimg} alt="Login Image" />
          </div>

         
          <div className="login-form">
            <h3>Login</h3>
            <hr />
            <form autoComplete='off' className='form-group' onSubmit={login}>
              <label htmlFor='Email'>Email</label>
              <input type='email' className='form-control' required onChange={(e) => { setEmail(e.target.value) }} />

              <label htmlFor='Password'>Password</label>
              <input type='password' className='form-control' required onChange={(e) => { setPassword(e.target.value) }} />

                 <br />
              <button type='submit' className='btn btn-primary btn-md mybtn'>LOGIN</button>
            </form>
            <div className="text-center note">
              Don't have an account? <Link to='/signUp' className="link">Sign Up</Link>
            </div>
          </div>
        </div>
      </div> 
        <br />
        <Footer/>
        </>
    )
}

export default Login;


