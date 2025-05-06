import IGoPageClient from "@/app/[locale]/(context)/(client)/solutions/i-go/IGoPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'solutions.i-go'});
}

export default async function IGoPage() {
    return (<IGoPageClient/>)
}
