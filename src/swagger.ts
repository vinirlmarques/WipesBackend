import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Server API",
      version: "1.0.0",
      description: "API for managing Rust servers",
      contact: {
        name: "Support",
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:4000",
      },
    ],
  },
  apis: [__dirname + "/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
