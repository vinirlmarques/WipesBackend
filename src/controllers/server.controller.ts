import { Request, Response } from "express";
import { ServerService } from "../services/serverService";
import { ServerDTO } from "../dtos/server.dto";

export class ServerController {
  private serverService: ServerService;

  constructor() {
    this.serverService = new ServerService();
  }

  // Create a new server
  async createServer(req: Request, res: Response): Promise<Response> {
    try {
      const serverDto: ServerDTO = req.body;
      const newServer = await this.serverService.createServer(serverDto);
      return res.status(201).json(newServer);
    } catch (error) {
      console.error("Error creating server:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Get all servers
  async getAllServers(req: Request, res: Response): Promise<Response> {
    try {
      const pageNumber = parseInt(req.query.page as string, 10) || 1;
      const limitNumber = parseInt(req.query.limit as string, 10) || 8;

      if (isNaN(pageNumber) || isNaN(limitNumber)) {
        return res
          .status(400)
          .json({ message: "Invalid pagination parameters" });
      }

      const serversData = await this.serverService.getAllServers(
        pageNumber,
        limitNumber
      );

      return res.status(200).json({
        servers: serversData.servers,
        total: serversData.total,
      });
    } catch (error) {
      console.error("Error fetching servers:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Get server by ID
  async getServerById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const server = await this.serverService.getServerById(id);
      if (!server) {
        return res.status(404).json({ message: "Server not found" });
      }
      return res.status(200).json(server);
    } catch (error) {
      console.error("Error fetching server:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update a server by ID
  async updateServer(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const serverDto: ServerDTO = req.body;
      const updatedServer = await this.serverService.updateServer(
        id,
        serverDto
      );
      return res.status(200).json(updatedServer);
    } catch (error) {
      console.error("Error updating server:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Delete a server by ID
  async deleteServer(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.serverService.deleteServer(id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting server:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
