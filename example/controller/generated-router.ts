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
  contentInput: {
    name: "content-input",
    raw: "content-input",
    path: () => `/content-input`,
    go: () => switchPath(`/content-input`),
  },
  menuTree: {
    name: "menu-tree",
    raw: "menu-tree",
    path: () => `/menu-tree`,
    go: () => switchPath(`/menu-tree`),
  },
  dropdownTree: {
    name: "dropdown-tree",
    raw: "dropdown-tree",
    path: () => `/dropdown-tree`,
    go: () => switchPath(`/dropdown-tree`),
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
  | GenRouterTypeTree["dropdownArea"]
  | GenRouterTypeTree["dropdownMenu"]
  | GenRouterTypeTree["contentInput"]
  | GenRouterTypeTree["menuTree"]
  | GenRouterTypeTree["dropdownTree"]
  | GenRouterTypeTree["$"];

export interface GenRouterTypeTree {
  home: {
    name: "home";
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
  contentInput: {
    name: "content-input";
    params: {};
    query: {};
    next: null;
  };
  menuTree: {
    name: "menu-tree";
    params: {};
    query: {};
    next: null;
  };
  dropdownTree: {
    name: "dropdown-tree";
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
