import ServicesPageClient from "@/app/[locale]/(context)/(client)/services/ServicePAgeClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'services'});
}


export default async function ServicesPage() {
    return (<ServicesPageClient/>);
}
