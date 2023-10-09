import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      DOB: true,
      bio: true,
    }
  })

  return users
}

getUsers().then(users => {
  console.log(users)
}).finally(() => {
  prisma.$disconnect()
})
