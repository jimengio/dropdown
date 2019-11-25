import React, { FC, useState, ReactNode } from "react";
import { css, cx } from "emotion";
import { rowMiddle, center } from "@jimengio/flex-styles";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";

let countAll = (xs: IMenuTreeItem[]) => {
  if (xs == null) {
    return 0;
  }
  return xs
    .map((x) => {
      return 1 + countAll(x.children);
    })
    .reduce((x, y) => x + y, 0);
};

export interface IMenuTreeItem {
  key?: string;
  value: string;
  display: ReactNode;
  children?: IMenuTreeItem[];
}

let MenuTreeItem: FC<{
  selected: string;
  data: IMenuTreeItem;
  onChange: (vaule: string) => void;
  className?: string;
  itemClassName?: string;
  level?: number;
}> = React.memo((props) => {
  let [folded, setFolded] = useState(false);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let children = props.data.children || [];
  let childrenSize = countAll(children);

  return (
    <div>
      <div
        className={cx(rowMiddle, styleItem, props.selected === props.data.value ? styleSelected : null, props.itemClassName)}
        style={{ paddingLeft: props.level * 16 + 6 }}
        onClick={() => {
          props.onChange(props.data.value);
        }}
      >
        <div className={cx(center, stylePrepend)}>
          {children.length == 0 ? null : folded ? (
            <FaIcon
              name={EFaIcon.CaretRight}
              onClick={(event) => {
                event.stopPropagation();
                setFolded(false);
              }}
            />
          ) : (
            <FaIcon
              name={EFaIcon.CaretDown}
              onClick={(event) => {
                event.stopPropagation();
                setFolded(true);
              }}
            />
          )}
        </div>
        {props.data.display}
      </div>
      <div className={cx(styleMenuContainer, folded ? styleFolded : null)}>
        {folded ? (
          <div className={stylePlaceholder} style={{ height: 38 * childrenSize }}></div>
        ) : (
          children.map((child, idx) => {
            return (
              <MenuTreeItem
                key={idx}
                data={child}
                selected={props.selected}
                onChange={props.onChange}
                level={props.level + 1}
                itemClassName={props.itemClassName}
              />
            );
          })
        )}
      </div>
    </div>
  );
});

let MenuTree: FC<{
  selected: string;
  data: IMenuTreeItem[];
  onChange: (vaule: string) => void;
  className?: string;
  itemClassName?: string;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(styleContainer, props.className)}>
      {props.data.map((item, idx) => {
        return <MenuTreeItem key={idx} data={item} itemClassName={props.className} level={0} selected={props.selected} onChange={props.onChange} />;
      })}
    </div>
  );
});

export default MenuTree;

let styleItem = css`
  font-size: 14px;
  line-height: 36px;
  border-bottom: 1px solid hsla(0, 0%, 91%, 1);
  cursor: pointer;

  :hover {
    background-color: hsla(221, 100%, 61%, 0.1);
  }
`;

let stylePrepend = css`
  width: 16px;
  font-size: 18px;
  margin-right: 4px;
  color: hsla(0, 0%, 59%, 1);

  :hover {
    color: hsla(200, 80%, 59%, 1);
  }
`;

let styleMenuContainer = css`
  transition-duration: 240ms;
  transition-property: max-height opacity;
  max-height: 1000px;
  opacity: 1;
`;

let styleFolded = css`
  max-height: 0px;
  opacity: 0;
`;

let stylePlaceholder = css`
  height: 40px;
`;

let styleSelected = css`
  background-color: hsla(221, 100%, 61%, 0.2);

  :hover {
    background-color: hsla(221, 100%, 61%, 0.2);
  }
`;

let styleContainer = css`
  padding: 0 8px;
`;
