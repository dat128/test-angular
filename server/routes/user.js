import express from 'express';
import { loginController } from '../controller/user.controller';

const router = new express.Router();

router.post('/login', loginController)

export default router;