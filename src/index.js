import { SPACE } from '@19h47/keycode';

/**
 * Trigger event
 *
 * @param  {object} element
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
		this.rootElement = element;

		this.onClick = this.onClick.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
	}

	init() {
		if (null === this.rootElement) return false;

		this.$input = this.rootElement.querySelector('input');
		this.checked = JSON.parse(this.rootElement.getAttribute('aria-checked'));

		if (!this.checked) {
			this.rootElement.setAttribute('aria-checked', false);
		}

		if (this.$input.checked) {
			this.activate();
		}

		return this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('keydown', this.onKeydown);
		this.rootElement.addEventListener('click', this.onClick);
		this.rootElement.addEventListener('blur', () => blur(this.rootElement));
		this.rootElement.addEventListener('focus', () => focus(this.rootElement));
	}

	onClick() {
		this.toggle();
	}

	onKeydown(event) {
		const key = event.keyCode;

		const codes = {
			[SPACE]: () => {
				this.toggle();

				event.stopPropagation();
				event.preventDefault();
			},
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	toggle() {
		if (this.checked) {
			this.deactivate();
		} else {
			this.activate();
		}

		return triggerEvent(this.$input, 'change');
	}

	/**
	 * Checkbox.activate
	 *
	 * @return	{boolean}
	 */
	activate() {
		if (this.checked) {
			return false;
		}

		this.checked = true;

		//
		this.rootElement.classList.add('is-selected');
		this.rootElement.setAttribute('aria-checked', true);

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
		if (!this.checked) {
			return false;
		}

		this.checked = false;

		//
		this.rootElement.classList.remove('is-selected');
		this.rootElement.setAttribute('aria-checked', false);

		//
		this.$input.checked = false;
		this.$input.removeAttribute('checked');

		triggerEvent(this.$input, 'deactivate');

		return true;
	}
}
