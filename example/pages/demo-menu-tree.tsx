import React, { FC, useState } from "react";
import { css } from "emotion";
import { DocDemo } from "@jimengio/doc-frame";
import MenuTree, { IMenuTreeItem } from "../../src/menu-tree";
import { treeData } from "./data-dropdown-tree";

let DemoMenuTree: FC<{}> = React.memo((props) => {
  let [selected, setSelected] = useState(null as string);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div>
      <DocDemo title="Menu Tree">
        <MenuTree
          selected={selected}
          data={treeData}
          onChange={(value) => {
            console.log("selecting", value);
            setSelected(value);
          }}
        />
      </DocDemo>
    </div>
  );
});

export default DemoMenuTree;
