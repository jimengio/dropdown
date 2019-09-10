import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

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
  _: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};
