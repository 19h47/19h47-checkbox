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

		// Bind
		this.handleClick = this.handleClick.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
	}

	init() {
		if (null === this.rootElement) return false;

		this.$input = this.rootElement.querySelector('input');
		this.checked = JSON.parse(this.rootElement.getAttribute('aria-checked'));
		this.disabled = this.rootElement.getAttribute('aria-disabled')
			? JSON.parse(this.rootElement.getAttribute('aria-disabled'))
			: false;

		if (!this.checked) {
			this.rootElement.setAttribute('aria-checked', false);
		}

		if (this.$input.checked) {
			this.activate();
		}

		return this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('keydown', this.handleKeydown);
		this.rootElement.addEventListener('click', this.handleClick);
		this.rootElement.addEventListener('blur', () => blur(this.rootElement));
		this.rootElement.addEventListener('focus', () => focus(this.rootElement));
	}

	handleClick = () => this.toggle();

	handleKeydown(event) {
		const { keyCode: key } = event;

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
	 * @param {boolean} trigger Whether or not the event should be trigger.
	 *
	 * @return	{boolean}
	 */
	activate(trigger = true) {
		if (this.checked) {
			return false;
		}

		if (this.disabled) {
			return false;
		}

		this.checked = true;

		//
		this.rootElement.classList.add('is-selected');
		this.rootElement.setAttribute('aria-checked', true);

		this.$input.checked = true;
		this.$input.setAttribute('checked', true);

		if (trigger) {
			triggerEvent(this.$input, 'input');
			triggerEvent(this.$input, 'activate');
		}

		return true;
	}

	/**
	 * Checkbox.deactivate
	 *
	 * @param {boolean} trigger Whether or not the event should be trigger.
	 *
	 * @return	{boolean}
	 */
	deactivate(trigger = true) {
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

		if (trigger) {
			triggerEvent(this.$input, 'deactivate');
		}

		return true;
	}
}
