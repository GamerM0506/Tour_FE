import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const isPortrait = height > width;
            const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

            if (width < 768 || (isiPad && width < 1024 && isPortrait)) {
                setDeviceType('mobile');
            } else if ((width >= 768 && width < 1024) || (isiPad && width >= 1024 && isPortrait)) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        window.addEventListener('orientationchange', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('orientationchange', checkDevice);
        };
    }, []);

    return deviceType;
};