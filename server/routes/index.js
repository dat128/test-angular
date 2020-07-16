import accountRoute from './account'
import userRoute from './user'
import { authentication } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';

const apiRouter = function(app) {
    app.use('/api/user', userRoute);
    // app.use('/api/account', authentication, authorization, accountRoute);
    app.use('/api/account', authentication, accountRoute);
}

export default apiRouter;