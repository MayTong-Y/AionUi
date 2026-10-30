import path from 'node:path';

/** Resolve an explicitly isolated desktop profile without silently using another profile. */
export function resolveDesktopProfilePath(value: string | undefined): string | undefined {
  const requested = value?.trim();
  if (!requested) return undefined;
  if (!path.isAbsolute(requested)) {
    throw new Error('AIONUI_DESKTOP_DATA_DIR must be an absolute path');
  }
  return path.resolve(requested);
}
