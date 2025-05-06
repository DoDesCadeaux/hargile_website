import PrivacyPolicyPageClient from "@/app/[locale]/(context)/(client)/legal/privacy-policy/PrivacyPocilyPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'legal.privacy'});
}

export default async function PrivacyPolicyPage() {
    return (<PrivacyPolicyPageClient/>);
}
