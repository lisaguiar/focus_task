import { db } from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const updateUserInfo = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!");

        const q = "UPDATE usu_usuarios SET usu_email = ?, usu_nome = ? WHERE usu_id = ?"
        
        const anoId = req.params.id;

        const values = [req.body.email, req.body.nome];

        db.query(q, [...values, user.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Usuário atualizado!")
        })

    })
}

export const updatePassword = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!");

        const q = "SELECT * FROM usu_usuarios WHERE usu_id = ?";
        const anoId = req.params.id;

        db.query(q, [anoId], (err, data) => {
            if (err) {
                return res.json(err)
            } 
        
            const senhaCorreta = bcrypt.compareSync(req.body.senha, data[0].usu_senha)

            if (!senhaCorreta) {
                return res.status(400).json("Senha incorreta!")
            } else {
                const qs = "UPDATE usu_usuarios SET usu_senha = ? WHERE usu_id = ?"
                
                var salt = bcrypt.genSaltSync(10)
                var hashSenha = bcrypt.hashSync(req.body.newSenha, salt)
        
                db.query(qs, [hashSenha, user.id], (err, data) => {
                    if (err) return res.status(500).json(err);
        
                    return res.status(200).json("Senha atualizada!")
                })
            }
        })
    })
}
