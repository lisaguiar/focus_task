import { db } from "../config/config.js";
import jwt from 'jsonwebtoken';

export const getNotes = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!")

        const q = "SELECT ano_id, ano_titulo FROM ano_anotacao WHERE usu_id = ?"

        db.query(q, [user.id], (err, data) => {
            if(err) return res.status(500).send(err);

            return res.status(200).json(data);
        })
    })
}

export const getNote = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!")
        
        const q = "SELECT * FROM ano_anotacao WHERE usu_id = ? AND ano_id = ?";
        
        db.query(q, [user.id, req.params.id], (err, data) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json(data[0])
        })
    })
}

export const createNote = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!");

        const q = "INSERT INTO ano_anotacao(ano_titulo, ano_dtCriacao, usu_id) VALUES (?)";

        const values = [
            req.body.titulo,
            req.body.data,
            user.id
        ];

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json(data.insertId)
        })
    })
}

export const deleteNote = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!");

        const q = "DELETE FROM ano_anotacao WHERE ano_id = ? AND usu_id = ?"
        const anoId = req.params.id;

        db.query(q, [anoId, user.id], (err, data) => {
            if(err) return res.status(500).json(err);

            return res.status(200).json("Anotação deletada!")
        })

    })
}

export const updateNote = (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("Usuário não autenticado!");

    jwt.verify(token, "jwtSecurity", (err, user) => {
        if(err) return res.status(403).json("Token inválido!");

        const q = "UPDATE ano_anotacao SET ano_titulo = ?, ano_conteudo = ? WHERE ano_id = ? AND usu_id = ?"
        const anoId = req.params.id;

        let titulo = req.body.titulo;

        if(!titulo || titulo === "") {
            titulo = "Sem Título";
        }

        const values = [titulo, req.body.conteudo];

        db.query(q, [...values, anoId, user.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Anotação atualizada!")
        })

    })
}
