/* eslint-disable max-len */
import { SVGProps } from 'react';

export const ServerIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m8 24.013.013-.015M8 8.013 8.013 8"
        />
        <path
            stroke="#408DFF"
            strokeWidth={1.5}
            d="M2.667 12.533V3.467a.8.8 0 0 1 .8-.8h25.066a.8.8 0 0 1 .8.8v9.066a.8.8 0 0 1-.8.8H3.466a.8.8 0 0 1-.8-.8ZM2.667 28.533v-9.067a.8.8 0 0 1 .8-.8h25.066a.8.8 0 0 1 .8.8v9.067a.8.8 0 0 1-.8.8H3.466a.8.8 0 0 1-.8-.8Z"
        />
    </svg>
);
