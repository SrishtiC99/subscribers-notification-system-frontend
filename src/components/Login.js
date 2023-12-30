import { useState } from "react";
import { getAllSubscribers, getAllTemplates, getBillingAccount, login, signUp } from "../api/axiosConfig";
import { useDispatch } from "react-redux";
import { fetchAllSubscribers, fetchBillingAccount, fetchTemplates, loginSuccess } from "../actions/actions";
import '../css/Login.css';

export default function Login() {
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    }

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }

    const handleLogin = (event) => {
        //Calling auth-service authenticate API
        event.preventDefault();
        const authRequest = { email, password };

        login(authRequest)
            .then((response) => {
                const jwtToken = response.data.jwt;
                dispatch(loginSuccess(jwtToken));

                // Fetch subscribers and templates just after login,
                // so that we won't have to fetch it again and again from the backend
                
                getAllTemplates(jwtToken)
                    .then((response) => {
                        console.log("Templates: " + JSON.stringify(response.data));
                        dispatch(fetchTemplates(response.data));
                    })
                    .catch((error) => {
                        console.error("Error: " + JSON.stringify(error.response));
                    });
                
                getAllSubscribers(jwtToken)
                    .then((response) => {
                        console.log("Subscribers: " + JSON.stringify(response.data));
                        dispatch(fetchAllSubscribers(response.data));
                    })
                    .catch((error) => {
                        console.error("Error: " + JSON.stringify(error.response));
                    });
                
                getBillingAccount(jwtToken)
                    .then((response) => {
                        console.log("Billing: " + JSON.stringify(response.data));
                        dispatch(fetchBillingAccount(response.data.isExpired,
                            response.data.accountType, response.data.lastBillingDate));
                    })
                    .catch((error) => {
                        console.error("Error: " + JSON.stringify(error.response));
                    });
            })
            .catch((error) => {
                console.error("Login Failed: " + JSON.stringify(error.response.data));
            });
    }

    const handleSignUp = (event) => {
        //Call auth-service register API
        event.preventDefault();
        const authRequest = { email, password };

        signUp(authRequest)
            .then((response) => {
                console.log("Signup Success: " + JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error("Signup Failed: " + JSON.stringify(error.response.data));
            });
    }

    return (
        <div className="login-page">
            <h1>Welcome To Notifications</h1>
            <h3>Sign up and add your subscribers list to your template to notify them anytime</h3>
            <form>
                <label>
                    Email:
                    <input type="email" placeholder= "Email" value={ email } name="email" onChange={handleEmailChange}></input>
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" placeholder="Password" value={password} name="password" onChange={handlePasswordChange}></input>
                </label>
                <br/>
                <button type="submit" onClick={handleLogin}>Log In</button>
                <br />
                <p>Do not have an acoount? &nbsp; <button type="submit" onClick={handleSignUp}>Sign Up</button></p>
            </form>
        </div>
    );
}