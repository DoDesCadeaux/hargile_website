import AboutUsPageClient from "@/app/[locale]/(context)/(client)/about-us/AboutUsPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'about-us'});
}

export default async function AboutUsPage() {
    return (<AboutUsPageClient/>);
}
