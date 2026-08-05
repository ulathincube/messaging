// user => messages, contacts, profile,

// prisma.user.create()

// User.createUser()

import prisma from '../lib/prisma.js';

async function createUser(email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function findUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
        profile: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export { createUser, findUser };
