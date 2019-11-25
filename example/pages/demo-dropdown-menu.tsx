import React, { FC, useState } from "react";
import { css } from "emotion";
import MenuList, { IMenuListItem } from "../../src/menu-list";
import DropdownMenu from "../../src/dropdown-menu";
import { DocDemo } from "@jimengio/doc-frame";

let link = "https://github.com/jimengio/dropdown/blob/master/example/pages/demo-dropdown-menu.tsx";

let DemoDropdownMenu: FC<{}> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  /** Methods */
  /** Effects */
  /** Renderers */

  let items: IMenuListItem[] = [
    {
      value: "a",
      title: "A",
    },
    {
      value: "b",
      title: "使用 optionLabelProp 指定回填到选择框的 Option 属性。uses B",
    },
    {
      value: "c",
      title: "多选，从已有条目中选择。",
    },
    {
      value: "d",
      title: "弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。",
    },
  ];

  return (
    <div className={styleContainer}>
      <DocDemo title="Menu example" link={link}>
        <div className={styleMenuArea}>
          <MenuList value={selected} items={items} onSelect={(value) => setSelected(value as string)} />
        </div>
      </DocDemo>

      <DocDemo title="Dropdown menu" link={link}>
        <DropdownMenu
          allowClear
          className={styleShortInput}
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          placeholder={"请选择"}
        />
      </DocDemo>

      <DocDemo title="Disabled menu" link={link}>
        <DropdownMenu disabled value={selected} items={items} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} />
      </DocDemo>

      <DocDemo title={"Empty locale"} link={link}>
        <DropdownMenu value={selected} items={[]} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} emptyLocale={"没有数据"} />
      </DocDemo>

      <DocDemo title={"自定义 placeholder 样式"} link={link}>
        <DropdownMenu
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          placeholder={"请选择"}
          emptyLocale={"没有数据"}
          placeholderClassName={stylePlaceholder}
        />
      </DocDemo>

      <DocDemo title={"自定义显示内容"} link={link}>
        <DropdownMenu
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          className={styleInputArea}
          allowClear
          renderValue={(node) => {
            return `CUSTOM ${selected}`;
          }}
        />
      </DocDemo>
    </div>
  );
};

export default DemoDropdownMenu;

let styleContainer = null;

let styleMenuArea = css`
  width: 200px;
`;

let styleShortInput = css`
  width: 160px;
`;

let stylePlaceholder = css`
  color: red;
`;

let styleInputArea = css`
  width: 240px;
`;
