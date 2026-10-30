import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveDesktopProfilePath } from '../../../packages/desktop/src/common/platform/desktopProfile';

describe('isolated desktop profiles', () => {
  it('keeps the existing profile behavior when no override is provided', () => {
    expect(resolveDesktopProfilePath(undefined)).toBeUndefined();
    expect(resolveDesktopProfilePath('   ')).toBeUndefined();
  });

  it('normalizes an explicit profile independently of the source checkout', () => {
    const requested = path.resolve('profile', 'daily');
    expect(resolveDesktopProfilePath(` ${requested} `)).toBe(requested);
  });

  it('rejects a relative profile instead of opening an unrelated database', () => {
    expect(() => resolveDesktopProfilePath('data/daily')).toThrow('must be an absolute path');
  });
});
