import React, { FC } from "react";
import { css, cx } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import DropdownArea from "../../src/dropdown-area";

let DemoAjustingPosition: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Detect edge">
        <DocBlock content={contentEdge} />
        <DocSnippet code={codeEdge} />
        <DropdownArea guessHeight={80} className={cx(styleTrigger)} width={400} renderContent={(onClose) => "Some content"} hideClose>
          <div>detect edge</div>
        </DropdownArea>
      </DocDemo>

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

let codeEdge = `
<DropdownArea
  guessHeight={80}
  className={cx(styleTrigger)}
  width={400}
  hideClose
  renderContent={(onClose) => "Some content"}
  >
  <div>detect edge</div>
</DropdownArea>
`;

let content = `
\`adjustingPosition\` 属性可以开启位置调整, 如果发现超出屏幕, 自动调整位置.
监听的是 wheel 事件, 根据触发频率对效果影响, 可能对性能有影响.
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

let contentEdge = `
组件默认不处理弹层在屏幕边缘的情况, 组件默认对于弹出内容的高度没有准确的值.
一个临时方案是通过 \`guessHeight\` 属性赋予一个估计值, 给组件计算避免超出可见区域.

设定了 \`width\` 的情况下, 横向可以检测是否超出屏幕区域.
`;
