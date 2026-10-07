import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { H3Event } from "h3";
import { SignJWT, jwtVerify } from "jose";

const scrypt = promisify(_scrypt) as (
  password: string,
  salt: string,
  keylen: number,
  options: { N: number; r: number; p: number }
) => Promise<Buffer>;

const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 } as const;
const KEY_LENGTH = 64;

export const AUTH_COOKIE = "admin_token";
export const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

/* ---------- contraseñas (scrypt nativo de Node) ---------- */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  const [scheme, salt, expectedHex] = hash.split("$");
  if (scheme !== "scrypt" || !salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, "hex");
  if (expected.length !== KEY_LENGTH) return false;

  const derived = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);
  return timingSafeEqual(derived, expected);
}

/* ---------- JWT (HS256 vía jose) ---------- */

function getSecret(): Uint8Array {
  const secret =
    useRuntimeConfig().jwtSecret || "dev-only-insecure-jwt-secret";
  return new TextEncoder().encode(secret);
}

export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    if (!payload.sub) return null;
    return {
      id: Number(payload.sub),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      role: String(payload.role ?? "admin"),
    };
  } catch {
    return null;
  }
}

/* ---------- cookie ---------- */

export async function getAuthUser(event: H3Event): Promise<AuthUser | null> {
  const token = getCookie(event, AUTH_COOKIE);
  if (!token) return null;
  return verifyToken(token);
}
