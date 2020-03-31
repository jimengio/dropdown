import React, { FC, useMemo, ReactNode, useState } from "react";
import { css, cx } from "emotion";
import DropdownArea from "./dropdown-area";
import MenuList, { MenuValue, IMenuListItem } from "./menu-list";
import FaIcon, { EFaIcon } from "@jimengio/fa-icons";
import { rowParted, center, rowCenter, expand, row, Space } from "@jimengio/flex-styles";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import ContentInput from "./content-input";
import { useDebouncedCallback } from "use-debounce";

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
  renderValue?: (x: any) => ReactNode;
  followWheel?: boolean;

  /**
   * open search
   */
  showSearch?: boolean;
  onSearch?: (text: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  let selectedItem = props.items.find((item) => item.value === props.value);
  let content = selectedItem?.title;

  if (props.value != null && props.renderValue != null) {
    content = props.renderValue(content);
  }

  let [active, setActive] = useState<boolean>(false);
  let [searchValue, setSearchValue] = useState<string>("");

  let inputElement = useMemo(
    () => (
      <ContentInput
        disabled={props.disabled}
        className={props.className}
        content={content}
        isActive={active}
        placeholderClassName={props.placeholderClassName}
        placeholder={props.placeholder}
        allowClear={props.allowClear}
        onClear={() => {
          props.onSelect(null);
        }}
      />
    ),
    [props.disabled, props.value, props.items, active]
  );

  if (props.disabled) {
    return inputElement;
  }

  const [debouncedChange] = useDebouncedCallback((v, e) => {
    e.persist();
    props.onSearch && props.onSearch(v, e);
  }, 600);

  let onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    debouncedChange(val, event);
    setSearchValue(val);
  };

  let renderSearch = () => {
    return (
      <div className={cx(styleSearch)}>
        <input
          style={{ paddingRight: searchValue.length > 0 ? 50 : 30 }}
          value={searchValue}
          placeholder={props.searchPlaceholder}
          className={styleSearchInput}
          onChange={onSearchChange}
        />
        <span className={cx(styleSearchIcon, rowCenter)}>
          {searchValue.length > 0 ? (
            <>
              <JimoIcon
                onClick={(event) => {
                  event.stopPropagation();
                  setSearchValue("");
                  props.onSearch && props.onSearch("", null);
                }}
                name={EJimoIcon.crossEmbossed}
                className={styleSearchClearIcon}
              />
              <Space width={2} />
            </>
          ) : null}
          <JimoIcon name={EJimoIcon.search} />
        </span>
      </div>
    );
  };

  return (
    <DropdownArea
      hideClose={true}
      width={props.menuWidth}
      cardClassName={styleMenu}
      adjustingPosition
      followWheel={props.followWheel}
      onExpand={(expand: boolean) => {
        setActive(expand);
      }}
      renderContent={(onClose) => {
        if (props.items.length === 0) {
          return (
            <>
              {props.showSearch ? renderSearch() : null}
              <div className={cx(center, styleEmptyList)}>{props.emptyLocale || "No data"}</div>
            </>
          );
        }
        return (
          <>
            {props.showSearch ? renderSearch() : null}
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
          </>
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

let styleSearch = css`
  position: relative;
  padding: 8px 12px;
`;

let styleSearchInput = css`
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  border: 1px solid hsla(0, 0%, 91%, 1);
  padding-left: 12px;
  font-size: 14px;
  color: hsla(0, 0%, 20%, 1);

  :hover,
  :focus {
    outline: none;
    border-color: #3674ff !important;
    box-shadow: 0 0 1px #0635ab !important;
  }
  :active {
    box-shadow: none;
  }
  ::placeholder {
    color: hsla(0, 0%, 59%, 1);
  }
`;

let styleSearchIcon = css`
  position: absolute;
  font-size: 23px;
  right: 15px;
  top: 13px;
  color: hsla(0, 0%, 59%, 1);
`;

let styleSearchClearIcon = css`
  color: rgba(0, 0, 0, 0.25);
  font-size: 15px;
  cursor: pointer;
`;
