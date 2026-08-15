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

async function findChats(sender: string, receiver: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            sender: {
              email: sender,
            },
            receiver: {
              email: receiver,
            },
          },
          {
            sender: {
              email: receiver,
            },
            receiver: {
              email: sender,
            },
          },
        ],
      },
      orderBy: {
        sent_time: 'asc',
      },
    });

    console.log({ messages });
    return messages;
  } catch (error) {
    throw error;
  }
}

async function findContacts(email: string) {
  // what does this all mean?
  try {
    const contacts = await prisma.user.findMany({
      where: {
        OR: [
          {
            receivedMessages: {
              some: {
                OR: [
                  {
                    sender: {
                      email,
                    },
                  },
                  {
                    receiver: {
                      email,
                    },
                  },
                ],
              },
            },
          },
          {
            sentMessages: {
              some: {
                OR: [
                  {
                    sender: {
                      email,
                    },
                  },
                  {
                    receiver: {
                      email,
                    },
                  },
                ],
              },
            },
          },
        ],
        NOT: {
          sentMessages: {
            some: {
              sender: {
                email,
              },
            },
          },
        },
      },
      select: {
        email: true,
      },
    });

    return contacts;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { createUser, findUser, findUserRaw, findChats, findContacts };
