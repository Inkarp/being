import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    category: "Pumps",
    subcategories: [
      {
        name: "Vaccum Pump (Oil-sealed)",
        slug: "vaccum-pump-oil-sealed",
        models: [
          {
            model: "VRI-4",
            meta: {
              id: "VRI-4",
              slug: "vri-4",
              title: "VRI-04",
              thumbnail: "/ovens.png",
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying and thermal processing."
          },
     
        ]
      },
      {
        name: "Diaphragm Pump",
        slug: "diaphragm-pump",
        models: [
          {
            model: "V-20",
            meta: {
              id: "v-20",
              slug: "v-20",
              title: "V-20",
              thumbnail: "/ovens.png",
            },
            overview:
              "Compact hot air oven for entry-level laboratory applications."
          },
         
        ]
      },
     
    ]
  });
}
