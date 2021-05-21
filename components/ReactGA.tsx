import ReactGA from "react-ga";
import endpoints from "../config/endpoints";
import Router from "next/router";

export const initGA = () => {
  if (endpoints.GAid && process.browser) {
    ReactGA.initialize(endpoints.GAid, { debug: !process.env.production });
    logPageViews();
  }
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) ReactGA.event({ category, action, label });
};

export const logException = (description = "", fatal = false) => {
  if (description) ReactGA.exception({ description, fatal });
};

export function logPageViews() {
  logPageView();
  Router.events.on("routeChangeComplete", () => logPageView());
}
