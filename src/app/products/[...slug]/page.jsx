// SERVER COMPONENT (DO NOT add 'use client')
import Model from './Model';

export async function generateMetadata({ params }) {
  const slug = params?.slug || [];

  /* ---------- DEFAULT ---------- */
  if (slug.length === 0) {
    return {
      title: 'Products | Inkarp Instruments',
      description: 'Browse laboratory instruments and product categories.',
    };
  }

  const categorySlug = slug[0];

  try {
    /* ---------- IMPORTANT: ABSOLUTE URL ---------- */
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const res = await fetch(
      `${baseUrl}/api/products/${categorySlug}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error('API failed');

    const categoryData = await res.json();

    const subSlug = slug[1];
    const modelSlug = slug[2];

    let title = `${categorySlug.replace(/-/g, ' ')} | Inkarp Instruments`;
    let description = `Explore ${categorySlug.replace(/-/g, ' ')} laboratory instruments from Inkarp Instruments.`;

    /* ---------- SUBCATEGORY ---------- */
    if (subSlug) {
      const subCategory = categoryData.subcategories?.find(
        (s) => s.slug === subSlug
      );

      if (subCategory) {
        title = `${subCategory.name} | Inkarp Instruments`;
        description = `Discover ${subCategory.name} with specifications, applications, and OEM service support in India.`;
      }

      /* ---------- MODEL ---------- */
      if (modelSlug && subCategory) {
        const model = subCategory.models?.find(
          (m) => m.meta.slug.toLowerCase() === modelSlug.toLowerCase()
        );

        if (model) {
          title = `${model.meta.title} | Inkarp Instruments`;
          description =
            model.meta.description ||
            model.overview?.[0] ||
            `Technical details and applications of ${model.meta.title}.`;
        }
      }
    }

    return {
      title,
      description,
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
  } catch (error) {
    console.error('Metadata error:', error);

    return {
      title: 'Product | Inkarp Instruments',
      description: 'Explore laboratory instruments from Inkarp Instruments.',
    };
  }
}

/* ---------- PAGE RENDER ---------- */
export default function Page() {
  return <Model />;
}
