/* eslint-disable max-len */
import { SVGProps } from 'react';

export const GlobeIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.334-13.333-13.334C8.636 2.666 2.666 8.636 2.666 16S8.636 29.333 16 29.333Z"
        />
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m3.333 16.666 7.334 2.667L9.334 24l1.333 4M22.666 27.333 22 24l-3.334-1.334V18l4-1.334 6 .667M25.333 7.333l-.666 2L20 10v4l3.333-1.333H26L28.667 14M3.333 14l3.334-2.667L10 10.667l2.667-4L11.334 4"
        />
    </svg>
);
