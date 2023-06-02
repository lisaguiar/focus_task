import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authContext';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';

function UpdatePassword() {

  const { currentUser } = useContext(AuthContext);

    const { register: updateSenha, handleSubmit } = useForm();

    const onSubmit = async(data) => {
        console.log(data);

        try {
            await axios.put(`/api/user/password/${currentUser.usu_id}`, {
              senha: data.senha,
              newSenha: data.newSenha,
            })
            alert("Senha atualizada com sucesso!")
        } catch (err) {
            alert(err.response.data);
        }

    }

  return (
    <div className="profile-update-container">
      <h3>Senha</h3>
      <p>Atualize sua senha.</p>
      <hr></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Senha atual</label>
                    <input 
                        type="password"
                        {...updateSenha('senha', {required: true})}
                        />
                </div>

                <div>
                    <label>Nova senha</label>
                    <input 
                        type="password"
                        {...updateSenha('newSenha', {required: true})}
                        />
                </div>

                <button formAction="submit">
                    Atualizar
                </button>
            </form>
    </div>
  )
}

export default UpdatePassword