/**
 * Class Checkbox
 *
 * 	<div class="js-checkbox" data-condition-class="">
 * 		<button role="checkbox" type="button" aria-checked="false"></button>
 * 		<div style="display: none;">
 *			<input id="option_1" name="option_1" value="false" type="checkbox">
 *		</div>
 *	</div>
 *
 *
 * `
 * @param obj element DOM element.
 * @constructor Checkbox
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
export default class Checkbox {
	constructor(element) {
		this.$element = element;

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
		this.keyCode = Object.freeze({
			RETURN: 13,
			SPACE: 32,
		});
	}

	init() {
		if (null === this.$element) return false;

		this.$input = this.$element.querySelector('input');

		if (!this.$element.getAttribute('aria-checked')) {
			this.$element.setAttribute('aria-checked', 'false');
		}

		this.isActive = this.$element.getAttribute('aria-checked');

		// Condition.
		const conditionClass = this.$element.getAttribute('data-condition-class') || false;
		this.conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];

		return this.initEvents();
	}


	/**
	 * Trigger event
	 *
	 * @param  obj element
	 * @param  str name Event name
	 * @return
	 */
	static triggerEvent(element, name) {
		const event = new Event(name);

		return element.dispatchEvent(event);
	}

	initEvents() {
		// Click.
		this.$element.addEventListener('click', () => {
			Checkbox.triggerEvent(this.$input, 'change');
			this.toggle();
		});

		// Focus.
		this.$element.addEventListener('focus', () => {
			this.$element.classList.add('is-focus');
		});

		// Keydown.
		this.$element.addEventListener('keydown', (event) => {
			let flag = false;

			switch (event.keyCode) {
			case this.keyCode.SPACE:
				this.toggle();
				flag = true;
				break;

			default:
				break;
			}

			if (flag) {
				event.stopPropagation();
				event.preventDefault();
			}
		});

		// Blur.
		this.$element.addEventListener('blur', () => {
			this.$element.classList.remove('is-focus');
		});

		if (this.$input.checked) {
			this.activate();
		}
	}


	/**
	 * Checkbox.toggle
	 */
	toggle() {
		console.log(this.isActive);
		if ('true' === this.isActive) return this.deactivate();

		return this.activate();
	}


	/**
	 * Checkbox.activate
	 *
	 * @return	bool
	 */
	activate() {
		if ('true' === this.isActive) return false;

		this.isActive = 'true';

		//
		this.$element.classList.add('is-selected');
		this.$element.setAttribute('aria-checked', 'true');

		// Condition.
		for (let i = 0; i < this.conditionalEls.length; i += 1) {
			this.conditionalEls[i].classList.remove('is-off');
			this.conditionalEls[i].setAttribute('tabIndex', 0);
			this.conditionalEls[i].removeAttribute('disabled');
		}

		//
		this.$input.value = 'true';
		this.$input.checked = true;
		this.$input.setAttribute('checked', 'true');

		return true;
	}


	/**
	 * Checkbox.deactivate
	 *
	 * @return	bool
	 */
	deactivate() {
		if ('false' === !this.isActive) return false;

		this.isActive = 'false';

		//
		this.$element.classList.remove('is-selected');
		this.$element.setAttribute('aria-checked', 'false');

		// Condition.
		for (let i = 0; i < this.conditionalEls.length; i += 1) {
			this.conditionalEls[i].classList.add('is-off');
			this.conditionalEls[i].setAttribute('tabIndex', -1);
		}

		//
		this.$input.value = 'false';
		this.$input.checked = false;
		this.$input.removeAttribute('checked');

		return true;
	}
}
