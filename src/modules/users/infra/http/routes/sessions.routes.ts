import { Router } from 'express';
import CreateAuthenticateUserService from '@modules/users/services/CreateAuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new CreateAuthenticateUserService();
  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;

  return response.status(200).json({
    user,
    token,
  });
});

export default sessionsRouter;
