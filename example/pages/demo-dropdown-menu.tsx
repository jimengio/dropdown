import React, { FC, useState } from "react";
import { css } from "emotion";
import MenuList, { IMenuListItem } from "../../src/menu-list";
import DropdownMenu from "../../src/dropdown-menu";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";

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

let DemoDropdownMenu: FC<{}> = (props) => {
  let [selected, setSelected] = useState<string>(null);
  let [demoData, setDemoData] = useState<IMenuListItem[]>(items);

  /** Methods */
  /** Effects */
  /** Renderers */

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
        <DocSnippet code={codeDisabled} />
        <DropdownMenu disabled value={selected} items={items} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} />
      </DocDemo>
      <DocDemo title="带搜索框的下拉菜单" link={link}>
        <div className={styleMenuArea}>
          <DocSnippet code={codeSearchMenu} />

          <DropdownMenu
            showSearch
            allowClear
            className={styleShortInput}
            value={selected}
            items={demoData}
            onSelect={(value) => setSelected(value as string)}
            placeholder={"请选择"}
            searchPlaceholder={"搜索内容"}
            onSearch={(val) => {
              if (!val) return setDemoData(items);
              setDemoData(demoData.filter((d) => `${d.title}`.indexOf(val) > -1));
            }}
          />
        </div>
      </DocDemo>
      <DocDemo title={"Empty locale"} link={link}>
        <DocSnippet code={codeEmpty} />
        <DropdownMenu value={selected} items={[]} onSelect={(value) => setSelected(value as string)} placeholder={"请选择"} emptyLocale={"没有数据"} />
      </DocDemo>
      <DocDemo title={"自定义 placeholder 样式"} link={link}>
        <DocSnippet code={codeEmptyStyle} lang="jsx" />
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
        <DocBlock content={contentValue} />
        <DocSnippet code={codeValue} />
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

      <DocDemo title="Menu example" link={link}>
        <DocSnippet code={codeMenu} />

        <div className={styleMenuArea}>
          <MenuList value={selected} items={items} onSelect={(value) => setSelected(value as string)} />
        </div>
      </DocDemo>

      <DocDemo title="Menu with styles" link={link}>
        <div className={styleMenuArea}>
          <MenuList value={selected} items={itemsWithCustom} onSelect={(value) => setSelected(value as string)} />

          <DocSnippet code={codeCustom} />
        </div>
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
  width: 220px;
`;

let stylePlaceholder = css`
  color: red;
`;

let styleInputArea = css`
  width: 240px;
`;

let styleHasBorder = css`
  margin-top: 8px;
  border-top: 1px solid #aaa;
`;

let link = "https://github.com/jimengio/dropdown/blob/master/example/pages/demo-dropdown-menu.tsx";

let codeCustom = `
let itemsWithCustom = [
  ...items,
  {
    value: "2",
    title: "一些自定义样式",
    className: styleHasBorder,
  },
];

let styleHasBorder = css\`
  margin-top: 8px;
  border-top: 1px solid #aaa;
\`;
`;

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

<DropdownMenu
  allowClear
  className={styleShortInput}
  value={selected}
  items={items}
  onSelect={(value) => setSelected(value as string)}
  placeholder={"请选择"}
/>
`;

let codeDisabled = `
<DropdownMenu
  disabled
  placeholder={"请选择"}
  value={selected}
  items={items}
  onSelect={(value) => setSelected(value as string)}
/>
`;

let codeEmpty = `
<DropdownMenu
  emptyLocale={"没有数据"}
  value={selected}
  items={[]}
  onSelect={(value) => setSelected(value as string)}
  placeholder={"请选择"}
/>
`;

let codeEmptyStyle = `
<DropdownMenu
  value={selected}
  items={items}
  onSelect={(value) => setSelected(value as string)}
  placeholder={"请选择"}
  emptyLocale={"没有数据"}
  placeholderClassName={stylePlaceholder}
/>`;

let codeValue = `
<DropdownMenu
  value={selected}
  items={items}
  onSelect={(value) => setSelected(value as string)}
  className={styleInputArea}
  allowClear
  renderValue={(node) => {
    return \`CUSTOM \${selected}\`;
  }}
/>`;

let codeMenu = `
<MenuList value={selected} items={items} onSelect={(value) => setSelected(value as string)} />
`;

let contentValue = `
\`renderValue\` 属性, 可以用来重新定义 value 位置现实的具体内容. 幕刃情况下直接显示 value.
`;

let codeSearchMenu = `
<DropdownMenu
  showSearch
  allowClear
  className={styleShortInput}
  value={selected}
  items={demoData}
  onSelect={(value) => {}}
  placeholder={"请选择"}
  searchPlaceholder={"搜索内容"}
  onSearch={(val) => {}}
/>
`;
