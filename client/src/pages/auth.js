import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Auth =()=>{
    return (
        <div className="auth">  {/* This is the parent div for the Login and Register components*/}
            <Login />
            <Register />
        </div>
    );
};

const Login =()=>{

    const [username , setUsername] =useState("");
    const [password , setPassword] =useState("");

    const [ ,setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login",{
                username,
                password
            });
            if(response.data.token){
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/"); //redirect to home page
            // alert("User logged in successfully!");
            }
            else{
                alert(response.data.message);
            }
        }
        catch(error){
            console.error(error);
            alert(error);
        }
    }

    return (
        <Form 
            heading="Login"
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            label="Login"
            onSubmit={onSubmit}
        />
    );
};  

const Register =()=>{

    const [username , setUsername] =useState("");
    const [password , setPassword] =useState("");

    const onSubmit= async (event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/auth/register",{
                username,
                password
            });
            alert("User registered successfully! Now login to continue.");
        }
        catch(error){
            console.error(error);
        }
    };

    return (
        <Form 
            heading="Register"
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            label="Register"
            onSubmit={onSubmit}
        />
    );
};  

const Form=({username, setUsername , password , setPassword , label ,heading, onSubmit})=>{
    return (
        <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>{heading} </h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input 
                type="text" 
                id="username"
                value={username} 
                onChange={(event)=> setUsername(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" 
                id="password" 
                value={password}
                onChange={(event)=> setPassword(event.target.value) } />
            </div>
            <button type="submit">{label}</button>
        </form>
    </div>
    );
}