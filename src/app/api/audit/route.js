// src/app/api/audit/route.js
export async function POST(req) {
    try {
        const body = await req.json();
        const {
            firstName,
            lastName,
            email,
            url,
            isForOwnCompany,
            industry,
        } = body;

        if (!url) {
            return new Response(JSON.stringify({ message: "Missing URL" }), {
                status: 400,
            });
        }

        const apiKey = process.env.PAGESPEED_API_KEY;
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
            url
        )}&key=${apiKey}&category=performance&category=seo&category=accessibility`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return new Response(
            JSON.stringify({
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
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("API error:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500 }
        );
    }
}