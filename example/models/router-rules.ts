import { IRouteRule } from "@jimengio/ruled-router";

export const routerRules: IRouteRule[] = [
  { path: "home" },
  { path: "content" },
  {
    path: "dropdown-area",
  },
  {
    path: "dropdown-menu",
  },
  { path: "", name: "home" },
];
