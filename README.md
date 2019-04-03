# @19h47/checkbox

## HTML

```html
	<div class="js-checkbox" data-condition-class="">
		<button role="checkbox" type="button" aria-checked="false"></button>
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

## Event

### Focus

When the element is focus, a `is-focus` class is added.

### Blur

When the element is blur, the `is-focus` class is removed.

### Keydown

When the space key is pressed, the `toggle` method is trigged.

### Click

When the element is cliked, the `toggle` method is trigged.
