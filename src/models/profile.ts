import prisma from '../lib/prisma.js';

async function createProfile(email: string, status: string) {
  try {
    const profile = await prisma.profile.create({
      data: {
        status,
        user: {
          connect: {
            email,
          },
        },
      },
    });
    return profile;
  } catch (error) {
    throw error;
  }
}

async function getStatus(email: string) {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        user: {
          email,
        },
      },
      select: {
        status: true,
      },
    });
    return profile;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { createProfile, getStatus };
