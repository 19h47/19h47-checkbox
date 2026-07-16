[![](https://img.shields.io/npm/v/@19h47/checkbox)](https://www.npmjs.com/package/@19h47/checkbox)
[![](https://img.shields.io/npm/dm/@19h47/checkbox)](https://www.npmjs.com/package/@19h47/checkbox)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/19h47/19h47-checkbox)

# @19h47/checkbox

Custom checkbox behaviour for UIs where a native `<input type="checkbox">` is awkward to style or compose (selectable cards, dense layouts, mixed-state parents). **Not a replacement for native checkboxes** in ordinary forms — prefer those whenever you can.

## Install

```
pnpm add @19h47/checkbox
```

## HTML

HTML is the source of truth. Set `role`, `tabindex`, `aria-checked`, `aria-disabled`, and labelling attributes in the markup; the library reads them and mirrors state onto classes and an optional native input.

```html
<div role="checkbox" aria-checked="false" tabindex="0">
	<span aria-hidden="true"></span>
	Do you want to click me?
	<div style="display: none;">
		<input id="option" name="option" value="option" type="checkbox" />
	</div>
</div>
```

## JavaScript

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelector('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();
```

## Keyboard Support

| Key   | Function                                               |
| ----- | ------------------------------------------------------ |
| Tab   | Moves keyboard focus to the `checkbox`.                |
| Space | Toggles checkbox between checked and unchecked states. |

## Role, Property, State, and Tabindex Attributes

| Role       | Attribute              | Element | Usage                                                                                                                    |
| ---------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
|            |                        | `h3`    | Provides a grouping label for the group of checkboxes.                                                                   |
| `group`    |                        | `div`   | Identifies the div element as a group container for the checkboxes.                                                      |
|            | `aria-labelledby`      | `div`   | References the id of the element that labels the group.                                                                  |
| `checkbox` |                        | `div`   | Identifies the element as a checkbox. Child text (or `aria-label` / `aria-labelledby`) provides the accessible name.     |
|            | `tabindex="0"`         | `div`   | Includes the checkbox in the page tab sequence.                                                                          |
|            | `aria-checked="false"` | `div`   | Indicates the checkbox is **not** checked.                                                                               |
|            | `aria-checked="true"`  | `div`   | Indicates the checkbox is checked.                                                                                       |
|            | `aria-checked="mixed"` | `div`   | Indicates the checkbox is partially checked.                                                                             |
|            | `aria-disabled="true"` | `div`   | Indicates the checkbox is disabled. Prefer `tabindex="-1"` when disabled so it leaves the tab sequence.                  |

## Methods

| Method         | Description                               | Arguments                                                                           |
| -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| `init()`       | Bind events and sync from HTML            | —                                                                                   |
| `destroy()`    | Remove event listeners                    | —                                                                                   |
| `sync()`       | Re-apply HTML → classes & native input    | —                                                                                   |
| `activate()`   | Set `aria-checked="true"` on the element  | `trigger` (optional) Whether events should fire. Default `true`                     |
| `deactivate()` | Set `aria-checked="false"` on the element | `trigger` (optional) Whether events should fire. Default `true`                     |
| `mix()`        | Set `aria-checked="mixed"` on the element | `trigger` (optional) Whether events should fire. Default `true`                     |

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelector('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();

checkbox.activate();
checkbox.deactivate();
checkbox.destroy();
```

## Getters

Read state from the HTML attributes on `el`:

| Getter         | Type                              | Source                          |
| -------------- | --------------------------------- | ------------------------------- |
| `ariaChecked`  | `'true' \| 'false' \| 'mixed'`    | `aria-checked` on `el`          |
| `checked`      | `boolean`                         | `true` when `ariaChecked` is `'true'` |
| `disabled`     | `boolean`                         | `aria-disabled="true"` on `el`  |
| `$input`       | `HTMLInputElement \| null`        | first `input` inside `el`       |

```javascript
checkbox.init();

checkbox.ariaChecked; // "true" | "false" | "mixed"
checkbox.checked;     // boolean
checkbox.disabled;    // boolean
```

## Sync classes

`sync()` (called by `init()` and every state change) mirrors HTML onto optional CSS hooks and the native input:

| Class          | When                                      |
| -------------- | ----------------------------------------- |
| `is-selected`  | `aria-checked="true"`                     |
| `is-mixed`     | `aria-checked="mixed"`                    |
| `is-disabled`  | `aria-disabled="true"`                    |
| `is-focus`     | while the checkbox has focus (interaction) |

The library does not ship styles for these classes — use them in your own CSS.

## Events

Events are dispatched on the hidden `input` when present, otherwise on the checkbox element. When `trigger` is `true`, each state change also fires native-like `input` and `change`.

### Activate

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelector('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();

checkbox.$input.addEventListener('activate', event => {
	const {
		target: { value },
	} = event;

	console.log(value);
});
```

### Deactivate

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelector('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();

checkbox.$input.addEventListener('deactivate', event => {
	const {
		target: { value },
	} = event;

	console.log(value);
});
```

### Mix

```javascript
checkbox.$input.addEventListener('mix', event => {
	const {
		target: { value },
	} = event;

	console.log(value);
});
```

## CheckboxGroup

The `CheckboxGroup` is a wrapper class around `Checkbox`.

When a user clicks a checkbox, holds Shift, and then clicks another checkbox a few rows down, all the checkboxes in between those two checkboxes should be checked (disabled items are skipped).

```html
<div role="group" aria-labelledby="group-label">
	<h3 id="group-label">Options</h3>

	<div tabindex="0" role="checkbox" aria-checked="false">
		<span aria-hidden="true"></span>
		Curst
		<div style="display: none;">
			<input id="curst" name="curst" value="Curst" type="checkbox" />
		</div>
	</div>

	<div tabindex="0" role="checkbox" aria-checked="false">
		<span aria-hidden="true"></span>
		Doppelganger, Greater
		<div style="display: none;">
			<input
				id="doppelganger-greater"
				name="city-of-splendors[]"
				value="Doppelganger, greater"
				type="checkbox"
			/>
		</div>
	</div>
</div>
```

```javascript
import { CheckboxGroup } from '@19h47/checkbox';

const $element = document.querySelector('[role="group"]');
const checkboxgroup = new CheckboxGroup($element);

checkboxgroup.init();
```

## Example

An interactive demo covering every API surface is at [19h47.github.io/19h47-checkbox](https://19h47.github.io/19h47-checkbox/) ([sources](https://github.com/19h47/19h47-checkbox/blob/main/index.html)):

- When to use: selectable cards (whole tile as checkbox)
- HTML states (`aria-checked`, `aria-disabled`, `aria-label`, `aria-labelledby`, `aria-describedby`)
- Methods (`activate`, `deactivate`, `mix`, `sync`, `destroy`) and getters
- Events (`activate`, `deactivate`, `mix`, `input`, `change`)
- Keyboard support (`Tab`, `Space`)
- Groups, conditional logic, `CheckboxGroup`, tri-state select all, shift selection

Run tests with `pnpm test`.

## References

-   [Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
