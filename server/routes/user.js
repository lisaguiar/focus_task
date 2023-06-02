import express from "express";
import { updatePassword, updateUserInfo } from "../controllers/user.js";

const router = express.Router();

router.put('/:id', updateUserInfo);
router.put('/password/:id', updatePassword);

export default router