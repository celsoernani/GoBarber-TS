import { getRepository } from 'typeorm';
import User from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExisted = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUserExisted) {
      throw new Error('Email address already used');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);
    delete user.password;
    return user;
  }
}

export default CreateUserService;
