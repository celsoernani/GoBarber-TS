import { hash } from 'bcryptjs';
import User from '@modules/users/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExisted = await this.usersRepository.findByEmail(email);

    if (checkUserExisted) {
      throw new AppError('Email address already used');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    delete user.password;
    return user;
  }
}

export default CreateUserService;
