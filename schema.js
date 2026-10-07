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
        ],
        'parentOrganization': {
          '@type': 'RealEstateAgent',
          'name': 'Mark Jontz & Associates',
          'url': 'https://www.markjontz.com'
        },
        'sameAs': [
          'https://www.markjontz.com',
          'https://kelownalistings.com',
          'https://ownacademyway.com',
          'https://ownsekelowna.com'
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
    '/blog/downsizing-to-peachland': 'Downsizing to Peachland',
    '/blog/sell-before-buy-downsizing': 'Should I Sell Before I Buy?',
    '/blog/rancher-vs-condo-downsizing': 'Rancher vs. Condo',
    '/blog/downsizing-checklist-what-to-keep': 'Downsizing Checklist',
    '/blog/freehold-strata-vs-coop': 'Freehold, Strata, Co-op & Land-Lease',
    '/blog/cost-to-downsize-kelowna': 'How Much Does It Cost to Downsize?',
    '/blog/talk-to-parents-about-downsizing': 'Talking to Parents About Downsizing',
    '/blog/land-lease-communities-explained': 'Land-Lease Communities Explained',
    '/blog/property-tax-deferment-seniors-bc': 'BC Property Tax Deferment for Seniors',
    '/blog/reverse-mortgage-vs-downsizing': 'Reverse Mortgage vs. Downsizing',
    '/blog/best-time-to-sell-kelowna': 'Best Time of Year to Sell in Kelowna',
    '/blog/manufactured-home-vs-condo-downsizing': 'Manufactured Home vs. Condo',
    '/homesafe': 'Homesafe',
    '/senior-living-options': 'Senior Living Options',
    '/950-lanfranco': '950 Lanfranco',
    '/balmoral-estates': 'Balmoral Estates',
    '/barrington-square': 'Barrington Square',
    '/bernard-place': 'Bernard Place',
    '/carmel-housing-society': 'Carmel Housing Society',
    '/central-mobile-home-park': 'Central Mobile Home Park',
    '/chartwell': 'Chartwell',
    '/country-lane': 'Country Lane',
    '/gerstmar-place': 'Gerstmar Place',
    '/glenmeadows': 'GlenMeadows',
    '/gordon-park-village': 'Gordon Park Village',
    '/harwood-park': 'Harwood Park',
    '/hawthorn-park-condos': 'Hawthorn Park Condos',
    '/lakecity-estates': 'LakeCity Estates',
    '/lawrence-villa': 'Lawrence Villa',
    '/mallards-landing': 'Mallard\'s Landing',
    '/maple-keys': 'Maple Keys',
    '/mccurdy-court': 'McCurdy Court',
    '/mcintosh-place': 'McIntosh Place',
    '/mission-court': 'Mission Court',
    '/mission-villas': 'Mission Villas',
    '/okanagan-mobile-villa': 'Okanagan Mobile Villa',
    '/orchard-place-1': 'Orchard Place 1',
    '/ranch-park': 'Ranch Park Mobile Home Park',
    '/regency-heights': 'Regency Heights',
    '/royal-oak': 'Royal Oak',
    '/sandpointe': 'SandPointe',
    '/sandalwood': 'Sandalwood',
    '/sandhaven': 'Sandhaven',
    '/sandstone': 'Sandstone',
    '/shasta-mobile-home-park': 'Shasta Mobile Home Park',
    '/solstice-at-tower-ranch': 'Solstice at Tower Ranch',
    '/somerset-terrace': 'Somerset Terrace',
    '/springbrook-gardens': 'Springbrook Gardens',
    '/springfield-manor': 'Springfield Manor',
    '/sunrise-village': 'Sunrise Village',
    '/the-adderly': 'The Adderly (Adderley)',
    '/the-bench-ii': 'The Bench II',
    '/the-colonial': 'The Colonial',
    '/the-fountains': 'The Fountains',
    '/the-gables': 'The Gables',
    '/the-greens-at-balmoral': 'The Greens at Balmoral',
    '/the-maples': 'The Maples',
    '/the-marquis': 'The Marquis',
    '/the-meadows': 'The Meadows',
    '/the-wedgewood': 'The Wedgewood',
    '/whytcliffe-manor': 'Whytcliffe Manor',
    '/willow-terrace-housing-society': 'Willow Terrace Housing Society',
    '/cadence-at-the-lakes': 'Cadence at The Lakes',
    '/cedar-ridge-estates': 'Cedar Ridge Estates',
    '/kal-pine-estates': 'Kal Pine Estates',
    '/meadowbrook-estates': 'Meadowbrook Estates',
    '/pinecrest': 'Pinecrest',
    '/antlers-beach-mhp': 'Antlers Beach Mobile Home Park',
    '/chateaux-on-the-lake': 'Chateaux On The Lake',
    '/edgewater-pines-mhp': 'Edgewater Pines Mobile Home Park',
    '/pine-hills-mobile-home-park': 'Pine Hills Mobile Home Park',
    '/trepanier-creek': 'Trepanier Creek',
    '/canyon-ridge': 'Canyon Ridge',
    '/crystal-springs': 'Crystal Springs',
    '/ingram-place': 'Ingram Place',
    '/leisure-gardens': 'Leisure Gardens',
    '/leisure-village': 'Leisure Village',
    '/linden-estates': 'Linden Estates',
    '/mcdougall-creek-estates': 'McDougall Creek Estates',
    '/monticello': 'Monticello',
    '/old-okanagan-mobile-home-park': 'Old Okanagan Mobile Home Park',
    '/pinevilla-estates': 'Pinevilla Estates',
    '/pinewoods-villa': 'Pinewoods Villa',
    '/sage-creek': 'Sage Creek',
    '/shannon-lake-mobile-home-park': 'Shannon Lake Mobile Home Park',
    '/sun-village': 'Sun Village',
    '/the-pointe': 'The Pointe',
    '/the-vintage': 'The Vintage',
    '/westgate-village': 'Westgate Village Mobile Home Park',
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

  var SENIOR_LIVING_FAQS = [
    ["What's the difference between downsizing and assisted living?", "Downsizing means buying or selling a smaller, lower-maintenance home — a real estate transaction we handle directly. Assisted living is a licensed care service (help with medication, bathing, meals) delivered through a monthly rental, not something bought or sold on MLS®. Many people searching \"assisted living\" are really in the downsizing stage first and haven't needed care services yet — see the breakdown above for which category actually fits."],
    ["Does Homesafe work if I'm moving into assisted living instead of buying a home?", "Yes — Homesafe's \"subject to finding another suitable property\" clause is structured around whatever your real next step is, including a retirement residence move-in date instead of a second closing. We coordinate your home sale timeline around the residence's own move-in process so you're not carrying two housing costs or rushed into a decision."],
    ["Do you get a referral fee from the retirement residences you list?", "No — we don't take referral fees from any residence in our directory. What we do have is genuine working familiarity with how these communities operate (move-in timelines, waitlists, what each one actually offers), built from helping clients through this transition before. That's relationship and experience, not a financial arrangement."],
    ["How much does assisted living cost in Kelowna?", "Rental-model assisted living residences across the Central Okanagan commonly range from roughly $2,500 to $5,000+ per month depending on the level of care and the specific residence — confirm current rates directly with any residence you're considering, since they change."],
    ["Is assisted living the same as a 55+ retirement community?", "No. A 55+ community (what our 55+ Communities page covers) is a real estate purchase — you buy a home in an age-restricted strata with no included care services. Assisted living is a licensed rental arrangement that includes daily support. Someone fully independent who just wants less house fits a 55+ community; someone needing help with daily tasks fits assisted living."]
  ];

  if (path === '/' || path === '/senior-living-options') {
    var faqSet = path === '/' ? HOMEPAGE_FAQS : SENIOR_LIVING_FAQS;
    inject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': BASE + path + '#faq',
      'mainEntity': faqSet.map(function (qa) {
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
