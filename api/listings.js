// Proxy to KelownaListings hub — no DDF credentials needed on this site.
// Covers Kelowna + West Kelowna + Lake Country + Peachland (the broader
// Central Okanagan footprint this site is meant to serve).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const hubRes = await fetch('https://kelownalistings.com/api/listings?cities=Kelowna,West%20Kelowna,Lake%20Country,Peachland');
    const data = await hubRes.json();
    return res.status(hubRes.status).json(data);
  } catch (err) {
    console.error('Hub error:', err.message);
    return res.status(502).json({ configured: true, error: err.message, listings: [], count: 0 });
  }
};
