import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useForm } from "react-hook-form";
import axios from "../api/axios";

function UpdateInfo() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const { register: updateInfo, handleSubmit } = useForm();

    const onSubmit = async(data) => {
        console.log(data);

        try {
            axios.put(`/api/user/${currentUser.usu_id}`, {
                email: data.email,
                nome: data.nome,
            })
            setCurrentUser({
                ...currentUser,
                usu_email: data.email,
                usu_nome: data.nome,
            })
            alert("Informações atualizadas com sucesso!")
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="profile-update-container">
            <h3>Conta</h3>
            <p>Essas são suas informações públicas.</p>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nome</label>
                    <input 
                        type="text"
                        defaultValue={currentUser?.usu_nome} 
                        {...updateInfo('nome', {required: true})}
                        />
                </div>

                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        defaultValue={currentUser?.usu_email} 
                        {...updateInfo('email', {required: true})}
                        />
                </div>

                <button formAction="submit">
                    Atualizar
                </button>
            </form>
        </div>
    );
}

export default UpdateInfo;
