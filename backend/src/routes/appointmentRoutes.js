const express = require('express');
const {
  createAppointment,
  listMyAppointments,
  listAllAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 */
router.post('/', authMiddleware, createAppointment);

/**
 * @swagger
 * /appointments/me:
 *   get:
 *     summary: Lista os agendamentos do usuário autenticado
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos do usuário
 */
router.get('/me', authMiddleware, listMyAppointments);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Lista todos os agendamentos (admin)
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de agendamentos
 */
router.get('/', authMiddleware, adminOnly, listAllAppointments);

/**
 * @swagger
 * /appointments/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um agendamento (admin)
 *     tags: [Agendamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.patch('/:id/status', authMiddleware, adminOnly, updateAppointmentStatus);

module.exports = router;
