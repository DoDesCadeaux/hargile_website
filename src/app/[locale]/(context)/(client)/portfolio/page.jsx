import PortfolioPageClient from "@/app/[locale]/(context)/(client)/portfolio/PortfolioPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'portfolio'});
}

export default async function PortfolioPage() {
    return (<PortfolioPageClient/>);
}
