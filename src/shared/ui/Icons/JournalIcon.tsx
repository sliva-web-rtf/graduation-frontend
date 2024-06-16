/* eslint-disable max-len */
import { SVGProps } from 'react';

export const JournalIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 8h10.667M8 13.334h16M16 18.666h8M16 24h8M2.667 28.533V3.466a.8.8 0 0 1 .8-.8h20.868a.8.8 0 0 1 .566.235l4.198 4.198a.8.8 0 0 1 .234.566v20.868a.8.8 0 0 1-.8.8H3.466a.8.8 0 0 1-.8-.8Z"
        />
        <path
            fill="#408DFF"
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M24 7.2V3.138a.471.471 0 0 1 .805-.333l4.39 4.39a.471.471 0 0 1-.333.805H24.8a.8.8 0 0 1-.8-.8ZM8 24v-5.334h2.667V24H8Z"
        />
    </svg>
);
