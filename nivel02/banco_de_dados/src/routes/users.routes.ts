import { Router, Response, Request } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/uploads';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).send({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;
      console.log('request.file :>> ', request.file);
      return response.json(user);
    } catch (err) {
      return response.status(400).send({ error: err.message });
    }
  },
);

export default usersRouter;
