# @19h47/checkbox

## HTML

```html
	<div class="js-checkbox" role="checkbox" data-condition-class="" aria-checked="false">
<<<<<<< HEAD
		<button type="button" tabindex="-1">Do you want to click me?</button>
=======
		<button type="button"></button>
>>>>>>> 95a4568d5a776b1abf47827ae0a7db65b6773ebb
		<div style="display: none;">
			<input id="option" name="option" value="false" type="checkbox">
		</div>
	</div>
```

## JavaScript

```javascript
	const element = document.querySelector('.js-checkbox');
	const checkbox = new Checkbox(element);

	checkbox.init();
```

<<<<<<< HEAD
## Keyboard Support

Key   | Function
----- | -------
Tab   | Moves keyboard focus to the `checkbox`.
Space |	Toggles checkbox between checked and unchecked states.

## Role, Property, State, and Tabindex Attributes

### h3

Provides a grouping label for the group of checkboxes.

### group

Identifies the div element as a group container for the checkboxes.

The `aria-labelledby` attribute references the id attribute of the `h3` element to define the accessible name for the group of checkboxes.

### checkbox

Identifies the `div` element as a `checkbox`.

The child text content of this `div` provides the accessible name of the checkbox.

=======
>>>>>>> 95a4568d5a776b1abf47827ae0a7db65b6773ebb
## Event

### Focus

When the element is focus, a `is-focus` class is added.

### Blur

When the element is blur, the `is-focus` class is removed.

### Keydown

When the space key is pressed, the `toggle` method is trigged.

### Click

When the element is cliked, the `toggle` method is trigged.
<<<<<<< HEAD

## Example

An example is located right [here](https://19h47.github.io/19h47-checkbox/), see [sources](/docs/index.html).

## Acknowledgments

- [Checkbox Example](https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html)
=======
>>>>>>> 95a4568d5a776b1abf47827ae0a7db65b6773ebb
