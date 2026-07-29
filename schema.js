(function () {
  var BASE = 'https://kelownadownsizing.com';
  var path = window.location.pathname.replace(/\/$/, '') || '/';

  function inject(data) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(data);
    (document.head || document.body).appendChild(s);
  }

  inject({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness'],
        '@id': BASE + '#business',
        'name': 'Mark Jontz & Associates',
        'alternateName': 'Kelowna Downsizing',
        'url': BASE,
        'telephone': '+12508616002',
        'email': 'info@markjontz.com',
        'description': 'Mark Jontz & Associates at Royal LePage Kelowna — downsizing specialists covering single-level homes, ranchers, condos, and 55+/45+ communities across Kelowna, West Kelowna, Lake Country, and Peachland.',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Kelowna',
          'addressRegion': 'BC',
          'addressCountry': 'CA'
        },
        'areaServed': [
          { '@type': 'City', 'name': 'Kelowna' },
          { '@type': 'City', 'name': 'West Kelowna' },
          { '@type': 'City', 'name': 'Lake Country' },
          { '@type': 'City', 'name': 'Peachland' }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': BASE + '#website',
        'name': 'Kelowna Downsizing',
        'url': BASE,
        'description': 'The downsizing resource for Kelowna and the surrounding Central Okanagan — single-level homes, ranchers, condos, and 55+/45+ communities.',
        'publisher': { '@id': BASE + '#business' },
        'inLanguage': 'en-CA'
      }
    ]
  });

  var PAGES = {
    '/single-level-homes': 'Single-Level Homes',
    '/55-plus-communities': '55+ Communities',
    '/guide': 'Free Downsizing Guide',
    '/blog': 'Blog',
    '/blog/is-it-time-to-downsize': 'Is It Time to Downsize?',
    '/blog/sell-before-buy-downsizing': 'Should I Sell Before I Buy?',
    '/blog/rancher-vs-condo-downsizing': 'Rancher vs. Condo',
    '/blog/downsizing-checklist-what-to-keep': 'Downsizing Checklist',
    '/blog/freehold-strata-vs-coop': 'Freehold, Strata, Co-op & Land-Lease',
    '/homesafe': 'Homesafe',
    '/senior-living-options': 'Senior Living Options',
    '/sunrise-village': 'Sunrise Village',
    '/linden-estates': 'Linden Estates',
    '/crystal-springs': 'Crystal Springs',
    '/balmoral-estates': 'Balmoral Estates',
    '/sandstone': 'Sandstone',
    '/sandpointe': 'SandPointe',
    '/the-fountains': 'The Fountains',
    '/solstice-at-tower-ranch': 'Solstice at Tower Ranch',
    '/sage-creek': 'Sage Creek',
    '/glenmeadows': 'GlenMeadows',
    '/regency-heights': 'Regency Heights',
    '/gerstmar-place': 'Gerstmar Place',
    '/the-adderly': 'The Adderly',
    '/mallards-landing': "Mallard's Landing",
    '/sandalwood': 'Sandalwood',
    '/the-greens-at-balmoral': 'The Greens at Balmoral',
    '/canyon-ridge': 'Canyon Ridge',
    '/sandhaven': 'Sandhaven',
    '/bernard-place': 'Bernard Place',
    '/the-wedgewood': 'The Wedgewood',
    '/royal-oak': 'Royal Oak',
    '/lawrence-villa': 'Lawrence Villa',
    '/hawthorn-park-condos': 'Hawthorn Park Condos',
    '/central-mobile-home-park': 'Central Mobile Home Park',
    '/monticello': 'Monticello',
    '/leisure-village': 'Leisure Village',
    '/pinevilla-estates': 'Pinevilla Estates',
    '/chateaux-on-the-lake': 'Chateaux On The Lake',
    '/cadence-at-the-lakes': 'Cadence at The Lakes',
    '/west-kelowna': 'West Kelowna',
    '/lake-country': 'Lake Country',
    '/peachland': 'Peachland',
    '/contact': 'Contact',
    '/team': 'Our Team'
  };

  var HOMEPAGE_FAQS = [
    ["What does \"downsizing\" actually mean?", "Downsizing means moving from a larger home to a smaller, lower-maintenance property — typically a condo, rancher, bungalow, or townhome — often to reduce upkeep, unlock home equity, or simplify life in retirement."],
    ["Should I sell my current home before I buy a new one?", "Not necessarily — our Homesafe program lets you secure your next home first, with both closings coordinated on the same day, avoiding bridge financing and a rushed sale."],
    ["What is a 55+ or 45+ community?", "A strata development with an age-restriction bylaw, typically requiring at least one resident per unit to be above the stated age, with no children as permanent residents."],
    ["What's the difference between a rancher and a bungalow?", "Largely interchangeable in everyday BC usage — both describe a single-story detached home with no stairs to the main living area."],
    ["How much does it cost to downsize in Kelowna?", "It depends on your current home's value versus your target property, plus selling costs (typically ~5%) and moving costs — for many long-time owners, downsizing releases equity rather than costing money outright."],
    ["Do I need a REALTOR® who specializes in downsizing?", "Not strictly, but it helps — downsizing involves different considerations (timing two transactions, 55+ strata bylaws, matching lifestyle to property type) than a typical move."]
  ];

  if (path === '/') {
    inject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': BASE + '/#faq',
      'mainEntity': HOMEPAGE_FAQS.map(function (qa) {
        return { '@type': 'Question', 'name': qa[0], 'acceptedAnswer': { '@type': 'Answer', 'text': qa[1] } };
      })
    });
  }

  var breadcrumbItems = [{ '@type': 'ListItem', 'position': 1, 'name': 'Kelowna Downsizing', 'item': BASE + '/' }];
  if (PAGES[path]) {
    breadcrumbItems.push({ '@type': 'ListItem', 'position': 2, 'name': PAGES[path], 'item': BASE + path });
  }
  inject({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems
  });
})();
