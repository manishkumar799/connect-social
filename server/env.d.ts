declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      // Add other environment variables if needed
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USERNAME: string;
      SMTP_PASSWORD: string;
    }
  }
  