import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  return response.status(200).json(appointmentRepository.all());
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));

  const appointmentInSameDate = appointmentRepository.findByDate(parsedDate);

  if (appointmentInSameDate) {
    return response.status(400).json({ message: 'Horário já reservado' });
  }

  const appointment = appointmentRepository.create({
    provider,
    date,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
