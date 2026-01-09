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
            model: "Laboratory Drying Oven – BPG-9040A",
            gem: true,
            meta: {
              slug: "bpg-9040a",
              title: "Laboratory Drying Oven BPG-9040A | OEM & Service Provider in India | Being India",
              description: "BPG-9040A laboratory drying oven with precise temperature control, uniform hot air circulation, and OEM-authorized service support in India.",
              keywords: "Laboratory Drying Oven, BPG-9040A Laboratory Drying Oven, Laboratory Drying Oven OEM India, Precision hot air oven, Laboratory drying oven specifications, Laboratory drying oven features, Hot air oven manufacturer India, Laboratory drying oven manufacturer in India, Laboratory drying oven OEM in India, Buy laboratory drying oven from OEM India, Laboratory oven installation and service India, Laboratory drying oven for pharmaceutical labs, Hot air oven for research laboratories, Drying oven for chemical laboratories, Laboratory oven for food testing labs, BPG-9040A hot air oven, BPG laboratory drying oven, BPG-9040A specifications",
              thumbnail: "/testImg.webp",
              imgAltltText: "Laboratory Drying Oven_BPG-9040A_ Being India",
              price: "15000"
            },
            "overview": [
              "The BPG-9040A Laboratory Drying Oven is a precision hot air oven engineered for reliable drying, heating, and thermal processing of laboratory samples under stable and uniform temperature conditions. It features a 40-liter stainless steel chamber and an advanced forced air circulation system, ensuring even heat distribution and minimizing temperature variations that can affect sample integrity and reproducibility.",

              "Widely used in pharmaceutical, research, biotechnology, chemical, and food testing laboratories across India, this laboratory drying oven supports applications such as glassware drying, sample conditioning, heat treatment, and controlled evaporation. Its high-accuracy digital temperature controller enables precise thermal regulation, while the compact design allows easy installation in space-constrained laboratories. Backed by OEM-authorized support in India, it delivers dependable performance, long-term reliability, and professional after-sales service.",
            ],
            features: {
              "overview": [
                "The BPG-9040A Laboratory Drying Oven is designed to deliver consistent performance, operational safety, and process flexibility for a wide range of laboratory workflows. Its construction, airflow design, and control architecture are optimized for regulated laboratory environments where cleanliness, temperature stability, and repeatability are critical. The integrated control system and uniform airflow mechanism ensure reliable drying and heating results across both routine and precision-driven laboratory applications.",
              ],
              "items": [
                "Stainless steel inner chamber with rounded corners for durability and easy cleaning",
                "Large LCD digital controller with timer, multi-program settings, and real-time parameter display",
                "Forced air circulation system for fast heat-up and uniform temperature distribution",
                "Adjustable shelves for flexible sample placement and efficient chamber utilization",
                "Over-temperature protection with audible and visual alarms for enhanced operational safety",
                "Optional RS-485 / RS-232 interfaces for data monitoring, validation, and recording",
                "Side test port for insertion of external probes, sensors, and calibration instruments"
              ]
            },

            specifications: {
              "overview": [
                "The BPG-9040A Laboratory Drying Oven is engineered to deliver stable thermal performance, precise temperature control, and full compatibility with standard laboratory infrastructure in India. Its technical specifications support continuous operation in pharmaceutical quality control, research, and industrial testing environments where accuracy, repeatability, and reliability are essential.",
              ],
              "items": [
                { "label": "Temperature Range", "value": "Ambient +10 °C to 250 °C" },
                { "label": "Temperature Accuracy", "value": "±1 °C" },
                { "label": "Temperature Uniformity", "value": "±2.5%" },
                { "label": "Chamber Capacity", "value": "40 L" },
                { "label": "Chamber Size (W × D × H)", "value": "350 × 320 × 350 mm" },
                { "label": "Exterior Size (W × D × H)", "value": "480 × 566 × 650 mm" },
                { "label": "Number of Shelves", "value": "2 (adjustable)" },
                { "label": "Timer Range", "value": "Up to 5999 minutes" },
                { "label": "Power Supply", "value": "220 V, 50 Hz" },
                { "label": "Power Consumption", "value": "850 W" },
                { "label": "Weight", "value": "40 kg (net), 62 kg (gross)" }
              ]
            },

            "applications": {
              "overview": [
                "The BPG-9040A Laboratory Drying Oven is used across multiple scientific and industrial sectors in India due to its precise temperature control, uniform heating, and robust safety features. It supports laboratory processes where controlled drying and heating are essential for achieving accurate, repeatable, and compliant results.",
              ],
              "items": [
                {
                  "label": "Pharmaceutical laboratories",
                  "value": "Drying powders, granules, glassware, and packaging materials under controlled temperature conditions."
                },
                {
                  "label": "Research laboratories",
                  "value": "Sample preparation, heat treatment, and controlled solvent evaporation for experimental workflows."
                },
                {
                  "label": "Biotechnology laboratories",
                  "value": "Sterilising laboratory instruments and incubating non-volatile samples for biological research."
                },
                {
                  "label": "Chemical industry",
                  "value": "Curing processes, stability studies, and controlled heating applications in production and testing."
                },
                {
                  "label": "Food and agriculture laboratories",
                  "value": "Moisture content analysis and packaging material testing to ensure quality and compliance."
                }
              ]
            },

            "faqs": [
              {
                "question": "What is a laboratory drying oven used for? ",
                "answer": "A laboratory drying oven is used to remove moisture from samples, dry laboratory glassware, and perform controlled heating or heat treatment under uniform temperature conditions. It is widely used in pharmaceutical, chemical, biotechnology, research, and food testing laboratories to ensure accurate, repeatable, and compliant results."
              },
              {
                "question": "How does the BPG-9040A laboratory drying oven work?",
                "answer": "The BPG-9040A operates using a forced hot air circulation system that distributes heat evenly throughout the chamber. A digital temperature controller regulates heating cycles to maintain stable temperature conditions, preventing localized overheating and ensuring consistent sample processing."
              },
              {
                "question": "Which laboratories commonly use the BPG-9040A drying oven?",
                "answer": "The BPG-9040A is commonly used in pharmaceutical quality control laboratories, academic and industrial research facilities, biotechnology labs, chemical industries, and food and agriculture testing laboratories across India."
              },
              {
                "question": "Is the BPG-9040A suitable for pharmaceutical applications?",
                "answer": "Yes. The BPG-9040A is well suited for pharmaceutical applications such as drying powders, glassware, packaging materials, and conditioning samples prior to analysis. Its temperature accuracy and uniformity support reproducible and compliant results."
              },
              {
                "question": "What temperature range does the BPG-9040A support?",
                "answer": "The BPG-9040A supports a temperature range of ambient +10 °C to 250 °C, covering most routine laboratory drying and heating requirements."
              },
              {
                "question": "Does the BPG-9040A provide uniform temperature distribution?",
                "answer": "Yes. The forced air circulation system ensures uniform temperature distribution throughout the chamber, minimizing temperature gradients and supporting repeatable laboratory outcomes."
              },
              {
                "question": "Can the BPG-9040A be used for long-duration heating cycles?",
                "answer": "Yes. The oven is designed for continuous and long-duration operation and includes a digital timer of up to 5999 minutes, along with over-temperature protection for safe extended use."
              },
              {
                "question": "Is data monitoring or recording supported?",
                "answer": "Yes. Optional RS-485 and RS-232 communication interfaces allow integration with external data logging and monitoring systems for validation and traceability."
              },
              {
                "question": "Are you the OEM for this product in India?",
                "answer": "Yes. We are the OEM for the BPG-9040A Laboratory Drying Oven in India, providing direct manufacturing assurance, factory-authorized service, and genuine spare parts support."
              },
              {
                "question": "What should be considered when selecting a laboratory drying oven?",
                "answer": "Key considerations include temperature range, accuracy, uniformity, chamber capacity, safety features, and availability of OEM-authorized service support. The BPG-9040A offers a balanced combination of performance, safety, and long-term support for Indian laboratories."
              }
            ],

            feedback: [
              "/service1.webp",
              "/service2.webp",
              "/service3.webp",
              "/service4.webp",
              "/service5.webp",
              "/service6.webp",
            ],
            services: {
              description:
                "As the OEM for the BPG-9040A Laboratory Drying Oven in India, we provide factory-authorized pan-India installation, commissioning, operator training, preventive maintenance, calibration assistance, and after-sales service. Our trained service engineers and genuine spare parts ensure long-term reliability, minimal downtime, and consistent performance for laboratories across India.",
              photos: [
                "/service1.webp",
                "/service2.webp",
                "/service3.webp",
                "/service4.webp",
                "/service5.webp",
                "/service6.webp",

              ]
            }

          },

          /* ================== BPG-9070A ================== */
          {
            model: "BPG-9070A",
            gem: true,
            meta: {
              slug: "bpg-9070a",
              title: "BPG-9070A Laboratory Drying Oven",
              thumbnail: "/testImg.webp",
            },
            overview:
              "The BPG-9070A is an 80-litre forced-air drying oven designed for consistent heating and drying in laboratory and industrial environments. It offers excellent temperature accuracy and repeatability up to 250 °C. The BPG-9070A is an 80-litre forced-air drying oven designed for consistent heating and drying in laboratory and industrial environments. It offers excellent temperature accuracy and repeatability up to 250 °C. The BPG-9070A is an 80-litre forced-air drying oven designed for consistent heating and drying in laboratory and industrial environments. It offers excellent temperature accuracy and repeatability up to 250 °C.",
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
              thumbnail: "/testImg.webp",
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
              thumbnail: "/testImg.webp",
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
              thumbnail: "/testImg.webp",
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
              thumbnail: "/testImg.webp",
            },
            overview:
              "The BPG-9040A Precision Hot Air Oven is designed for reliable drying, heating, and thermal processing of laboratory samples. With a 40-liter chamber, uniform air circulation, and precise temperature control, it ensures consistent results for daily scientific and industrial applications.",
            features: {
              "overview": [
                "The BPG-9040A Laboratory Drying Oven is designed to deliver consistent performance, operational safety, and process flexibility for a wide range of laboratory workflows. Its construction, airflow design, and control architecture are optimized for regulated laboratory environments where cleanliness, temperature stability, and repeatability are critical.",
              ],
              "items": [
                "Stainless steel inner chamber with rounded corners for durability and easy cleaning",
                "Large LCD digital controller with timer, multi-program settings, and real-time parameter display",
                "Forced air circulation system for fast heat-up and uniform temperature distribution",
                "Adjustable shelves for flexible sample placement and efficient chamber utilization",
                "Over-temperature protection with audible and visual alarms for enhanced operational safety",
                "Optional RS-485 / RS-232 interfaces for data monitoring, validation, and recording",
                "Side test port for insertion of external probes, sensors, and calibration instruments"
              ]
            },

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
              thumbnail: "/testImg.webp",
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
              thumbnail: "/testImg.webp",
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
