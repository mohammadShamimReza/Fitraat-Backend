module.exports = ({ env }) => {
  console.log("Database Password:", env("DATABASE_PASSWORD"));

  const client = env("DATABASE_CLIENT");

  const connections = {
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            false // Change to false to bypass SSL verification
          ),
        },
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
