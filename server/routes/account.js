import express from 'express';
import { getAccountsController } from '../controller/account.controller';

const router = new express.Router();

router.get('/', getAccountsController)

export default router;