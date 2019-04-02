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
	const checkbox = new Checkbox('.js-checkbox');

	checkbox.init();
```
