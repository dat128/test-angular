import express from 'express';
import { getAccountsController, createAccountController, updateAccountController, deleteAccountController } from '../controller/account.controller';
import { authorization } from '../middleware/authorization'

const router = new express.Router();

router.get('/', authorization(['admin', 'normal']), getAccountsController)
router.post('/', authorization(['admin']), createAccountController)
router.put('/:id', authorization(['admin']), updateAccountController)
router.delete('/:id', authorization(['admin']), deleteAccountController)
// router.get('/', getAccountsController)
// router.post('/', createAccountController)
// router.put('/:id', updateAccountController)
// router.delete('/:id', deleteAccountController)
export default router;