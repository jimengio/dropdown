import React, { FC, useState } from "react";
import { css } from "emotion";
import MenuList, { IMenuListItem } from "../../src/menu-list";
import DropdownSelect from "../../src/dorpdown-select";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";

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

  let itemsWithCustom = [
    ...items,
    {
      value: "2",
      title: "一些自定义样式",
      className: styleHasBorder,
    },
  ];

  return (
    <div className={styleContainer}>
      <DocDemo title="Dropdown menu" link={link}>
        <DocSnippet code={codeMenuCustom} />
        <DropdownSelect
          allowClear
          className={styleShortInput}
          value={selected}
          items={items}
          onSelect={(value) => setSelected(value as string)}
          placeholder={"请选择"}
        />
      </DocDemo>
    </div>
  );
};

export default DemoDropdownMenu;

let styleContainer = null;

let styleShortInput = css`
  width: 220px;
`;

let styleHasBorder = css`
  margin-top: 8px;
  border-top: 1px solid #aaa;
`;

let link = "https://github.com/jimengio/dropdown/blob/master/example/pages/demo-dropdown-menu.tsx";

let codeMenuCustom = `
let items: IMenuListItem[] = [
  { value: "a", title: "A" },
  { value: "b", title: "使用 optionLabelProp 指定回填到选择框的 Option 属性。uses B" },
  { value: "c", title: "多选，从已有条目中选择。" },
  {
    value: "d",
    title: "弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。",
  },
];

<DropdownSelect
  allowClear
  className={styleShortInput}
  value={selected}
  items={items}
  onSelect={(value) => setSelected(value as string)}
  placeholder={"请选择"}
/>
`;
