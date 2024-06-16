/* eslint-disable max-len */
import { SVGProps } from 'react';

export const ArchiveIcon = (props: SVGProps<any>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
        <path
            stroke="#408DFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.334 8h13.333M9.334 12h13.333M12 22.666h8"
        />
        <path
            stroke="#408DFF"
            strokeWidth={1.5}
            d="M4 16h24M4 16h-.534a.8.8 0 0 0-.8.8v11.733a.8.8 0 0 0 .8.8h25.067a.8.8 0 0 0 .8-.8V16.8a.8.8 0 0 0-.8-.8H4Zm0 0V3.466a.8.8 0 0 1 .8-.8h22.4a.8.8 0 0 1 .8.8V16H4Z"
        />
    </svg>
);
