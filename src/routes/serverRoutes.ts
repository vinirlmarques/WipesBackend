import { Router } from "express";
import { ServerController } from "../controllers/server.controller";

const router = Router();
const serverController = new ServerController();

/**
 * @swagger
 * tags:
 *   name: Servers
 *   description: Rust Servers Management
 */

/**
 * @swagger
 * /api/servers:
 *   post:
 *     summary: Add a new server
 *     tags: [Servers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serverName
 *               - region
 *               - wipeDate
 *               - battlemetricsUrl
 *               - description
 *               - imageUrl
 *             properties:
 *               serverName:
 *                 type: string
 *               region:
 *                 type: string
 *               wipeDate:
 *                 type: string
 *                 format: date-time
 *               battlemetricsUrl:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Server created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 serverName:
 *                   type: string
 *                 region:
 *                   type: string
 *                 wipeDate:
 *                   type: string
 *                   format: date-time
 *                 battlemetricsUrl:
 *                   type: string
 *                 description:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post("/", (req, res) => serverController.createServer(req, res));

/**
 * @swagger
 * /api/servers:
 *   get:
 *     summary: Get all servers
 *     tags: [Servers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of servers
 *       500:
 *         description: Server error
 */
router.get("/", (req, res) => serverController.getAllServers(req, res));

/**
 * @swagger
 * /api/servers/{id}:
 *   get:
 *     summary: Get a single server by ID
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Server details
 *       404:
 *         description: Server not found
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res) => serverController.getServerById(req, res));

/**
 * @swagger
 * /api/servers/{id}:
 *   put:
 *     summary: Update a server by ID
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serverName:
 *                 type: string
 *               region:
 *                 type: string
 *               wipeDate:
 *                 type: string
 *                 format: date-time
 *               battlemetricsUrl:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Server updated successfully
 *       404:
 *         description: Server not found
 *       500:
 *         description: Server error
 */
router.put("/:id", (req, res) => serverController.updateServer(req, res));

/**
 * @swagger
 * /api/servers/{id}:
 *   delete:
 *     summary: Delete a server by ID
 *     tags: [Servers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Server deleted successfully
 *       404:
 *         description: Server not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", (req, res) => serverController.deleteServer(req, res));

export default router;
