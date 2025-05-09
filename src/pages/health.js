export default function handler(req, res) {
    try {
        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            version: process.env.NEXT_PUBLIC_DEPLOY_ID || "unknown"
        });
    } catch (error) {
        res.status(500).json({
            status: "unhealthy",
            error: error.message
        });
    }
}
