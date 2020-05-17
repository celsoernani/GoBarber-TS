import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw Error('Horário já reservado');
    }

    const appointment = appointmentRepository.create({
      provider,
      date,
    });
    await appointmentRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
