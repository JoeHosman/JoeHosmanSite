export function normalizeBase(value = "/") {
  if (
    /[?#:\\]/.test(value) ||
    value.startsWith("//") ||
    value.split("/").some((part) => part === ".." || part === ".") ||
    /\s/.test(value)
  )
    throw new Error("SITE_BASE must be a local path, such as /portfolio/.");
  const path = value.split("/").filter(Boolean).join("/");
  return path ? `/${path}/` : "/";
}

export function withBase(path, base = "/") {
  const prefix = normalizeBase(base);
  if (!path.startsWith("/") || path.startsWith("//") || prefix === "/")
    return path;
  const basePath = prefix.slice(0, -1);
  if (
    path === basePath ||
    path.startsWith(prefix) ||
    path.startsWith(`${basePath}?`) ||
    path.startsWith(`${basePath}#`)
  )
    return path;
  return `${basePath}${path}`;
}
