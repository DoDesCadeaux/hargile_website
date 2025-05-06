import AGVESPageClient from "@/app/[locale]/(context)/(client)/solutions/agves/AGVESPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'solutions.agves'});
}

export default async function AgvesPage() {
    return (<AGVESPageClient/>);
}
