const applicationsData = {
  ovens: {
    slug: 'ovens',
    title: 'Laboratory Ovens',
    meta: {
      title: 'Laboratory Ovens | Inkarp Instruments',
      description:
        'High-performance laboratory ovens for drying, heating and thermal processing.',
    },

    categories: {
      'Laboratory Drying Oven': [
        {
          slug: 'bpg-9040a',
          model: 'BPG-9040A',
          image: '/ovens.png',
          meta: {
            title: 'BPG-9040A Laboratory Drying Oven | Inkarp',
            description:
              '40 L LCD controlled laboratory drying oven up to 250 °C.',
          },
          specs: {
            'Temperature Range': 'RT +10°C to 250°C',
            Capacity: '40 L',
            Controller: 'LCD PID',
          },
        },
        {
          slug: 'bpg-9070a',
          model: 'BPG-9070A',
          image: '/ovens.png',
          meta: {
            title: 'BPG-9070A Laboratory Drying Oven | Inkarp',
            description:
              '70 L forced-air laboratory drying oven.',
          },
          specs: {
            'Temperature Range': 'RT +10°C to 250°C',
            Capacity: '70 L',
            Controller: 'LCD PID',
          },
        },
      ],

      'Vacuum Oven': [
        {
          slug: 'dzf-6032',
          model: 'DZF-6032',
          image: '/ovens.png',
          meta: {
            title: 'DZF-6032 Vacuum Oven | Inkarp',
            description:
              'Vacuum oven for controlled drying under reduced pressure.',
          },
          specs: {
            'Temperature Range': 'RT +10°C to 200°C',
            Vacuum: '≤133 Pa',
            Capacity: '32 L',
          },
        },
      ],
    },
  },

  incubators: {
    slug: 'incubators',
    title: 'Laboratory Incubators',
    meta: {
      title: 'Laboratory Incubators | Inkarp Instruments',
      description:
        'CO₂ and cooling incubators for cell culture and microbiology.',
    },

    categories: {
      'CO₂ Incubator': [
        {
          slug: 'bpn-80ch',
          model: 'BPN-80CH',
          image: '/ovens.png',
          meta: {
            title: 'BPN-80CH CO₂ Incubator | Inkarp',
            description:
              'CO₂ incubator with precise temperature and gas control.',
          },
          specs: {
            'Temperature Range': 'RT +5°C to 60°C',
            'CO2 Concentration': '0–20%',
            Capacity: '80 L',
          },
        },
      ],
    },
  },
};

export default applicationsData;
