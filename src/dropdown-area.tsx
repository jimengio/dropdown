import { css, cx } from "emotion";
import { CSSTransition } from "react-transition-group";
import EventEmitter from "eventemitter3";

let transitionDurationEnter = 120;
let transitionDurationExit = 300;
let relativeOffset = 4; /** 菜单相对弹出位置有一个上下偏差, 以免形成遮挡 */
let containOffset = 0; /** 菜单相对弹出位置有一个左右偏差, 以便看起来不要过于死板 */
let containerName = "meson-dropdown-container";

import React, { FC, useEffect, useState, ReactNode, CSSProperties, useRef, Ref } from "react";
import ReactDOM from "react-dom";
import { rowParted, column } from "@jimengio/flex-styles";
import { checkIfDomTreeContains } from "./dom";

type FuncVoid = () => void;

interface IUseDropdownAreaProps {
  title?: string;
  /** 弹出的卡片的样式 */
  cardClassName?: string;
  /** 菜单对准右侧, 从右往左弹出 */
  alignToRight?: boolean;
  width?: number;
  /** 不一定精确, 根据区域检测如果超出屏幕, 菜单将上移放在屏幕边缘 */
  guessHeight?: number;
  renderContent: (closeMenu: FuncVoid) => ReactNode;
  hideClose?: boolean;
  // 设置弹出卡片样式
  cardStyle?: CSSProperties;

  adjustingPosition?: true;

  /** 强行监听 wheel 事件, 重新设置弹出菜单的位置 */
  followWheel?: boolean;

  /** 监听打开、关闭 */
  onExpand?: (visible: boolean) => void;
}

interface IProps extends IUseDropdownAreaProps {
  /** trigger 区域的样式 */
  className?: string;
  style?: CSSProperties;

  /** optional, by default, the area responds to click event,
   * there are cases we want to control how the menu is created
   */
  renderTrigger?: (openMenu: FuncVoid, closeMenu: FuncVoid) => ReactNode;
}

interface IPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export let useDropdownArea = (props: IUseDropdownAreaProps) => {
  let [visible, setVisible] = useState(false);
  let [position, setPosition] = useState({} as IPosition);
  let [inheritedWidth, setInheritedWidth] = useState(null as number);

  let el = useRef<HTMLDivElement>(null);
  let triggerEl = useRef<HTMLDivElement>(null);
  let cardEl = useRef<HTMLDivElement>(null);
  let openTimeRef = useRef(0);
  let containerElRef = useRef<HTMLDivElement>();

  /** Methods */

  let handlePopPosition = () => {
    let rect = triggerEl.current.getBoundingClientRect();

    // 如果计算宽度超出显示区域, 往左弹出
    let almostOut = false;
    let reachingBottom = false;
    if (props.width != null) {
      almostOut = rect.left + props.width > window.innerWidth;
    }
    if (props.guessHeight != null) {
      reachingBottom = rect.bottom + props.guessHeight > window.innerHeight;
    }

    if (props.alignToRight || almostOut) {
      setVisible(true);
      setInheritedWidth(rect.width);
      setPosition({
        top: reachingBottom ? null : rect.bottom + relativeOffset,
        right: Math.max(window.innerWidth - rect.right - containOffset, relativeOffset),
        bottom: reachingBottom ? 8 : null,
      });
    } else {
      setVisible(true);
      setInheritedWidth(rect.width);
      setPosition({
        top: reachingBottom ? null : rect.bottom + relativeOffset,
        left: Math.max(rect.left - containOffset, relativeOffset),
        bottom: reachingBottom ? 8 : null,
      });
    }
  };

  let openMenu = () => {
    if (visible) {
      return;
    }

    handlePopPosition();

    // 记录打开时间, 打开过程关闭点击响应
    openTimeRef.current = Date.now();
  };

  let onClickClose = (event) => {
    // 点击在卡片内, 不要关闭菜单
    let insidePopCard = checkIfDomTreeContains(containerElRef.current, event.target);
    if (insidePopCard) {
      return;
    }

    // 打开过程当中不响应点击事件
    if (Date.now() - openTimeRef.current > transitionDurationEnter) {
      setVisible(false);
    }
  };

  let onUserClose = () => {
    setVisible(false);
  };

  /** Effects */

  if (el.current == null) {
    el.current = document.createElement("div");
  }

  useEffect(() => {
    let root = document.querySelector(`.${containerName}`);

    if (root == null) {
      console.error(`Required a container element in body: <div class="${containerName}" />`);
      return;
    }

    root.appendChild(el.current);

    window.addEventListener("click", onClickClose);

    return () => {
      let root = document.querySelector(`.${containerName}`);

      if (root == null) {
        console.error(`Required a container element in body: <div class="${containerName}" />`);
        return;
      }

      root.removeChild(el.current);

      window.removeEventListener("click", onClickClose);
    };
  }, []);

  useEffect(() => {
    if (props.adjustingPosition && visible) {
      // 如果计算宽度超出显示区域, 往左弹出

      let almostOut = position.left + cardEl.current.offsetWidth > window.innerWidth;
      let reachingBottom = position.top + cardEl.current.offsetHeight > window.innerHeight;

      if (almostOut || reachingBottom) {
        let newPosition: IPosition = { ...position };
        if (reachingBottom) {
          newPosition.top = null;
          newPosition.bottom = 8;
        }
        if (almostOut) {
          newPosition.right = 8;
          newPosition.left = null;
        }
        console.warn("Moving back into screeen:", newPosition, "from", position);
        setPosition(newPosition);
      }
    }
  });

  // bypass closure issue with a ref
  let wheelChangeHandler = useRef<FuncVoid>();
  wheelChangeHandler.current = () => {
    if (visible) {
      handlePopPosition();
    }
  };

  useEffect(() => {
    if (props.followWheel) {
      let onWindowWheelChange = () => {
        wheelChangeHandler.current();
      };
      window.addEventListener("wheel", onWindowWheelChange);
      return () => {
        window.removeEventListener("wheel", onWindowWheelChange);
      };
    }
  }, []);

  // this is a change listener, leading call is skipped on purpose, visible state may got mirrored in parent
  let readyToEmitChange = useRef(false);
  useEffect(() => {
    if (readyToEmitChange.current) {
      props.onExpand?.(visible);
    } else {
      readyToEmitChange.current = true;
    }
  }, [visible]);

  /** Renderers */

  let renderDropdown = () => {
    let getSvg = (color: string, width: number, height: number) => (
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
        <path
          d="M22 20.586L41.799.786a1 1 0 1 1 1.414 1.415L23.414 22l19.8 19.799a1 1 0 1 1-1.415 1.414L22 23.414l-19.799 19.8a1 1 0 0 1-1.414-1.415L20.586 22 .786 2.201A1 1 0 0 1 2.202.787L22 20.586z"
          fill={color}
          fillRule="nonzero"
        />
      </svg>
    );

    return ReactDOM.createPortal(
      <div className={styleAnimations} ref={containerElRef}>
        <CSSTransition in={visible} unmountOnExit={true} classNames="dropdown" timeout={transitionDurationExit}>
          <div
            className={cx(column, stylePopPage, "popup-card", props.cardClassName)}
            ref={cardEl}
            style={{
              overflow: "auto",
              maxHeight: window.innerHeight - 80,
              width: props.width || inheritedWidth,
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right,
              ...props.cardStyle,
            }}
          >
            {props.title ? (
              <div className={cx(rowParted, styleHeader)}>
                <span>{props.title}</span>
              </div>
            ) : null}
            {props.hideClose ? null : (
              <span className={styleCloseIcon} onClick={onUserClose}>
                {getSvg("#aaa", 14, 14)}
              </span>
            )}
            {props.renderContent(onUserClose)}
          </div>
        </CSSTransition>
      </div>,
      el.current
    );
  };

  let ui = renderDropdown();

  let internalState = {
    visible,
  };

  return [ui, triggerEl, openMenu, onUserClose, internalState] as [ReactNode, Ref<HTMLDivElement>, typeof openMenu, typeof onUserClose, typeof internalState];
};

let DropdownArea: FC<IProps> = React.memo((props) => {
  let [ui, triggerEl, openMenu, onClose] = useDropdownArea(props);

  /** Plugins */
  /** Methods */

  let onTriggerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    openMenu();
  };

  /** Effects */
  /** Renderers */

  if (props.renderTrigger != null) {
    return (
      <>
        <div className={cx(styleTrigger, props.className)} style={props.style} ref={triggerEl}>
          {props.renderTrigger(openMenu, onClose)}
        </div>
        {ui}
      </>
    );
  }

  return (
    <>
      <div className={cx(styleTrigger, props.className)} style={props.style} onClick={onTriggerClick} ref={triggerEl}>
        {props.children}
      </div>
      {ui}
    </>
  );
});

export default DropdownArea;

let styleAnimations = css`
  .dropdown-enter {
    opacity: 0;

    &.popup-card {
      transform: translate(0, -5px) scale(1);
    }
  }
  .dropdown-enter.dropdown-enter-active {
    opacity: 1;
    transition-duration: ${transitionDurationEnter}ms;
    &.popup-card {
      transform: translate(0px, 0px);
      transition-duration: ${transitionDurationEnter}ms;
    }
  }
  .dropdown-exit {
    opacity: 1;

    &.popup-card {
      transform: translate(0px, 0px);
    }
  }
  .dropdown-exit.dropdown-exit-active {
    opacity: 0;
    transition-duration: ${transitionDurationExit}ms;

    &.popup-card {
      transform: translate(0px, -5px) scale(1);
      transition: ${transitionDurationExit}ms;
    }
  }
`;

let stylePopPage = css`
  border-radius: 2px;

  margin: auto;
  z-index: 1000; /* same as antd popups */

  position: fixed;

  background-color: white;
  box-shadow: 0px 1px 4px 0px rgba(2, 41, 128, 0.2);

  min-width: 220px;
  min-height: 80px;

  transform-origin: 50% -50%;

  transition-timing-function: linear;
`;

let styleHeader = css`
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid hsl(0, 0%, 91%);
`;

let styleCloseIcon = css`
  color: #aaa;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  top: 14px;
  right: 16px;
`;

let styleTrigger = css`
  cursor: pointer;
  display: inline-block;
`;
