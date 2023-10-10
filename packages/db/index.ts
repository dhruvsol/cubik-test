import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function getUserDetails(userId: string) {
    return await prisma.user.findUnique({
        where: {id: userId},
        select: {
            username: true,
            DOB: true,
            bio: true,
        }
    });
}

export { getUserDetails };
