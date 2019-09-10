## Meson Dropdown


> A collection of components of displaying information.

**In the migration...** original: [meson-display](https://github.com/jimengio/meson-display)

### Preview

[dropdown-area](http://fe.jimu.io/meson-display/#/dropdown-area)
[dropdown-menu](http://fe.jimu.io/meson-display/#/dropdown-menu)

### Usage

```bash
yarn add @jimengio/dropdown
```

* Dropdown area

Demos http://fe.jimu.io/meson-display/#/dropdown-area

```tsx
import { DropdownArea } from "@jimengio/dropdown"

// make sure you got container element in HTML
// <div class="meson-dropdown-container"></div>

<DropdownArea className={styleTrigger} renderContent={(onClose) => "Some content"} hideClose>
  <div>No close button</div>
</DropdownArea>
```

* Dropdown Menu

```tsx
let items: IMenuListItem[] = [
  {
    value: "a",
    title: "A",
  },
  {
    value: "b",
    title: "使用 optionLabelProp 指定回填到选择框的 Option 属性。uses B",
  },
  {
    value: "c",
    title: "多选，从已有条目中选择。",
  },
  {
    value: "d",
    title: "弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。",
  },
];

<DropdownMenu className={styleShortInput}
              value={selected}
              allowClear={false}
              items={items}
              onSelect={(value) => setSelected(value as string)}
              disabled={false}
              placeholder={"请选择"}
              emptyLocale={"没有数据"}  />
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
