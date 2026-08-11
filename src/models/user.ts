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
      select: {
        user_id: true,
        email: true,
        profile: true,
        sentMessages: {
          include: {
            receiver: {
              select: {
                email: true,
                user_id: true,
                profile: true,
              },
            },
          },
        },
        receivedMessages: {
          include: {
            sender: {
              select: {
                email: true,
                user_id: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserRaw(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        user_id: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export { createUser, findUser, findUserRaw };
