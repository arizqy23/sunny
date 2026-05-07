import { useEffect } from 'react';

let lenisInstance = null;
let rafId = null;

export function useLenis() {
    useEffect(() => {
        // Cegah duplikasi instance
        if (lenisInstance) return;

        import('lenis').then(({ default: Lenis }) => {
            lenisInstance = new Lenis({
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            });

            function raf(time) {
                lenisInstance.raf(time);
                rafId = requestAnimationFrame(raf);
            }
            rafId = requestAnimationFrame(raf);
        });

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            if (lenisInstance) {
                lenisInstance.destroy();
                lenisInstance = null;
            }
        };
    }, []);

    return lenisInstance;
}

export function scrollTo(target, options = {}) {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, { duration: 1.2, ...options });
    }
}
