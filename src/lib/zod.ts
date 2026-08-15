import * as z from 'zod';

const User = z.object({
  email: z.string(),
  password: z.string(),
});

const UserParam = z.object({
  email: z.email(),
});

const Message = z.object({
  text: z.string(),
  sender: z.email(),
  receiver: z.email(),
});

const Query = z.object({
  query: z.email(),
});

const Profile = z.object({
  email: z.email(),
  status: z.string(),
});

const UsersQuery = z.object({
  sender: z.string(),
  receiver: z.string(),
});

export { User, Message, Query, Profile, UsersQuery, UserParam };
