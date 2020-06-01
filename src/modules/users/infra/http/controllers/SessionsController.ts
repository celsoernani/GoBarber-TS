import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAuthenticateUserService from '@modules/users/services/CreateAuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(CreateAuthenticateUserService);
    const { user, token } = await authenticateUser.execute({ email, password });
    delete user.password;

    return response.status(200).json({
      user,
      token,
    });
  }
}
