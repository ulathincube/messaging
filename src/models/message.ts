import prisma from '../lib/prisma.js';

async function createMessage(text: string, sender: string, receiver: string) {
  try {
    const message = await prisma.message.create({
      data: {
        message_text: text,
        sender: {
          connect: {
            email: sender,
          },
        },
        receiver: {
          connect: {
            email: receiver,
          },
        },
      },
    });
    return message;
  } catch (error) {
    throw error;
  }
}

export { createMessage };
