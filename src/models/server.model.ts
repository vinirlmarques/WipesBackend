export interface Server {
  id?: string;
  serverName: string;
  region: string;
  wipeDate: string;
  battlemetricsUrl: string;
  description: string;
  imageUrl: string;
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}
