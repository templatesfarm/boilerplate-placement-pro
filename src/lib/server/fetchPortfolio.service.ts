import {
  PortfolioType,
  setPortfolioState,
  updateState,
} from "@/store/usePortfolioStore";
import { serverRoutes } from "../contants";
import { headers } from "next/headers";

export const getBaseUrl = (domain: string) => {
  return `${domain.includes("localhost") ? "http" : "https"}://${domain}`;
};

interface PortfolioSeoType {
  portfolio: PortfolioType;
  url: string;
}

export async function fetchPortfolioDetails() {
  try {
    const headersList = headers();
    const domain = headersList.get("host") || "";
    const baseUrl = getBaseUrl(domain) || "";
    console.log("🚀 ~ fetchPortfolioDetails ~ baseUrl:", baseUrl);
    const response = await fetch(`${baseUrl}${serverRoutes.PORTFOLIO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });
    console.log("🚀 ~ fetchPortfolioDetails ~ response:", response);

    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ fetchPortfolioDetails ~ data:", data);
      return {
        portfolio: data as PortfolioType,
        url: baseUrl,
      } as PortfolioSeoType;
    } else {
      setPortfolioState((state) => ({
        ...state,
        isLoading: false,
        error: "Unable to Fetch Data after authentication",
        portfolio: {} as PortfolioType,
      }));
    }
  } catch (err) {
    const error = err as Error;
    setPortfolioState((state) => ({
      ...state,
      isLoading: false,
      error: error.message,
      portfolio: {} as PortfolioType,
    }));
  }
  return {} as PortfolioSeoType;
}
