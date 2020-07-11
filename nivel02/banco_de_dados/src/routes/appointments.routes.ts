import { Router, Response, Request } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).send({ error: err.message });
  }
});

export default appointmentsRouter;
