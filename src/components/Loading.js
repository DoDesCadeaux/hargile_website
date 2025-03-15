import { useState, useEffect } from "react";

export default function Loading({loadingManager}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!loadingManager) return;

        loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const percent = Math.round((itemsLoaded / itemsTotal) * 100);
            setProgress(percent);
        };
    }, [loadingManager]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <div className="text-4xl font-semibold mb-4">Chargement...</div>
            <div className="mt-2 text-md">{progress}%</div>
        </div>
    );
}
