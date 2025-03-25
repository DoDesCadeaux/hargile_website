// src/hooks/useIntersectionObserver.js
import {useEffect, useState} from "react";

export const useIntersectionObserver = (
    elementRef,
    {
        threshold = 0,
        root = null,
        rootMargin = "0px",
        triggerOnce = false
    } = {}
) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef?.current;
        if (!element || typeof IntersectionObserver !== "function") {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isNowIntersecting = entry.isIntersecting;
                setIsIntersecting(isNowIntersecting);

                if (isNowIntersecting && triggerOnce) {
                    observer.disconnect();
                }
            },
            {
                threshold,
                root,
                rootMargin
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, threshold, root, rootMargin, triggerOnce]);

    return isIntersecting;
};
