import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  try {
    const existingTypes = await prisma.transactionType.findMany()
    const existingRoles = await prisma.role.findMany()

    if (existingTypes.length === 0) {
      const types = await prisma.transactionType.createMany({
        data: [
          { name: 'Mint', code: 'MINT' },
          { name: 'Transfer', code: 'TRANSFER' },
        ],
      })
      console.log({ types })
    }

    if (existingRoles.length === 0) {
      const roles = await prisma.role.create({
        data: { name: 'admin', code: 'ADMIN' },
      })
      console.log({ roles })
    }
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
