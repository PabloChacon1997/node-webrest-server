import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { envs } from "../../config/envs";


const adapter = new PrismaPg({
  connectionString: envs.POSTGRES_URL!,
});


export const prisma = new PrismaClient({adapter});