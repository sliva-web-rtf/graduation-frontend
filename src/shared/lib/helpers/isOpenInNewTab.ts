import { MouseEvent } from 'react';

const isMacOS = () => {
    if ('userAgentData' in navigator) {
        // @ts-ignore
        return navigator.userAgentData.platform === 'macOS';
    }

    return navigator.userAgent.toLowerCase().includes('mac');
};

export const isOpenInNewTab = (e: MouseEvent<HTMLElement>) => {
    return isMacOS() ? e.metaKey : e.ctrlKey;
};
