import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.5

export let genRouter = {
  home: {
    name: "home",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  content: {
    name: "content",
    raw: "content",
    path: () => `/content`,
    go: () => switchPath(`/content`),
  },
  dropdownArea: {
    name: "dropdown-area",
    raw: "dropdown-area",
    path: () => `/dropdown-area`,
    go: () => switchPath(`/dropdown-area`),
  },
  dropdownMenu: {
    name: "dropdown-menu",
    raw: "dropdown-menu",
    path: () => `/dropdown-menu`,
    go: () => switchPath(`/dropdown-menu`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

export type GenRouterTypeMain =
  | GenRouterTypeTree["home"]
  | GenRouterTypeTree["content"]
  | GenRouterTypeTree["dropdownArea"]
  | GenRouterTypeTree["dropdownMenu"]
  | GenRouterTypeTree["$"];

export interface GenRouterTypeTree {
  home: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
  content: {
    name: "content";
    params: {};
    query: {};
    next: null;
  };
  dropdownArea: {
    name: "dropdown-area";
    params: {};
    query: {};
    next: null;
  };
  dropdownMenu: {
    name: "dropdown-menu";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
