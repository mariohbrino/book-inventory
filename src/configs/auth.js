import { z } from "zod";

const schema = z.object({
  AUTH0_DOMAIN: z.coerce.string(),
  AUTH0_CLIENT_ID: z.coerce.string(),
  AUTH0_CLIENT_SECRET: z.coerce.string(),
  AUTH0_CALLBACK_URL: z.coerce.string(),
  SESSION_SECRET: z.coerce.string(),
});

export const loadAuthConfig = () => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    domain: data.AUTH0_DOMAIN,
    clientId: data.AUTH0_CLIENT_ID,
    clientSecret: data.AUTH0_CLIENT_SECRET,
    callbackUrl: data.AUTH0_CALLBACK_URL,
    sessionSecret: data.SESSION_SECRET,
  };
};
