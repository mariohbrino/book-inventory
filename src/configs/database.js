import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.coerce.string(),
});

export const loadDatabaseConfig = () => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    databaseUrl: data.DATABASE_URL,
  };
};
