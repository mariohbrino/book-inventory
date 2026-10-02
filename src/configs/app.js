import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.coerce.string(),
  BASE_URL: z.coerce.string(),
  PORT: z.coerce.string(),
});

export const loadAppConfig = () => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    nodeEnv: data.NODE_ENV,
    baseUrl: data.BASE_URL,
    port: data.PORT,
    isDevelopment: data.NODE_ENV === "development",
  };
};
