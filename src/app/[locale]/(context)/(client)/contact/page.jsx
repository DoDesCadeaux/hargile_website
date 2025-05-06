import ContactPageClient from "@/app/[locale]/(context)/(client)/contact/ContactPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'contact'});
}

export default async function ContactPage() {
    return (<ContactPageClient/>);
}
