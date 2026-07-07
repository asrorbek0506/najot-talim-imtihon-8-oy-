export function cleanEmptyStrings<T extends object>(payload: T): T {
  const result: Record<string, unknown> = {
    ...(payload as Record<string, unknown>),
  };
  for (const key of Object.keys(result)) {
    if (result[key] === "") {
      result[key] = undefined;
    }
  }
  return result as T;
}
