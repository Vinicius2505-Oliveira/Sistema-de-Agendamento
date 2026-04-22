const express = require('express');
const { listServices, createService } = require('../controllers/serviceController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Lista os serviços disponíveis
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/', listServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cadastra um novo serviço (admin)
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 */
router.post('/', authMiddleware, adminOnly, createService);

module.exports = router;
