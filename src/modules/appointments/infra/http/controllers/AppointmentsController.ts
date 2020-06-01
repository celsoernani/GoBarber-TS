import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const paserdDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: paserdDate,
      provider_id,
    });

    return response.status(200).json(appointment);
  }
}
