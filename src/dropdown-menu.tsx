import React, { FC, useMemo } from "react";
import { css, cx } from "emotion";
import DropdownArea from "./dropdown-area";
import MenuList, { MenuValue, IMenuListItem } from "./menu-list";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { rowParted, center, expand } from "@jimengio/flex-styles";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import ContentInput from "./content-input";

let DropdownMenu: FC<{
  value: MenuValue;
  items: IMenuListItem[];
  onSelect: (value: MenuValue) => void;
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  emptyLocale?: string;
  placeholderClassName?: string;
  menuWidth?: number;
  disabled?: boolean;
  allowClear?: boolean;
}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  let selectedItem = props.items.find((item) => item.value === props.value);

  let inputElement = useMemo(
    () => (
      <ContentInput
        disabled={props.disabled}
        className={props.className}
        content={selectedItem?.title}
        placeholderClassName={props.placeholderClassName}
        placeholder={props.placeholderClassName}
        allowClear={props.allowClear}
        onClear={() => {
          props.onSelect(null);
        }}
      />
    ),
    [props.disabled, props.value, props.items]
  );

  if (props.disabled) {
    return inputElement;
  }

  return (
    <DropdownArea
      hideClose={true}
      width={props.menuWidth}
      cardClassName={styleMenu}
      renderContent={(onClose) => {
        if (props.items.length === 0) {
          return <div className={cx(center, styleEmptyList)}>{props.emptyLocale || "No data"}</div>;
        }
        return (
          <MenuList
            value={props.value}
            items={props.items}
            className={props.menuClassName}
            itemClassName={props.itemClassName}
            onSelect={(value) => {
              onClose();
              props.onSelect(value);
            }}
          />
        );
      }}
    >
      {inputElement}
    </DropdownArea>
  );
};

export default DropdownMenu;

let styleMenu = css`
  min-height: 8px;
`;

let styleEmptyList = css`
  font-size: 12px;
  color: hsl(0, 0%, 75%);
  user-select: none;
  padding: 12px;
`;
