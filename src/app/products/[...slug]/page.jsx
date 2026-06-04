import { notFound } from 'next/navigation';
import Model from './Model';
import {
  getCategoryFromSlug,
  getPlainDescription,
  getProductFromSlug,
  getSiteUrl,
} from './productData';

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    return {
      title: 'Products | Being',
      description: 'Browse laboratory instruments and product categories by Being.',
    };
  }

  if (slug.length === 3) {
    const result = await getProductFromSlug(slug);

    if (!result) {
      return {
        title: 'Product Not Found | Being',
      };
    }

    const { product } = result;
    const description =
      product.meta?.description ||
      getPlainDescription(product.overview) ||
      `Technical details and applications of ${product.productTitle || product.title}.`;

    return {
      title: product.meta?.title || product.productTitle || product.title,
      description,
      keywords: product.meta?.keywords,
      alternates: {
        canonical: `/products/${slug.join('/')}`,
      },
      openGraph: {
        title: product.meta?.title || product.productTitle || product.title,
        description,
        type: 'website',
        url: `/products/${slug.join('/')}`,
        images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
      },
    };
  }

  const categoryResult = await getCategoryFromSlug(slug);
  const categoryData = categoryResult?.categoryData;
  const subSlug = slug[1];

  if (!categoryData) {
    return {
      title: 'Product | Being',
      description: 'Explore laboratory instruments and solutions by Being.',
    };
  }

  let title = categoryData.meta?.title || `${categoryData.category} | Being`;
  let description =
    categoryData.meta?.description ||
    `Discover ${categoryData.category} instruments with specifications, applications, and service support.`;

  if (subSlug) {
    const subCategory = categoryData.subcategories?.find((sub) => sub.slug === subSlug);

    if (subCategory) {
      title = `${subCategory.name} | Being`;
      description = `Discover ${subCategory.name} instruments with specifications, applications, and service support.`;
    }
  }

  return {
    title,
    description,
    keywords: [],
    alternates: {
      canonical: `/products/${slug.join('/')}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/products/${slug.join('/')}`,
    },
  };
}

function ProductSchema({ result }) {
  const { categorySlug, subSlug, modelSlug, product, subCategory, categoryData } = result;
  const siteUrl = getSiteUrl();
  const description =
    product.meta?.description ||
    getPlainDescription(product.overview) ||
    product.productTitle ||
    product.title;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.productTitle || product.title || product.model,
    description,
    image: product.thumbnail ? `${siteUrl}${product.thumbnail}` : undefined,
    sku: product.model || product.meta?.slug,
    brand: {
      '@type': 'Brand',
      name: 'Being',
    },
    category: `${categoryData.category || categorySlug} > ${subCategory.name || subSlug}`,
    url: `${siteUrl}/products/${categorySlug}/${subSlug}/${modelSlug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Page({ params }) {
  const { slug = [] } = await params;

  if (slug.length > 3) notFound();

  if (slug.length === 3) {
    const productResult = await getProductFromSlug(slug);

    if (!productResult) notFound();

    return (
      <>
        <ProductSchema result={productResult} />
        <Model slug={slug} productResult={productResult} />
      </>
    );
  }

  const categoryResult = await getCategoryFromSlug(slug);

  if (!categoryResult?.categoryData) notFound();

  const requestedSubSlug = slug[1];

  if (requestedSubSlug) {
    const hasSubcategory = categoryResult.categoryData.subcategories?.some(
      (sub) => sub.slug?.toLowerCase() === requestedSubSlug.toLowerCase()
    );

    if (!hasSubcategory) notFound();
  }

  return <Model slug={slug} categoryResult={categoryResult} />;
}
