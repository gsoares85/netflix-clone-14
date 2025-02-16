import { PrismaClient } from '@prisma/client';

// @ts-expect-error Global already added
const client = global.prismaDb || new PrismaClient();
// @ts-expect-error Global already added
if (process.env.NODE_ENV === 'production') global.prismaDb = client;

export default client;
