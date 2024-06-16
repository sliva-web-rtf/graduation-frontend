/* eslint-disable max-len */
import { SVGProps } from 'react';

export const GitCompareIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M24 28a2.667 2.667 0 1 0 0-5.333A2.667 2.667 0 0 0 24 28ZM8 9.333A2.667 2.667 0 1 0 8 4a2.667 2.667 0 0 0 0 5.333ZM24 22.666V9.333s0-2.667-2.666-2.667h-4M8 9.334v13.333s0 2.666 2.667 2.666h4"
        />
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m20 10-3.332-3.333L20 3.334M11.334 22l3.333 3.333-3.333 3.334"
        />
    </svg>
);
