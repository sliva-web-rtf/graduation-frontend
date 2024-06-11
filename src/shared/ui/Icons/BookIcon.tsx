/* eslint-disable max-len */
import { SVGProps } from 'react';

export const BookIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M5.333 25.333V6.667A2.667 2.667 0 0 1 8 4h17.867a.8.8 0 0 1 .8.8v17.486"
        />
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.666 4v10.667L14 12.533l3.333 2.134V4"
        />
        <path stroke="#408DFF" strokeLinecap="round" strokeWidth={1.5} d="M8 22.667h18.667M8 28h18.667" />
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 28a2.667 2.667 0 1 1 0-5.333"
        />
    </svg>
);
