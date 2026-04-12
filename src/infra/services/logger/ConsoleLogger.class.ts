import { Logger } from '@/core/ports/services/Logger';

export class ConsoleLogger implements Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  info(prefix: string, message: string, context?: unknown): void {
    if (this.isDevelopment) {
      console.log(
        `[INFO][${prefix}] ${new Date().toISOString()}: ${message}`,
        context ?? '',
      );
    } else {
      console.info(`[${prefix}] ${message}`, { context });
    }
  }

  error(prefix: string, message: string, error?: unknown): void {
    if (this.isDevelopment) {
      console.error(
        `[ERROR][${prefix}] ${new Date().toISOString()}: ${message}`,
        error ?? '',
      );
    } else {
      console.error(`[${prefix}] ${message}`, { error });
    }
  }
}
