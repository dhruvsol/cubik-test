import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //temporary assignment of id
  const _id = 33;

  const user = await prisma.user.findUnique({
    where: {
      id: _id,
    },
    select: {
      Username: true,
      DOB: true,
      Bio: true,
    },
  });
  return user;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
