export async function retryOnRateLimit<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 800,
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const message = String(error?.message || "");

      const isRateLimit =
        message.includes("429") ||
        message.includes("rateLimitExceeded") ||
        message.includes("Too many concurrent requests for user");

      if (!isRateLimit || attempt === retries) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
