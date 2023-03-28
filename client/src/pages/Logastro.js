import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import '../styles/Logastro.css'
import '../components/jorge.png'

const Logastro = () => {
const {register, formState: {errors, isValid}, handleSubmit} = useForm({
    mode: "all"
})

    const [inputs, setInputs] = useState({
        nome:"",
        email:"",
        senha:""
    })
    const [Err, setErr] = useState(null)

    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))    
        console.log(inputs)
    }

    const handleSubmitData = async (data) => {
        console.log(data)
        try {   
            const res = await axios.post("http://localhost:8000/api/register", inputs)
            console.log(res)
            window.location.reload()
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
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <h1>Registre-se.</h1>
                    <input
                        type="text"
                        placeholder="Nome"
                        className={errors?.nome && 'input-error'}
                        {...register('nome', {required: true, minLength: 4})}
                        onChange={handleChange}
                    />
                    {errors?.nome?.type === 'required' && <p className="form_error_message">Insira um nome de usuário!</p>}
                    {errors?.nome?.type === 'minLength' && <p className="form_error_message">Seu nome de usuário precisa conter mais de 3 caracteres</p>}
                    <input
                        type="text"
                        placeholder="Email"
                        className={errors?.email && 'input-error'}
                        {...register('email', {required: true, validate: (value) => validator.isEmail(value)})}
                        onChange={handleChange}
                    />
                    {errors?.email?.type === 'required' && <p className="form_error_message">Insira seu e-mail!</p>}
                    {errors?.email?.type === 'validate' && <p className="form_error_message">Insira um e-mail válido!</p>}
                    <input
                        type="password"
                        placeholder="Senha"
                        className={errors?.senha && 'input-error'}
                        {...register('senha', {required: true, minLength: 6})}
                        onChange={handleChange}
                    />
                    {errors?.senha?.type === 'required' && <p className="form_error_message">Insira sua senha!</p>}
                    {errors?.senha?.type === 'minLength' && <p className="form_error_message">Sua senha precisa conter ao menos 6 caracteres</p>}
                
                    <button disabled={!isValid} type="submit">Registrar</button>
                </form>
            </div>

            <div className="form-container login-container">
                <form action="/home">
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label>lembre-me</label>
                        </div>
                        <div className="pass-link">
                            <a href="./">Esqueci a senha</a>
                        </div>
                    </div>
                    <button>Login</button>
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