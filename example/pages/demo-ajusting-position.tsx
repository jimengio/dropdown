import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import DropdownArea from "../../src/dropdown-area";

let content = `
\`adjustingPosition\` 属性可以开启位置调整, 如果发现超出屏幕, 自动调整位置. 可能对性能有影响.
`;

let code = `
<DropdownArea
  className={styleTrigger}
  adjustingPosition
  renderContent={(onClose) => {
    return <div style={{ height: 240 }}>No close button</div>;
  }}
  hideClose
>
  Auto adjusting position
</DropdownArea>
`;

let DemoAjustingPosition: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Adjusting Position">
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <DropdownArea
          className={styleTrigger}
          adjustingPosition
          renderContent={(onClose) => {
            return <div style={{ height: 240 }}>No close button</div>;
          }}
          hideClose
        >
          Auto adjusting position
        </DropdownArea>
      </DocDemo>
    </div>
  );
});

export default DemoAjustingPosition;

let styleTrigger = css`
  background-color: #ddd;
  margin: 16px;
  padding: 8px;
`;
