# @19h47/checkbox

## Install

```
yarn add @19h47/checkbox
```

## HTML

```html
<div role="checkbox" aria-checked="false">
	<button type="button" tabindex="-1">Do you want to click me?</button>
	<div style="display: none;">
		<input id="option" name="option" value="false" type="checkbox" />
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

| Role       | Attribute              | Element | Usage                                                                                                                                                    |
| ---------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
|            |                        | `h3`    | Provides a grouping label for the group of checkboxes.                                                                                                   |
| `group`    |                        | `div`   | Identifies the div element as a group container for the checkboxes.                                                                                      |
|            | `aria-labelledby`      | `div`   | The `aria-labelledby` attribute references the id attribute of the `h3` element to define the accessible name for the group of checkboxes.</li></ul>     |
| `checkbox` |                        | `div`   | <ul><li>Identifies the `div` element as a `checkbox`.</li><li>The child text content of this div provides the accessible name of the checkbox.</li></ul> |
|            | `tabindex="0"`         | `div`   | Includes the checkbox in the page tab sequence.                                                                                                          |
|            | `aria-checked="false"` | `div`   | Indicates the `checkbox` is **not** checked.                                                                                                             |
|            | `aria-checked="true"`  | `div`   | Indicates the `checkbox` is checked.                                                                                                                     |

## Event

### Activate

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelectorAll('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();

checkbox.$input.addEventListener('activate', event => {
	const {
		target: { value },
	} = event;

	console.log(value); // Current activate value
});
```

### Deactivate

```javascript
import Checkbox from '@19h47/checkbox';

const $checkbox = document.querySelectorAll('[role="checkbox"]');
const checkbox = new Checkbox($checkbox);

checkbox.init();

checkbox.$input.addEventListener('deactivate', event => {
	const {
		target: { value },
	} = event;

	console.log(value); // Current deactivate value
});
```

## Example

An example is located right [here](https://19h47.github.io/19h47-checkbox/), see [sources](https://github.com/19h47/19h47-checkbox/blob/master/index.html).

## Acknowledgments

-   [Checkbox Example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html)
