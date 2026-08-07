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

export { createProfile };
