import accountRoute from './account'
import userRoute from './user'

const apiRouter = function(app) {
    app.use('/api/user', userRoute);
    app.use('/api/account', accountRoute);
}

export default apiRouter;