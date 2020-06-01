import { Router } from 'express';
import CreateAuthenticateUserService from '@modules/users/services/CreateAuthenticateUserService';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

const userRepository = new UsersRepository();
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new CreateAuthenticateUserService(userRepository);
  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;

  return response.status(200).json({
    user,
    token,
  });
});

export default sessionsRouter;
