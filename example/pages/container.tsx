import React from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { row, fullHeight, fullscreen, expand } from "@jimengio/flex-styles";

import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import DemoDropdownArea from "./demo-dropdown-area";
import DemoDropdownAreaScroll from "./demo-dropdown-area-scroll";
import DemoDropdownMenu from "./demo-dropdown-menu";
import DemoContentInput from "./demo-content-input";
import DemoMenuTree from "./demo-menu-tree";
import DemoDropdownTree from "./demo-dropdown-tree";
import DemoAjustingPosition from "./demo-ajusting-position";
import DemoFollowWheel from "./demo-follow-wheel";
import DemoHooksArea from "./demo-hooks-area";
import DemoCustomTrigger from "./demo-custom-trigger";

const renderChildPage = (routerTree: GenRouterTypeMain) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case "dropdown-area":
        return <DemoDropdownArea />;
      case "dropdown-area-scroll":
        return <DemoDropdownAreaScroll />;
      case "dropdown-menu":
        return <DemoDropdownMenu />;
      case "content-input":
        return <DemoContentInput />;
      case "menu-tree":
        return <DemoMenuTree />;
      case "dropdown-tree":
        return <DemoDropdownTree />;
      case "ajusting-position":
        return <DemoAjustingPosition />;
      case "follow-wheel":
        return <DemoFollowWheel />;
      case "hooks-area":
        return <DemoHooksArea />;
      case "custom-trigger":
        return <DemoCustomTrigger />;
      default:
        return <HashRedirect to={genRouter.dropdownArea.path()} noDelay />;
    }
  }
  return <div>NOTHING</div>;
};

let items: ISidebarEntry[] = [
  {
    title: "Dropdown area",
    path: genRouter.dropdownArea.name,
  },
  {
    title: "Hooks for dropdown area",
    path: genRouter.hooksArea.name,
  },
  {
    title: "Dropdown area scroll",
    path: genRouter.dropdownAreaScroll.name,
  },
  {
    title: "Custom trigger",
    path: genRouter.customTrigger.name,
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
  {
    title: "Adjusting position",
    path: genRouter.ajustingPosition.name,
  },
  {
    title: "Follow Wheel",
    path: genRouter.followWheel.name,
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
