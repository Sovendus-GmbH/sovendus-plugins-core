import type { SovendusAppSettings } from "../../settings/app-settings";
import type { CountryCodes } from "../../settings/sovendus-countries";
import { sovReqProductIdKey, sovReqTokenKey } from "../constants";
import { getOptimizeConfig } from "../thankyou-page/thankyou-page";

interface SovendusPageConfig {
  settings: SovendusAppSettings;
  integrationType: string;
  country: CountryCodes | undefined;
}

interface SovPageWindow extends Window {
  sovPageConfig: SovendusPageConfig;
  sovPageStatus: {
    loadedOptimize: boolean;
    loadedVoucherNetworkSwitzerland: boolean;
    executedCheckoutProducts: boolean;
    sovPageConfigFound: boolean;
  };
}

declare let window: SovPageWindow;

async function main(): Promise<void> {
  const pageSettings = window.sovPageConfig;
  if (typeof pageSettings !== "undefined") {
    window.sovPageStatus.sovPageConfigFound = true;
    const {
      optimizeId,
      checkoutProductsEnabled,
      voucherNetworkSwitzerlandEnabled,
    } = getSovendusConfig(pageSettings.settings, pageSettings.country);
    handleOptimizePageScript(optimizeId);
    handleVoucherNetworkSwitzerland(voucherNetworkSwitzerlandEnabled);
    await handleCheckoutProductsPage(
      checkoutProductsEnabled,
      window.location.href,
      setCookie,
    );
  } else {
    window.sovPageStatus.sovPageConfigFound = false;
    // eslint-disable-next-line no-console
    console.error("sovPageConfig is not defined");
  }
}

interface ParsedPageConfig {
  optimizeId: string | undefined;
  checkoutProductsEnabled: boolean;
  voucherNetworkSwitzerlandEnabled: boolean | undefined;
}

function getSovendusConfig(
  settings: SovendusAppSettings,
  country: CountryCodes | undefined,
): ParsedPageConfig {
  const countryCode: CountryCodes | undefined = country || detectCountryCode();
  const vnSwitzerland = settings.voucherNetwork.countries.CH?.languages;
  return {
    optimizeId: getOptimizeConfig(settings.optimize, countryCode),
    checkoutProductsEnabled: settings.checkoutProducts,
    voucherNetworkSwitzerlandEnabled:
      vnSwitzerland?.DE?.isEnabled ||
      vnSwitzerland?.IT?.isEnabled ||
      vnSwitzerland?.FR?.isEnabled,
  };
}

export async function handleCheckoutProductsPage(
  checkoutProductsEnabled: boolean | undefined,
  pageHref: string,
  setCookie: (cookieOrName: string, value?: string) => Promise<string>,
): Promise<void> {
  if (checkoutProductsEnabled) {
    const sovReqToken = getParamFromUrl(pageHref, sovReqTokenKey);
    if (sovReqToken) {
      const sovReqProductId = getParamFromUrl(pageHref, sovReqProductIdKey);
      await setCookie(sovReqTokenKey, sovReqToken);
      if (sovReqProductId) {
        window.sovPageStatus.executedCheckoutProducts = true;
        await setCookie(sovReqProductIdKey, sovReqProductId);
      }
    }
  }
}

function getParamFromUrl(pageHref: string, key: string): string | undefined {
  const url = new URL(pageHref);
  return url.searchParams.get(key) || undefined;
}

// eslint-disable-next-line @typescript-eslint/require-await
async function setCookie(cookieName: string, value?: string): Promise<string> {
  document.cookie = `${cookieName}=${value};secure;samesite=strict;max-age=${
    60 * 60 * 24 * 30
  }`;
  return value || "";
}

function handleVoucherNetworkSwitzerland(
  voucherNetworkSwitzerlandEnabled: boolean | undefined,
): void {
  if (voucherNetworkSwitzerlandEnabled) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://api.sovendus.com/js/landing.js";
    document.body.appendChild(script);
    window.sovPageStatus.loadedVoucherNetworkSwitzerland = true;
  }
}

function detectCountryCode(): CountryCodes | undefined {
  const getCountryCodeFromHtmlTag = (): CountryCodes | undefined => {
    const lang = document.documentElement.lang;
    const countryCode = lang.split("-")[1];
    return countryCode
      ? (countryCode.toUpperCase() as CountryCodes)
      : undefined;
  };
  const getCountryFromDomain = (): CountryCodes | undefined => {
    const domainToCountry: {
      [key: string]: string | undefined;
    } = {
      "de": "DE",
      "at": "AT",
      "ch": "CH",
      "uk": "GB",
      "co.uk": "GB",
      "com": undefined,
      "se": "SE",
      "no": "NO",
      "dk": "DK",
      "fi": "FI",
      "fr": "FR",
      "be": "BE",
      "nl": "NL",
      "it": "IT",
      "es": "ES",
      "pt": "PT",
      "pl": "PL",
      "cz": "CZ",
      "sk": "SK",
      "hu": "HU",
    };
    const domain = window.location.hostname;
    const domainParts = domain.split(".");
    const domainPart = domainParts[domainParts.length - 1];
    return (domainPart ? domainToCountry[domainPart] : undefined) as
      | CountryCodes
      | undefined;
  };
  const getCountryFromPagePath = (): CountryCodes | undefined => {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const country = pathParts[1];
    return country?.toUpperCase() as CountryCodes | undefined;
  };
  return (
    getCountryCodeFromHtmlTag() ||
    getCountryFromDomain() ||
    getCountryFromPagePath()
  );
}

function handleOptimizePageScript(optimizeId: string | undefined): void {
  if (!optimizeId) {
    return;
  }
  window.sovPageStatus.loadedOptimize = true;
  const getbackDomain = "https://www.sovopt.com/";
  const script = document.createElement("script");
  script.src = `${getbackDomain}${optimizeId}`;
  script.type = "application/javascript";
  document.body.appendChild(script);
}

void main();
