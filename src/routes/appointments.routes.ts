import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  return response.status(200).json(appointmentRepository.all());
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const paserdDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );
    const appointment = createAppointment.execute({
      date: paserdDate,
      provider,
    });

    return response.status(200).json(appointment);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

export default appointmentsRouter;
