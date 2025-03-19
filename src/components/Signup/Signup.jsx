import styles from './signup.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { async } from '@firebase/util';
import { InputControl } from '../inputControl/inputControl';
export function Signup() {
    const navigate = useNavigate();
    const [values, setvalues] = useState({ name: "", email: "", pass: "" });
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const registro = () => {
        if (!values.name || !values.email || !values.pass) {
            setError(["Por favor, complete todos los campos"]);
            return;
        }
        setError("")
        setSubmitButtonDisabled(true)
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false)
                const user = res.user;
                await updateProfile(user, { displayName: values.name });
                navigate("/home")
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setError(err.message)
            });
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Registro</h1>
                <InputControl label="Nombre" placeholder="ingrese un nombre"
                    onChange={
                        (event) => setvalues((prev) => ({ ...prev, name: event.target.value }))
                    } />
                <InputControl label="email" placeholder="ingrese un email"
                    onChange={
                        (event) => setvalues((prev) => ({ ...prev, email: event.target.value }))
                    } />
                <InputControl label="contraseña" placeholder="ingrese un contraseña"
                    onChange={
                        (event) => setvalues((prev) => ({ ...prev, pass: event.target.value }))
                    } />
                    <div className={styles.footer}>
                        <b className={styles.error}>{error}</b>
                        <button className={styles.button} onClick={registro} disabled={submitButtonDisabled}>Guardar</button>
                        <p>
                            Si ya tienes una cuenta <span>
                                <Link to="/">Inicia sesión</Link>
                            </span>
                        </p>
                    </div>
            </div>
        </div>
    )
}