import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    category: "Laboratory Ovens",
    subcategories: [
      {
        name: "Laboratory Drying Oven",
        slug: "laboratory-drying-oven",
        models: [

          /* ================== BPG-9040A ================== */
          {
            model: "BPG-9040A",
            gem: true,
            meta: {
              slug: "bpg-9040a",
              title: "BPG-9040A Precision Hot Air Oven",
              thumbnail: "/ovens.png",
              price: "15000"
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.",
            keyFeatures: [
              "Stainless steel chamber with rounded corners for easy cleaning",
              "Large LCD controller with timer and multi-program settings",
              "Forced air circulation for fast and even heating",
              "Adjustable shelves for flexible sample placement",
              "Over-temperature protection with alarms",
              "Optional RS-485/RS-232 data connectivity",
              "Side test port for probes and sensors"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±1 °C",
              uniformity: "±2.5%",
              capacity: "40 L",
              chamberSize: "350 × 320 × 350 mm",
              exteriorSize: "480 × 566 × 650 mm",
              shelves: 2,
              timer: "Up to 5999 minutes",
              powerSupply: "220 V, 50 Hz",
              consumption: "850 W",
              weight: "40 kg (net), 62 kg (gross)"
            },
            applications: [
              "Pharmaceutical drying of powders and glassware",
              "Research sample preparation and heat treatment",
              "Biotechnology instrument sterilisation",
              "Chemical curing and stability testing",
              "Food and agriculture moisture analysis"
            ]
          },

          /* ================== BPG-9070A ================== */
          {
            model: "BPG-9070A",
            gem: true,
            meta: {
              slug: "bpg-9070a",
              title: "BPG-9070A Laboratory Drying Oven",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9070A is an 80-litre forced-air drying oven designed for consistent heating and drying in laboratory and industrial environments. It offers excellent temperature accuracy and repeatability up to 250 °C.",
            keyFeatures: [
              "Stainless steel chamber with smooth edges",
              "Large LCD controller with programmable timer",
              "Forced air circulation for uniform heating",
              "Adjustable shelves for flexible loading",
              "Safety alarms for over-temperature protection",
              "Optional RS-485 / printer support"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±0.5 °C",
              resolution: "0.1 °C",
              capacity: "80 L",
              chamberSize: "400 × 425 × 445 mm",
              exteriorSize: "545 × 580 × 800 mm",
              shelves: 2,
              timer: "1–9,999 minutes",
              powerSupply: "220 V, 50 Hz",
              consumption: "1,100 W"
            },
            applications: [
              "Pharma and biotech drying",
              "Research solvent removal",
              "Material science polymer curing",
              "Food and agriculture moisture testing",
              "Chemical laboratory stability checks"
            ]
          },

          /* ================== BPG-9140A ================== */
          {
            model: "BPG-9140A",
            meta: {
              slug: "bpg-9140a",
              title: "BPG-9140A Large Capacity Drying Oven",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9140A is a 150-litre forced-air drying oven designed for larger sample volumes with precise temperature control and reliable airflow.",
            keyFeatures: [
              "Large stainless steel chamber",
              "LCD controller with multi-program operation",
              "Uniform forced air circulation",
              "Three adjustable shelves",
              "Built-in safety alarms",
              "Optional RS-485 / printer connectivity"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±1 °C",
              resolution: "0.1 °C",
              capacity: "150 L",
              shelves: 3,
              consumption: "1550 W",
              weight: "81 kg (net), 117 kg (gross)"
            },
            applications: [
              "Bulk pharmaceutical drying",
              "Research solvent evaporation",
              "Material science composite testing",
              "Food powder drying",
              "Industrial component testing"
            ]
          },

          /* ================== BPG-9240A ================== */
          {
            model: "BPG-9240A",
            meta: {
              slug: "bpg-9240a",
              title: "BPG-9240A High Capacity Drying Oven",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9240A is a 250-litre drying oven designed for high-throughput laboratory and industrial applications.",
            keyFeatures: [
              "Large stainless steel chamber",
              "LCD programmable controller",
              "Uniform airflow across shelves",
              "Over-temperature safety protection",
              "Optional data logging"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              capacity: "250 L",
              shelves: 3,
              consumption: "2050 W",
              powerSupply: "220 V, 50 Hz"
            },
            applications: [
              "Bulk powder drying",
              "Research thermal studies",
              "Food and agriculture drying",
              "Industrial stability testing"
            ]
          },

          /* ================== BPG-9420A ================== */
          {
            model: "BPG-9420A",
            meta: {
              slug: "bpg-9420a",
              title: "BPG-9420A Heavy Duty Drying Oven",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9420A is a 420-litre heavy-duty drying oven engineered for high-volume industrial and research laboratories.",
            keyFeatures: [
              "Extra-large stainless steel chamber",
              "High-performance forced air circulation",
              "Multi-step programmable LCD controller",
              "Robust safety monitoring system",
              "Optional RS-485 / printer"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±0.5 °C",
              capacity: "420 L",
              shelves: 3,
              consumption: "~3,500 W",
              powerSupply: "220 V, 50 Hz"
            },
            applications: [
              "Industrial bulk drying",
              "Large batch pharmaceutical processing",
              "Material science aging studies",
              "Food grain and powder drying",
              "Chemical heat treatment"
            ]
          }

        ]
      },

      {
        name: "Vaccum Oven (Led-display)",
        slug: "vaccum-ovens",
        models: [

          /* ================== BPG-9040A ================== */
          {
            model: "DZF-6032",
            meta: {
              slug: "dzf-6032",
              title: "BPG-9040A Precision Hot Air Oven",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.",
            keyFeatures: [
              "Stainless steel chamber with rounded corners for easy cleaning",
              "Large LCD controller with timer and multi-program settings",
              "Forced air circulation for fast and even heating",
              "Adjustable shelves for flexible sample placement",
              "Over-temperature protection with alarms",
              "Optional RS-485/RS-232 data connectivity",
              "Side test port for probes and sensors"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±1 °C",
              uniformity: "±2.5%",
              capacity: "40 L",
              chamberSize: "350 × 320 × 350 mm",
              exteriorSize: "480 × 566 × 650 mm",
              shelves: 2,
              timer: "Up to 5999 minutes",
              powerSupply: "220 V, 50 Hz",
              consumption: "850 W",
              weight: "40 kg (net), 62 kg (gross)"
            },
            applications: [
              "Pharmaceutical drying of powders and glassware",
              "Research sample preparation and heat treatment",
              "Biotechnology instrument sterilisation",
              "Chemical curing and stability testing",
              "Food and agriculture moisture analysis"
            ]
          },

        ]
      },

      {
        name: "Vaccum Oven",
        slug: "vaccum-oven",
        models: [

          /* ================== BPG-9040A ================== */
          {
            model: "DZF-6032",
            meta: {
              slug: "dzf-6032",
              title: "DZF-6032",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.",
            keyFeatures: [
              "Stainless steel chamber with rounded corners for easy cleaning",
              "Large LCD controller with timer and multi-program settings",
              "Forced air circulation for fast and even heating",
              "Adjustable shelves for flexible sample placement",
              "Over-temperature protection with alarms",
              "Optional RS-485/RS-232 data connectivity",
              "Side test port for probes and sensors"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±1 °C",
              uniformity: "±2.5%",
              capacity: "40 L",
              chamberSize: "350 × 320 × 350 mm",
              exteriorSize: "480 × 566 × 650 mm",
              shelves: 2,
              timer: "Up to 5999 minutes",
              powerSupply: "220 V, 50 Hz",
              consumption: "850 W",
              weight: "40 kg (net), 62 kg (gross)"
            },
            applications: [
              "Pharmaceutical drying of powders and glassware",
              "Research sample preparation and heat treatment",
              "Biotechnology instrument sterilisation",
              "Chemical curing and stability testing",
              "Food and agriculture moisture analysis"
            ]
          },

          /* ================== BPG-9070A ================== */
          {
            model: "DZF-6053",
            meta: {
              slug: "dzf-6053",
              title: "DZF-6053",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9070A is an 80-litre forced-air drying oven designed for consistent heating and drying in laboratory and industrial environments. It offers excellent temperature accuracy and repeatability up to 250 °C.",
            keyFeatures: [
              "Stainless steel chamber with smooth edges",
              "Large LCD controller with programmable timer",
              "Forced air circulation for uniform heating",
              "Adjustable shelves for flexible loading",
              "Safety alarms for over-temperature protection",
              "Optional RS-485 / printer support"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±0.5 °C",
              resolution: "0.1 °C",
              capacity: "80 L",
              chamberSize: "400 × 425 × 445 mm",
              exteriorSize: "545 × 580 × 800 mm",
              shelves: 2,
              timer: "1–9,999 minutes",
              powerSupply: "220 V, 50 Hz",
              consumption: "1,100 W"
            },
            applications: [
              "Pharma and biotech drying",
              "Research solvent removal",
              "Material science polymer curing",
              "Food and agriculture moisture testing",
              "Chemical laboratory stability checks"
            ]
          },

          /* ================== BPG-9140A ================== */
          {
            model: "BV-20",
            meta: {
              slug: "bv-20",
              title: "BV-20",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9140A is a 150-litre forced-air drying oven designed for larger sample volumes with precise temperature control and reliable airflow.",
            keyFeatures: [
              "Large stainless steel chamber",
              "LCD controller with multi-program operation",
              "Uniform forced air circulation",
              "Three adjustable shelves",
              "Built-in safety alarms",
              "Optional RS-485 / printer connectivity"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±1 °C",
              resolution: "0.1 °C",
              capacity: "150 L",
              shelves: 3,
              consumption: "1550 W",
              weight: "81 kg (net), 117 kg (gross)"
            },
            applications: [
              "Bulk pharmaceutical drying",
              "Research solvent evaporation",
              "Material science composite testing",
              "Food powder drying",
              "Industrial component testing"
            ]
          },

          /* ================== BPG-9240A ================== */
          {
            model: "BV-50",
            meta: {
              slug: "bv-50",
              title: "BV-50",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9240A is a 250-litre drying oven designed for high-throughput laboratory and industrial applications.",
            keyFeatures: [
              "Large stainless steel chamber",
              "LCD programmable controller",
              "Uniform airflow across shelves",
              "Over-temperature safety protection",
              "Optional data logging"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              capacity: "250 L",
              shelves: 3,
              consumption: "2050 W",
              powerSupply: "220 V, 50 Hz"
            },
            applications: [
              "Bulk powder drying",
              "Research thermal studies",
              "Food and agriculture drying",
              "Industrial stability testing"
            ]
          },

          /* ================== BPG-9420A ================== */
          {
            model: "BV-70",
            meta: {
              slug: "bv-70",
              title: "BV-70",
              thumbnail: "/ovens.png"
            },
            overview:
              "The BPG-9420A is a 420-litre heavy-duty drying oven engineered for high-volume industrial and research laboratories.",
            keyFeatures: [
              "Extra-large stainless steel chamber",
              "High-performance forced air circulation",
              "Multi-step programmable LCD controller",
              "Robust safety monitoring system",
              "Optional RS-485 / printer"
            ],
            specifications: {
              temperatureRange: "Ambient +10 °C to 250 °C",
              accuracy: "±0.5 °C",
              capacity: "420 L",
              shelves: 3,
              consumption: "~3,500 W",
              powerSupply: "220 V, 50 Hz"
            },
            applications: [
              "Industrial bulk drying",
              "Large batch pharmaceutical processing",
              "Material science aging studies",
              "Food grain and powder drying",
              "Chemical heat treatment"
            ]
          }

        ]
      }
    ]
  });
}
