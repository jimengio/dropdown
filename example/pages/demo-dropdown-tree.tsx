import React, { FC, useState } from "react";
import { css } from "emotion";
import DropdownTree from "../../src/dropdown-tree";
import { DocDemo, DocSidebar, DocSnippet } from "@jimengio/doc-frame";
import { treeData } from "./data-dropdown-tree";

let code = `
let treeData = [
  {
    value: 'a',
    display: 'A',
    children: []
  }
];

<DropdownTree
  value={selected}
  items={treeData}
  className={styleArea}
  placeholder={"请选择"}
  cardClassName={styleMenu}
  allowClear
  onSelect={(value) => {
    setSelected(value);
  }}
/>

let styleMenu = css\`
  min-width: 240px;
\`;

let styleArea = css\`
  width: 200px;
\`;
`;

let DemoDropdownTree: FC<{}> = React.memo((props) => {
  let [selected, setSelected] = useState(null as string);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Dropdown Tree">
        <DropdownTree
          value={selected}
          items={treeData}
          className={styleArea}
          placeholder={"请选择"}
          cardClassName={styleMenu}
          allowClear
          onSelect={(value) => {
            setSelected(value);
          }}
        />
        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default DemoDropdownTree;

let styleMenu = css`
  min-width: 240px;
`;

let styleArea = css`
  width: 200px;
`;
