import MultipassPageClient from "@/app/[locale]/(context)/(client)/solutions/multipass/MultipassPageClient";
import {generatePageMetadata} from "@/seo/generate-page-metadata";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'solutions.multipass'});
}

export default async function MultipassPage() {
    return (<MultipassPageClient/>);
}
