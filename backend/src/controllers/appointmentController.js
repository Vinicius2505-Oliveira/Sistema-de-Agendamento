const prisma = require('../lib');

async function createAppointment(req, res) {
  try {
    const { serviceId, date, notes } = req.body;

    if (!serviceId || !date) {
      return res.status(400).json({ message: 'Serviço e data são obrigatórios.' });
    }

    const service = await prisma.service.findUnique({ where: { id: Number(serviceId) } });
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        notes,
        serviceId: Number(serviceId),
        userId: req.user.id,
      },
      include: {
        service: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar agendamento.', error: error.message });
  }
}

async function listMyAppointments(req, res) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.user.id },
      include: { service: true },
      orderBy: { date: 'asc' },
    });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar agendamentos.', error: error.message });
  }
}

async function listAllAppointments(req, res) {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { date: 'asc' },
    });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar todos os agendamentos.', error: error.message });
  }
}

async function updateAppointmentStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ['PENDING', 'APPROVED', 'CANCELED'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Status inválido.' });
    }

    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
      include: {
        service: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar status.', error: error.message });
  }
}

module.exports = {
  createAppointment,
  listMyAppointments,
  listAllAppointments,
  updateAppointmentStatus,
};
