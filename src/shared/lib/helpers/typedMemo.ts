import { memo } from 'react';

/** @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087 */
export const typedMemo: <T>(component: T) => T = memo;
