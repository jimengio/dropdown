import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { row, fullHeight, fullscreen, expand } from "@jimengio/flex-styles";

import Home from "./home";
import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import DemoDropdownArea from "./demo-dropdown-area";
import DemoDropdownMenu from "./demo-dropdown-menu";
import DemoContentInput from "./demo-content-input";
import DemoMenuTree from "./demo-menu-tree";
import DemoDropdownTree from "./demo-dropdown-tree";

const renderChildPage = (routerTree: GenRouterTypeMain) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case "home":
        return <Home />;
      case "dropdown-area":
        return <DemoDropdownArea />;
      case "dropdown-menu":
        return <DemoDropdownMenu />;
      case "content-input":
        return <DemoContentInput />;
      case "menu-tree":
        return <DemoMenuTree />;
      case "dropdown-tree":
        return <DemoDropdownTree />;
      default:
        return (
          <HashRedirect to={genRouter.home.name} delay={2}>
            2s to redirect
          </HashRedirect>
        );
    }
  }
  return <div>NOTHING</div>;
};

let items: ISidebarEntry[] = [
  {
    title: "Home",
    path: genRouter.home.name,
  },
  {
    title: "Dropdown area",
    path: genRouter.dropdownArea.name,
  },
  {
    title: "Dropdown menu",
    path: genRouter.dropdownMenu.name,
  },
  {
    title: "Content input",
    path: genRouter.contentInput.name,
  },
  {
    title: "Menu tree",
    path: genRouter.menuTree.name,
  },
  {
    title: "Dropdown tree",
    path: genRouter.dropdownTree.name,
  },
];

let onSwitch = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target) {
    target.go();
  } else {
    console.error("Unknown path", path);
  }
};

export default (props: { router: GenRouterTypeMain }) => {
  return (
    <div className={cx(row, fullscreen, styleContainer)}>
      <DocSidebar title="Dropdown" currentPath={props.router.name} items={items} onSwitch={(item) => onSwitch(item.path)} />
      <div style={{ width: 20 }} />
      <div className={cx(expand, stylePage)}>{renderChildPage(props.router)}</div>
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

let stylePage = css`
  padding: 40px;
`;
