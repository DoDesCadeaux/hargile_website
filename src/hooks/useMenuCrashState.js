"use client";

import {useCallback, useEffect, useState} from "react";

export const useMenuCrashState = (isOpen) => {
    const [crashTriggered, setCrashTriggered] = useState(false);

    const handleCrashComplete = useCallback(() => {
        setCrashTriggered(true);
    }, []);

    useEffect(() => {
        if (!isOpen && crashTriggered) {
            const timer = setTimeout(() => {
                setCrashTriggered(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isOpen, crashTriggered]);

    return {crashTriggered, handleCrashComplete};
};
