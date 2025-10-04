type EnvConfigs = typeof envConfigs;

type ConfigsByEnv = {
  readonly databaseFile: string;
  readonly currentEnv: keyof EnvConfigs;
};

type AllowedEnvKeys = keyof EnvConfigs;

const envConfigs = {
  development: {
    databaseFile: "dev.db.sqlite3",
    currentEnv: "development",
  },
  production: {
    databaseFile: "prod.db.sqlite3",
    currentEnv: "production",
  },
  test: {
    databaseFile: ".int.test.db.sqlite3",
    currentEnv: "test",
  },
  e2e: {
    databaseFile: "e2e.test.db.sqlite3",
    currentEnv: "e2e",
  },
} as const;

function isValidEnv(env: string): env is AllowedEnvKeys {
  return Object.keys(envConfigs).includes(env);
}

export function checkEnv(): AllowedEnvKeys {
  const currentEnv = process.env.CURRENT_ENV;

  if (!currentEnv || !isValidEnv(currentEnv)) {
    throw new Error("Check the .env* and values ​​in src/env/configs.ts");
  }

  return currentEnv;
}

export function getFullEnv() {
  const currentEnv = checkEnv();
  return envConfigs[currentEnv];
}

export function getEnv<C extends keyof ConfigsByEnv>(key: C) {
  const currentEnv = checkEnv();
  const value = envConfigs[currentEnv][key];
  return value;
}
