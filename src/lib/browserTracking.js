function detectDevice(userAgent = "") {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return "Tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

function parseReferrer(referrer = "") {
  if (!referrer) return { source: "Direct / None", keyword: "" };

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    const searchEngines = [
      { pattern: /google\./, name: "Google", queryKey: "q" },
      { pattern: /bing\./, name: "Bing", queryKey: "q" },
      { pattern: /yahoo\./, name: "Yahoo", queryKey: "p" },
      { pattern: /duckduckgo\./, name: "DuckDuckGo", queryKey: "q" },
      { pattern: /yandex\./, name: "Yandex", queryKey: "text" },
    ];

    for (const engine of searchEngines) {
      if (engine.pattern.test(host)) {
        return {
          source: engine.name,
          keyword: url.searchParams.get(engine.queryKey) || "(not provided)",
        };
      }
    }

    const socialSources = [
      [/facebook\.|fb\.com/, "Facebook"],
      [/instagram\./, "Instagram"],
      [/linkedin\./, "LinkedIn"],
      [/twitter\.|x\.com/, "Twitter / X"],
      [/youtube\./, "YouTube"],
      [/whatsapp\./, "WhatsApp"],
    ];

    for (const [pattern, name] of socialSources) {
      if (pattern.test(host)) return { source: name, keyword: "" };
    }

    return { source: `Referral: ${url.hostname}`, keyword: "" };
  } catch {
    return { source: "Unknown", keyword: "" };
  }
}

export function collectTracking() {
  if (typeof window === "undefined") return {};

  const userAgent = navigator.userAgent || "";
  const referrer = document.referrer || "";
  const params = new URLSearchParams(window.location.search);
  const { source, keyword } = parseReferrer(referrer);
  const pageUrl = window.location.href;
  const trafficSource = params.get("utm_source") || source;
  const searchKeyword = params.get("utm_term") || params.get("utm_keyword") || keyword;

  return {
    _pageUrl: pageUrl,
    _referrerUrl: referrer || "Direct / None",
    _trafficSource: trafficSource,
    _searchKeyword: searchKeyword,
    _utmMedium: params.get("utm_medium") || "",
    _utmCampaign: params.get("utm_campaign") || "",
    _utmTerm: params.get("utm_term") || "",
    _utmContent: params.get("utm_content") || "",
    _gclid: params.get("gclid") || "",
    _fbclid: params.get("fbclid") || "",
    _deviceType: detectDevice(userAgent),
    _userAgent: userAgent,

    referrer: referrer || "Direct / None",
    source: trafficSource,
    keyword: searchKeyword,
    deviceType: detectDevice(userAgent),
    timestamp: new Date().toISOString(),
    landingUrl: pageUrl,
    pagePath: window.location.pathname,
    fullUrl: pageUrl,
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
  };
}
