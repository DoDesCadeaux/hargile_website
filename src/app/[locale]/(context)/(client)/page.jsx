import HomePageClient from "@/app/[locale]/(context)/(client)/HomePageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'home'});
}

export default async function HomePage({params}) {

    return (
        <HomePageClient/>
    );
}
