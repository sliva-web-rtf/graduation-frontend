/* eslint-disable max-len */
import { SVGProps } from 'react';

export const DatabaseIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.333 8v8s0 4 9.334 4C24 20 24 16 24 16V8"
        />
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.667 4C24 4 24 8 24 8s0 4-9.333 4c-9.334 0-9.334-4-9.334-4s0-4 9.334-4ZM14.667 28c-9.334 0-9.334-4-9.334-4v-8M24 29.333h4-4Zm2-3.428h3.11v-4.572H22.89v4.572h3.11Z"
        />
    </svg>
);
