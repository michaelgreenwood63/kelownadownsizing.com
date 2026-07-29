(function () {
  'use strict';

  // Keyword sets used since RESO/DDF has no universal "single level" or "55+" field —
  // these are best-effort matches against PublicRemarks, not guaranteed complete.
  var SINGLE_LEVEL_KEYWORDS = ['rancher', 'bungalow', 'single level', 'single-level', 'one level', 'one-level', 'no stairs', 'ranch style', 'ranch-style'];
  var AGE_RESTRICTED_KEYWORDS = ['55+', '55 plus', '45+', '45 plus', 'age restricted', 'age-restricted', 'adult oriented', 'adult-oriented', 'no rentals to families', 'bare land strata 55'];

  var _allListings = [];
  var _filters = { type: 'all', minPrice: 0, maxPrice: Infinity, minBeds: 0 };
  var PAGE_SIZE = 9;
  var _currentPage = 1;
  var _mode = 'all'; // 'all' | 'single-level' | 'age-restricted' | 'community'
  var _cityFilter = null;
  var _community = null; // { streetName, streetNumbers: [], nameKeyword }

  function formatPrice(p) { if (!p) return 'Price on Request'; return '$' + Number(p).toLocaleString('en-CA'); }
  function getPhoto(l) { if (l.Media && l.Media.length) { var m = l.Media.find(function (x) { return x.MediaURL; }); if (m) return m.MediaURL; } return null; }
  function buildAddress(l) {
    var parts = [];
    if (l.UnitNumber) parts.push('#' + l.UnitNumber);
    if (l.StreetNumber) parts.push(l.StreetNumber);
    if (l.StreetName) parts.push(l.StreetName);
    if (l.StreetSuffix) parts.push(l.StreetSuffix);
    return parts.join(' ') || 'Address on Request';
  }
  function remarksMatch(l, keywords) {
    var r = (l.PublicRemarks || '').toLowerCase();
    return keywords.some(function (k) { return r.indexOf(k) !== -1; });
  }
  function structureType(l) {
    if (Array.isArray(l.StructureType) && l.StructureType.length) return l.StructureType[0];
    if (typeof l.StructureType === 'string') return l.StructureType;
    return l.PropertySubType || '';
  }

  function isSingleLevelCandidate(l) {
    var st = structureType(l);
    // Apartments/condos are inherently single-level living; houses need a remarks match
    if (st === 'Apartment') return true;
    if ((st === 'Single Family' || st === 'House' || st === 'Duplex') && remarksMatch(l, SINGLE_LEVEL_KEYWORDS)) return true;
    return false;
  }
  function isAgeRestrictedCandidate(l) {
    return remarksMatch(l, AGE_RESTRICTED_KEYWORDS);
  }
  function isCommunityCandidate(l) {
    if (!_community) return false;
    // Street matching REQUIRES a specific street number list — street name alone (e.g. "Gordon
    // Drive") is far too common and matches unrelated listings blocks away. Only treat it as a
    // real match when both the street name AND one of the known civic numbers line up.
    var streetOk = false;
    if (_community.streetName && _community.streetNumbers && _community.streetNumbers.length) {
      streetOk = (l.StreetName || '').toLowerCase().indexOf(_community.streetName.toLowerCase()) !== -1
        && _community.streetNumbers.indexOf(String(l.StreetNumber)) !== -1;
    }
    var nameOk = _community.nameKeyword ? remarksMatch(l, [_community.nameKeyword.toLowerCase()]) : false;
    return streetOk || nameOk;
  }

  function renderCard(l) {
    var photo = getPhoto(l);
    var photoStyle = photo ? 'background-image:url(\'' + photo.replace(/'/g, "\\'") + '\')' : 'background:linear-gradient(135deg,#eee,#ddd)';
    var beds = l.BedroomsTotal ? l.BedroomsTotal + ' bd' : null;
    var baths = l.BathroomsTotalInteger ? l.BathroomsTotalInteger + ' ba' : null;
    var sqft = l.LivingArea ? Math.round(l.LivingArea).toLocaleString('en-CA') + ' sqft' : null;
    var details = [beds, baths, sqft].filter(Boolean).map(function (d) { return '<span>' + d + '</span>'; }).join('');
    var city = l.City || '';
    return '<a href="https://kelownalistings.com/listing?id=' + encodeURIComponent(l.ListingKey || '') + '" target="_blank" rel="noopener" class="listing-card">' +
      '<div class="listing-photo" style="' + photoStyle + '"><span class="listing-badge">Active</span></div>' +
      '<div class="listing-body">' +
      '<div class="listing-price">' + formatPrice(l.ListPrice) + '</div>' +
      '<div class="listing-address">' + buildAddress(l) + ', ' + city + '</div>' +
      '<div class="listing-details">' + details + '</div>' +
      '<span class="listing-cta">View Details →</span>' +
      '</div></a>';
  }

  function applyFilters() {
    var pool = _mode === 'single-level' ? _allListings.filter(isSingleLevelCandidate)
             : _mode === 'age-restricted' ? _allListings.filter(isAgeRestrictedCandidate)
             : _mode === 'community' ? _allListings.filter(isCommunityCandidate)
             : _allListings;

    if (_cityFilter) pool = pool.filter(function (l) { return l.City === _cityFilter; });

    return pool.filter(function (l) {
      if (_filters.type !== 'all') {
        var st = structureType(l).toLowerCase();
        if (_filters.type === 'condo' && st !== 'apartment') return false;
        if (_filters.type === 'rancher' && !(st === 'single family' || st === 'house') ) return false;
        if (_filters.type === 'townhouse' && st.indexOf('row') === -1 && st.indexOf('town') === -1) return false;
      }
      var price = l.ListPrice || 0;
      if (price < _filters.minPrice || price > _filters.maxPrice) return false;
      if ((l.BedroomsTotal || 0) < _filters.minBeds) return false;
      return true;
    });
  }

  function renderPagination(grid, totalItems) {
    var totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    var old = grid.parentNode ? grid.parentNode.querySelector('.pagination') : null;
    if (old) old.remove();
    if (totalPages <= 1) return;
    var nav = document.createElement('div');
    nav.className = 'pagination';
    function makeBtn(label, page, active, disabled) {
      var b = document.createElement('button');
      b.className = 'pagination-btn';
      b.textContent = label;
      b.disabled = !!disabled;
      if (active) { b.style.borderColor = 'var(--red)'; b.style.color = 'var(--red)'; }
      if (!disabled) b.addEventListener('click', function () { _currentPage = page; renderListings(); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      return b;
    }
    nav.appendChild(makeBtn('← Prev', _currentPage - 1, false, _currentPage <= 1));
    for (var p = 1; p <= totalPages; p++) nav.appendChild(makeBtn(String(p), p, p === _currentPage, false));
    nav.appendChild(makeBtn('Next →', _currentPage + 1, false, _currentPage >= totalPages));
    grid.parentNode.appendChild(nav);
  }

  function renderListings() {
    var grid = document.getElementById('listings-grid');
    var count = document.getElementById('listings-count');
    if (!grid) return;
    var filtered = applyFilters();
    if (!filtered.length) {
      grid.innerHTML = '<div class="listings-status">No active listings currently match these filters. Try widening your search, or <a href="/contact" style="color:var(--red);font-weight:700">contact us</a> — we often know about upcoming listings before they hit MLS®.</div>';
      if (count) count.textContent = '0 listings';
      var oldNav = grid.parentNode ? grid.parentNode.querySelector('.pagination') : null;
      if (oldNav) oldNav.remove();
      return;
    }
    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (_currentPage > totalPages) _currentPage = totalPages;
    var start = (_currentPage - 1) * PAGE_SIZE;
    var page = filtered.slice(start, start + PAGE_SIZE);
    if (count) count.textContent = 'Showing ' + (start + 1) + '–' + Math.min(start + PAGE_SIZE, filtered.length) + ' of ' + filtered.length + ' active listings';
    grid.innerHTML = page.map(renderCard).join('');
    renderPagination(grid, filtered.length);
  }

  window.setPropertyType = function (btn, type) {
    document.querySelectorAll('.filter-btn[data-role="type"]').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    _filters.type = type;
    _currentPage = 1;
    renderListings();
  };
  window.filterPrice = function (select) {
    var val = select.value;
    if (!val) { _filters.minPrice = 0; _filters.maxPrice = Infinity; }
    else { var p = val.split('-'); _filters.minPrice = parseInt(p[0], 10) || 0; _filters.maxPrice = parseInt(p[1], 10) || Infinity; }
    _currentPage = 1;
    renderListings();
  };
  window.filterBeds = function (select) {
    _filters.minBeds = parseInt(select.value, 10) || 0;
    _currentPage = 1;
    renderListings();
  };
  window.resetDownsizingFilters = function () {
    _filters = { type: 'all', minPrice: 0, maxPrice: Infinity, minBeds: 0 };
    _currentPage = 1;
    document.querySelectorAll('.filter-btn[data-role="type"]').forEach(function (b, i) { b.classList.toggle('active', i === 0); });
    var ps = document.getElementById('f-price'); if (ps) ps.value = '';
    var bs = document.getElementById('f-beds'); if (bs) bs.value = '0';
    renderListings();
  };

  function loadListings(mode, cityFilter, community) {
    _mode = mode || 'all';
    _cityFilter = cityFilter || null;
    _community = community || null;
    var grid = document.getElementById('listings-grid');
    var count = document.getElementById('listings-count');
    if (!grid) return;
    grid.innerHTML = '<div class="listings-status">Loading current listings…</div>';
    fetch('/api/listings')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.configured) { grid.innerHTML = '<div class="listings-status">Listings coming soon.</div>'; return; }
        if (data.error) { grid.innerHTML = '<div class="listings-status">Unable to load listings right now — <a href="/contact" style="color:var(--red);font-weight:700">contact us</a> for current availability.</div>'; return; }
        _allListings = data.listings || [];
        renderListings();
      })
      .catch(function () {
        grid.innerHTML = '<div class="listings-status">Unable to load listings right now — <a href="/contact" style="color:var(--red);font-weight:700">contact us</a> for current availability.</div>';
      });
  }

  window.initDownsizingListings = loadListings;
})();
