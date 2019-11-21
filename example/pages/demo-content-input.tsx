import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet } from "@jimengio/doc-frame";
import ContentInput from "../../src/content-input";

let code = `
import { ContentInput } from "@jimengio/dropdown";

<ContentInput content="TODO" />
`;

let codeClear = `
<ContentInput content="TODO" allowClear />
`;

let codeUndefined = `
<ContentInput content={undefined} allowClear />
`;

let DemoContentInput: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Content Input">
        <ContentInput content="TODO" />
        <DocSnippet code={code} />

        <ContentInput content="TODO" allowClear />
        <DocSnippet code={codeClear} />

        <ContentInput content={undefined} allowClear />
        <DocSnippet code={codeUndefined} />
      </DocDemo>
    </div>
  );
});

export default DemoContentInput;
