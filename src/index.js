import { SPACE } from '@19h47/keycode';

/**
 * Trigger event
 *
 * @param  {Object} element
 * @param  {string} name Event name
 * @return
 */
const triggerEvent = (element, name) => element.dispatchEvent(new Event(name));

const focus = target => target.classList.add('is-focus');
const blur = target => target.classList.remove('is-focus');

/**
 * Class Checkbox
 *
 * @param {object} element DOM element.
 * @constructor Checkbox
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Checkbox {
	constructor(element) {
		this.$element = element;
	}

	init() {
		if (null === this.$element) return false;

		this.$input = this.$element.querySelector('input');
		this.isActive = JSON.parse(this.$element.getAttribute('aria-checked'));

		if (!this.isActive) {
			this.$element.setAttribute('aria-checked', false);
		}

		return this.initEvents();
	}

	initEvents() {
		// Click.
		this.$element.addEventListener('click', () => {
			this.toggle();
			triggerEvent(this.$input, 'change');
		});

		// Focus.
		this.$element.addEventListener('focus', () => {
			focus(this.$element);
		});

		// Keydown.
		this.$element.addEventListener('keydown', event => {
			const key = event.keyCode;

			const codes = {
				[SPACE]: () => {
					this.toggle();
					triggerEvent(this.$input, 'change');

					event.stopPropagation();
					event.preventDefault();
				},
				default: () => false,
			};

			return (codes[key] || codes.default)();
		});

		// Blur.
		this.$element.addEventListener('blur', () => {
			blur(this.$element);
		});

		if (this.$input.checked) {
			this.activate();
		}
	}

	/**
	 * Checkbox.toggle
	 */
	toggle() {
		// console.log(this.isActive);
		if (this.isActive) return this.deactivate();

		return this.activate();
	}

	/**
	 * Checkbox.activate
	 *
	 * @return	bool
	 */
	activate() {
		if (this.isActive) {
			return false;
		}

		this.isActive = true;

		//
		this.$element.classList.add('is-selected');
		this.$element.setAttribute('aria-checked', true);

		this.$input.checked = true;
		this.$input.setAttribute('checked', true);

		triggerEvent(this.$input, 'activate');

		return true;
	}

	/**
	 * Checkbox.deactivate
	 *
	 * @return	{boolean}
	 */
	deactivate() {
		if (!this.isActive) {
			return false;
		}

		this.isActive = false;

		//
		this.$element.classList.remove('is-selected');
		this.$element.setAttribute('aria-checked', false);

		//
		this.$input.checked = false;
		this.$input.removeAttribute('checked');

		triggerEvent(this.$input, 'deactivate');

		return true;
	}
}
