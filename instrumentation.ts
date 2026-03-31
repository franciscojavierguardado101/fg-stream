export async function register() {
  // Accept self-signed SSL certificates for DDEV local development
  // This runs before any fetch calls in Next.js server components
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
