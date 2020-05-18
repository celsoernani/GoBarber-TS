import { Router } from 'express';
import { hash } from 'bcryptjs';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const passwordHash = await hash(password, 8);
    const user = await createUser.execute({
      name,
      email,
      password: passwordHash,
    });
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

export default usersRouter;
