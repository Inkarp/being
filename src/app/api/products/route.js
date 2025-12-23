import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const dummyData = {
    ovens: {
      title: 'Ovens',
      description:
        'Hot air ovens for drying, sterilization and thermal testing.',
      products: [
        {
          name: 'BPG-9040A',
          summary: '40L precision hot air oven',
          link: '/products/ovens/bpg-9040a',
        },
        {
          name: 'BPG-9070A',
          summary: '80L laboratory drying oven',
          link: '/products/ovens/bpg-9070a',
        },
      ],
    },

    incubators: {
      title: 'Incubators',
      description:
        'Controlled temperature chambers for biological applications.',
      products: [
        {
          name: 'BIO-150',
          summary: 'CO₂ incubator with humidity control',
          link: '#',
        },
      ],
    },
  };

  return NextResponse.json(dummyData[slug] || null);
}
