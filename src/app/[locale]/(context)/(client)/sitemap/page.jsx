import {generatePageMetadata} from "@/seo/generate-page-metadata"
import HtmlSitemap from "@/components/SEO/HTMLSitemap";

export async function generateMetadata({params}) {
    return generatePageMetadata({params, pagePath: 'sitemap'})
}

export default function SitemapPage() {
    return <HtmlSitemap/>
}
