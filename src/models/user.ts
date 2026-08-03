// user => messages, contacts, profile,

// prisma.user.create()

// User.createUser()

import prisma from '../lib/prisma.js';

async function createUser(fullname: string, email: string) {
  try {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function searchUser(email: string) {
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

export { createUser };
