import { ServerDTO } from "../dtos/server.dto";
import { db } from "../database";
import { Timestamp } from "firebase-admin/firestore";

export class ServerService {
  private serverRef = db.collection("servers");

  // Create a new server
  async createServer(serverDto: ServerDTO): Promise<any> {
    const newServerRef = this.serverRef.doc();

    // Convert wipeDate to Firestore Timestamp
    const serverData = {
      ...serverDto,
      wipeDate: Timestamp.fromDate(new Date(serverDto.wipeDate)),
    };

    await newServerRef.set(serverData);
    return { id: newServerRef.id, ...serverData };
  }

  // Get all servers with pagination
  async getAllServers(
    page: number = 1,
    limit: number = 8
  ): Promise<{ servers: any[]; total: number }> {
    let query = this.serverRef.orderBy("wipeDate").limit(limit);

    if (page > 1) {
      const previousPageSnapshot = await this.serverRef
        .orderBy("wipeDate")
        .limit((page - 1) * limit)
        .get();

      if (previousPageSnapshot.empty) {
        return { servers: [], total: (await this.serverRef.get()).size };
      }

      const lastDoc =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const servers = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        wipeDate: data.wipeDate
          ? data.wipeDate
          : { _seconds: 0, _nanoseconds: 0 }, // Garante que não seja undefined
      };
    });
    const total = (await this.serverRef.get()).size;

    return { servers, total };
  }

  // Get a server by ID
  async getServerById(serverId: string): Promise<any> {
    const doc = await this.serverRef.doc(serverId).get();
    if (!doc.exists) {
      throw new Error("Server not found");
    }
    return { id: doc.id, ...doc.data() };
  }

  // Update a server by ID
  async updateServer(serverId: string, serverDto: ServerDTO): Promise<any> {
    const serverRef = this.serverRef.doc(serverId);
    const doc = await serverRef.get();

    if (!doc.exists) {
      throw new Error("Server not found");
    }

    const serverData = {
      ...serverDto,
      wipeDate: Timestamp.fromDate(new Date(serverDto.wipeDate)),
    };

    await serverRef.update(serverData);
    return { id: serverId, ...serverData };
  }

  // Delete a server by ID
  async deleteServer(serverId: string): Promise<void> {
    const serverRef = this.serverRef.doc(serverId);
    const doc = await serverRef.get();

    if (!doc.exists) {
      throw new Error("Server not found");
    }

    await serverRef.delete();
  }
}
