import React, { FC, ReactNode } from "react";
import { css, cx } from "emotion";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { rowParted, center, expand } from "@jimengio/flex-styles";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";

let ContentInput: FC<{
  content: ReactNode;
  className?: string;
  placeholder?: string;
  emptyLocale?: string;
  disabled?: boolean;
  allowClear?: boolean;
  placeholderClassName?: string;
  onClear?: () => void;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(rowParted, styleContainer, props.disabled ? styleDisabled : null, props.className)}>
      <span className={cx(styleValue)}>
        {props.content || <span className={cx(stylePlaceholder, props.placeholderClassName)}>{props.placeholder || "Please select"}</span>}
      </span>
      <FaIcon name={EFaIcon.AngleDown} className={styleIcon} />
      {props.allowClear && props.content != null ? (
        <JimoIcon
          name={EJimoIcon.slimCross}
          className={styleRemoveIcon}
          onClick={(event) => {
            event.stopPropagation();
            props.onClear();
          }}
        />
      ) : null}
    </div>
  );
});

export default ContentInput;

let styleContainer = css`
  line-height: 32px;
  padding: 0 12px;
  border: 1px solid hsl(0, 0%, 85%);
  border-radius: 4px;
  min-width: 120px;
  display: inline-flex;
  position: relative;
  background-color: white;

  &:hover i.jimo {
    opacity: 1;
  }
`;

let stylePlaceholder = css`
  color: hsl(0, 0%, 75%);
  user-select: none;
`;

let styleIcon = css`
  color: hsla(0, 0%, 0%, 0.25);
  user-select: none;
  margin-left: 8px;
  font-size: 16px;
`;

let styleRemoveIcon = css`
  font-size: 16px;
  position: absolute;
  right: 9px;
  background-color: white;
  color: hsla(0, 0%, 0%, 0.25);
  opacity: 0;
  cursor: pointer;

  &:hover {
    color: hsla(0, 0%, 0%, 0.5);
    opacity: 1;
  }
`;

let styleDisabled = css`
  background-color: hsl(0, 0%, 96%);
  cursor: not-allowed;
  color: hsla(0, 0%, 0%, 0.25);
`;

let styleValue = css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
