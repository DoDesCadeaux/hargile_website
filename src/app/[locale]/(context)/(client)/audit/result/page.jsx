import AuditResultPageClient from "@/app/[locale]/(context)/(client)/audit/result/AuditResultPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'audit.result'});
}

export default async function AuditResultPage() {
    return (<AuditResultPageClient/>)
}
