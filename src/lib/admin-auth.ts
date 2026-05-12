import "server-only";
import crypto from "node:crypto";

const COOKIE_NAME = "mmv_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD env var is not set");
  }
  return password;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createToken(): string {
  const issued = Date.now();
  const payload = `${issued}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  try {
    const expected = sign(payload);
    if (
      signature.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return false;
    }
  } catch {
    return false;
  }
  const issued = Number(payload);
  if (!Number.isFinite(issued)) return false;
  const ageSeconds = (Date.now() - issued) / 1000;
  return ageSeconds < COOKIE_MAX_AGE;
}

export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  if (submitted.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(submitted), Buffer.from(expected));
}

export const ADMIN_COOKIE = {
  name: COOKIE_NAME,
  maxAge: COOKIE_MAX_AGE,
};
