import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    category: "Incubators",
    subcategories: [
      {
        name: "Laboratory Drying Oven",
        slug: "laboratory-drying-oven",
        models: [
          {
            model: "BPG-9040A",
            meta: {
              id: "bpg-9040a",
              slug: "bpg-9040a",
              title: "BPG-9040A Precision Hot Air Oven",
              thumbnail: "/ovens.png",
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying and thermal processing."
          },
          {
            model: "BPG-9070A",
            meta: {
              id: "bpg-9070a",
              slug: "bpg-9070a",
              title: "BPG-9070A Laboratory Drying Oven",
              thumbnail: "/ovens.png",
            },
            overview:
              "The BPG-9070A is a reliable forced-air drying oven for laboratory use."
          }
        ]
      },
      {
        name: "Drying Oven",
        slug: "drying-oven",
        models: [
          {
            model: "BPG-90",
            meta: {
              id: "bpg-90",
              slug: "bpg-90",
              title: "BPG-90A Precision Hot Air Oven",
              thumbnail: "/ovens.png",
            },
            overview:
              "Compact hot air oven for entry-level laboratory applications."
          },
          {
            model: "BPG-920",
            meta: {
              id: "bpg-920",
              slug: "bpg-920",
              title: "BPG-920 Large Capacity Drying Oven",
              thumbnail: "/incubators.png",
            },
            overview:
              "Large capacity drying oven for industrial and research labs."
          }
        ]
      },
      {
        name: "Drying Laboratory Oven",
        slug: "drying-laboratory-oven",
        models: [
          {
            model: "BPG-90",
            meta: {
              id: "bpg-90",
              slug: "bpg-90",
              title: "BPG-90A Precision Hot Air Oven",
              thumbnail: "/ovens.png",
            },
            overview:
              "Compact hot air oven for entry-level laboratory applications."
          },
          {
            model: "BPG-920",
            meta: {
              id: "bpg-920",
              slug: "bpg-920",
              title: "BPG-920 Large Capacity Drying Oven",
              thumbnail: "/incubators.png",
            },
            overview:
              "Large capacity drying oven for industrial and research labs."
          }
        ]
      }
    ]
  });
}
