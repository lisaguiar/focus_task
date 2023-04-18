import React, { useContext, useEffect, useState } from 'react'
import axios from '../api/axios'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import '../styles/Logastro.css'
import '../images/jorge.png'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../contexts/authContext'

const Logastro = () => {
    const { currentUser, login } = useContext(AuthContext)

    const navigate = useNavigate()

    const {register, formState: {errors, isValid}, handleSubmit} = useForm({
        mode: "all"
    })
    const {register:registerLogin, formState: {errors:errorsLogin, isValid:isValidLogin}, handleSubmit:handleSubmitL} = useForm({
        mode: "all"
    })

    const [inputsRegister, setInputsRegister] = useState({
        nome: "",
        email: "",
        senha: ""
    })

    const [inputsLogin, setInputsLogin] = useState({
        emaillogin: "",
        senhalogin: ""
    })

    const [Err, setErr] = useState(null)

    const handleChangeRegister = e => {
        setInputsRegister(prev => ({...prev, [e.target.name]: e.target.value}))  
        console.log('register: ', inputsRegister)
    }

    const handleChangeLogin = e => {
        setInputsLogin(prev => ({...prev, [e.target.name]: e.target.value}))  
        console.log('login: ', inputsLogin)
    }

    const handleSubmitRegister = async (data) => {
        try {   
            const res = await axios.post("/api/register", inputsRegister)
            console.log(res)
            window.location.reload()
        } catch (err) {
            setErr(err.response.data)
            console.log(Err)
        }
    }

    const handleSubmitLogin = async (data) => {
        try {   
            const res = await login(inputsLogin)
            console.log(res)
            navigate('/home')
        } catch (err) {
            setErr(err.response.data)
            console.log(err)
        }
    }

    useEffect(() => {
        const registerButton = document.getElementById("register")
        const loginButton = document.getElementById("login")
        const container = document.getElementById("container")

        registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active")
        })

        loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active")
        })
    })

    return (
        <div className="container" id="container">
            <div className="form-container register-container">
                <form onSubmit={handleSubmit(handleSubmitRegister)}>
                    <h1>Registre-se.</h1>
                    <input
                        type="text"
                        placeholder="Nome"
                        className={errors?.nome && 'input-error'}
                        {...register('nome', {required: true, minLength: 4})}
                        onChange={handleChangeRegister}
                    />
                    {errors?.nome?.type === 'required' && <p className="form_error_message">Insira um nome de usuário!</p>}
                    {errors?.nome?.type === 'minLength' && <p className="form_error_message">Seu nome de usuário precisa conter mais de 3 caracteres</p>}
                    <input
                        type="text"
                        placeholder="Email"
                        className={errors?.email && 'input-error'}
                        {...register('email', {required: true, validate: (value) => validator.isEmail(value)})}
                        onChange={handleChangeRegister}
                    />
                    {errors?.email?.type === 'required' && <p className="form_error_message">Insira seu e-mail!</p>}
                    {errors?.email?.type === 'validate' && <p className="form_error_message">Insira um e-mail válido!</p>}
                    <input
                        type="password"
                        placeholder="Senha"
                        className={errors?.senha && 'input-error'}
                        {...register('senha', {required: true, minLength: 6})}
                        onChange={handleChangeRegister}
                    />
                    {errors?.senha?.type === 'required' && <p className="form_error_message">Insira sua senha!</p>}
                    {errors?.senha?.type === 'minLength' && <p className="form_error_message">Sua senha precisa conter ao menos 6 caracteres</p>}
                
                    <button disabled={!isValid} type="submit">Registrar</button>
                </form>
            </div>

            <div className="form-container login-container">
                <form onSubmit={handleSubmitL(handleSubmitLogin)}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        className={errorsLogin?.emaillogin && 'input-error'}
                        {...registerLogin('emaillogin', {required: true, validate: (value) => validator.isEmail(value)})}
                        onChange={handleChangeLogin}
                    />
                    {errorsLogin?.emaillogin?.type === 'required' && <p className="form_error_message">Insira seu e-mail!</p>}
                    {errorsLogin?.emaillogin?.type === 'validate' && <p className="form_error_message">Insira um e-mail válido!</p>}
                    <input
                        type="password"
                        placeholder="Senha"
                        className={errorsLogin?.senhalogin && 'input-error'}
                        {...registerLogin('senhalogin', {required: true, minLength: 6})}
                        onChange={handleChangeLogin}
                    />
                    {errorsLogin?.senhalogin?.type === 'required' && <p className="form_error_message">Insira sua senha!</p>}
                    <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label>lembre-me</label>
                        </div>
                        <div className="pass-link">
                            <a href="./">Esqueci a senha</a>
                        </div>
                    </div>
                    <button disabled={!isValidLogin} type="submit">Login</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <img className="jorge" src="./image/jorge.png" alt="" />
                    <p>Se você tem uma conta, faça o login aqui.</p>
                    <button className="ghost" id="login">
                        Login
                       {/*  <LniArrowLeft className="login" /> */}
                    </button>
                </div>
                <div className="overlay-panel overlay-right">
                    <img className="jorge" src="./image/jorge.png" alt="" />
                    <p>Comece sua jornada <br /> em FocusTask</p>
                    <button className="ghost" id="register" type='button'>
                        Registrar
                        {/* <LniArrowRight className="register" /> */}
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Logastro