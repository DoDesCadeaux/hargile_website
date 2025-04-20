// src/app/api/audit/route.js
// src/app/api/audit/route.js
export async function POST(req) {
    try {
        const body = await req.json();
        const {url, firstName, lastName, email, isForOwnCompany, industry} = body;

        if (!url) {
            return Response.json({message: "Missing URL"}, {status: 400});
        }

        // Validate URL format
        try {
            new URL(url);
        } catch (error) {
            return Response.json({message: "Invalid URL format"}, {status: 400});
        }

        const apiKey = process.env.PAGESPEED_API_KEY;

        if (!apiKey) {
            return Response.json({message: "API key is not configured"}, {status: 500});
        }

        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
            url
        )}&key=${apiKey}&category=performance&category=seo&category=accessibility&category=best-practices`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
            const response = await fetch(apiUrl, {
                signal: controller.signal,
                headers: {
                    "Accept": "application/json"
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const error = await response.text();
                console.error("PageSpeed API error response:", error);
                return Response.json({
                    message: `PageSpeed API returned error: ${response.status}`,
                    error
                }, {status: response.status});
            }

            const data = await response.json();

            return Response.json({
                success: true,
                auditResults: data,
                submittedData: {
                    firstName,
                    lastName,
                    email,
                    url,
                    isForOwnCompany,
                    industry,
                },
            });
        } catch (fetchError) {
            clearTimeout(timeoutId);

            if (fetchError.name === 'AbortError') {
                return Response.json({message: "PageSpeed API request timed out"}, {status: 504});
            }

            throw fetchError;
        }
    } catch (error) {
        console.error("API error:", error);
        return Response.json({
            message: "Internal server error",
            error: error.message
        }, {status: 500});
    }
}
