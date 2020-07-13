import { Router, Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserService();
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).send({ error: err.message });
  }
});

export default sessionRouter;
