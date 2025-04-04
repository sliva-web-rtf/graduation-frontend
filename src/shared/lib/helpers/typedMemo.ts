import { memo } from 'react';

/** @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087 */
// eslint-disable-next-line no-unused-vars
export const typedMemo: <T>(component: T) => T = memo;
