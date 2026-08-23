const AUTH_SESSION_COOKIE = "sahmyto_auth";

/**
 * Non-sensitive session flag cookie. The real token stays in localStorage;
 * this only lets middleware redirect unauthenticated visitors away from
 * /dashboard before any protected UI renders.
 */
export function markAuthSession() {
  document.cookie = `${AUTH_SESSION_COOKIE}=1; path=/; max-age=2592000; samesite=lax`;
}

export function clearAuthSession() {
  document.cookie = `${AUTH_SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
