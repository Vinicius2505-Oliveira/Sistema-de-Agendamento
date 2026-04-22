const prisma = require('../lib');

async function listServices(req, res) {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar serviços.', error: error.message });
  }
}

async function createService(req, res) {
  try {
    const { title, description, duration } = req.body;

    if (!title || !description || !duration) {
      return res.status(400).json({ message: 'Título, descrição e duração são obrigatórios.' });
    }

    const service = await prisma.service.create({
      data: { title, description, duration: Number(duration) },
    });

    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar serviço.', error: error.message });
  }
}

module.exports = { listServices, createService };
