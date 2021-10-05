import React, { useState } from 'react'
import './Modal.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { auth } from './firebase';



function Modal({ showModal, setShowModal }) {
    const history = useHistory();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(auth => {

        })
            .catch(error => alert(error.message))
    };

    const register = e => {
        const isValid = formValidation();
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            e.preventDefault();
            if (auth) {
                history.push('/');
            }

        }).catch(isValid)

    };

    const formValidation = () => {
        const emailErr = {};
        const passwordErr = {};
        let isValid = true;

        if (!email) {
            emailErr.emailNotEntered = "Email is required"
            isValid = false;
        } else if (!/\S+@\S+/.test(email)) {
            emailErr.emailNotValid = "Email is invalid"
            isValid = false;
        }

        if (!password) {
            passwordErr.passwordNotEntered = " Password is required"
            isValid = false;
        } else if (password.length < 5) {
            passwordErr.passwordLength = "Password must be more than 5 characters"
            isValid = false;
        }

        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        return isValid;
    }

    return (
        <>
            {showModal ? (
                <div className='modal' >
                    <div className='modal__Container'>
                        <div className='modal__Content'>
                            <div className="modal__closeButtonIcon">
                                <CloseIcon onClick={() => setShowModal(prev => !prev)} style={{ color: 'red' }} />
                            </div>
                            <form>

                                <h1>Hello Guest, Sign Up here</h1>
                                <p>Get started here, for new locations</p>

                                <div className="form__Validation">

                                    <input type="text" value={email} placeholder='enter your email' onChange={e => setEmail(e.target.value)} />

                                    {Object.keys(emailErr).map((key) => {
                                        return <p style={{ color: "red" }}>{emailErr[key]}</p>
                                    })}

                                    <input type="password" value={password} placeholder='enter your password' onChange={e => setPassword(e.target.value)} />

                                    {Object.keys(passwordErr).map((key) => {
                                        return <p style={{ color: "red" }}>{passwordErr[key]}</p>
                                    })}

                                    <input type="password" value={password} placeholder='confirm your password' onChange={e => setPassword(e.target.value)} />

                                    <Button onClick={register} variant='outlined'>Register</Button>
                                </div>
                                <span>Already have an account ? Login <a href="#">here</a> </span>

                            </form>
                        </div>
                    </div>
                </div>

            ) : null}
        </>
    )
}

export default Modal
