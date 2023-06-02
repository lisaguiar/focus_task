import React, { useState } from "react";
import "../images/jorge.png";
import UpdateInfo from "../components/UpdateInfo";
import UpdatePassword from "../components/UpdatePassword";
import '../styles/Perfil.css'

const Perfil = () => {

    const [form, setForm] = useState("Conta");

    return (
        <div className="profile-container">
            <div className="profile-heading">
                <h1>Perfil</h1>
                <p>
                    Gerencie as configurações de sua conta e altere sua senha
                </p>

                <hr></hr>
            </div>
            <div className="profile-settings">
                <aside>
                    <button
                        className={form === "Conta" ? "active" : ""}
                        onClick={() => {
                            setForm("Conta");
                        }}
                    >
                        Conta
                    </button>
                    <button
                        className={form === "Senha" ? "active" : ""}
                        onClick={() => {
                            setForm("Senha");
                        }}
                    >
                        Senha
                    </button>
                </aside>
                {form === "Conta" ? <UpdateInfo /> : form === "Senha" ? <UpdatePassword /> : <></>}
            </div>
        </div>
    );
};

export default Perfil;
