import { getItem, removeItem } from "./localstorage";
import type { JwtPayload } from "../types/auth.type";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payloadSegment = token.split(".")[1];
    return JSON.parse(atob(payloadSegment)) as JwtPayload;
  } catch {
    return null;
  }
};

export const getUserRole = (): JwtPayload["role"] | null => {
  const token = getItem();
  if (!token) return null;
  return decodeToken(token)?.role ?? null;
};

const verifyToken = () => {
  const token: string | null = getItem();
  if (!token) {
    return false;
  }
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    removeItem();
    return false;
  }
  const expireTimeToken = decodedToken.exp * 1000;
  const currentTime = Date.now();
  const isExpiredToken = currentTime > expireTimeToken;
  if (isExpiredToken) {
    removeItem();
  }
  return !isExpiredToken;
};

export default verifyToken;
