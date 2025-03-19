import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { InputControl } from '../inputControl/inputControl';
import { useState } from 'react';
export function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", pass: "" });
    const [error, setError] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const loguearse = () => {
        if (!values.email || !values.pass) {
            setError("datos incompletos")
            return;
        }
        setError("");
        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                navigate("/home");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setError(err.message);
            })
    }

    return (<div className={styles.container}>
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>
                Login
            </h1>
            <InputControl label="Email" onChange={(event)=> setValues((prev)=>({...prev, email: event.target.value}))} placeholder="ingrese su correo" />
            <InputControl label="contraseña" onChange={(event)=> setValues((prev)=>({...prev, pass: event.target.value}))} placeholder="ingrese su contraseña" />
            <div className={styles.footer}>
                <b className={styles.error}>
                    {error}
                </b>
                <button className={styles.button} onClick={loguearse} disabled={submitButtonDisabled}>
                    iniciar
                </button>
                <p> crear cuenta
                    <span>
                        <Link to="/signup"> Registrar </Link>
                    </span>
                </p>

            </div>


        </div>
    </div>)
}