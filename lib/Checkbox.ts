/**
 * Trigger event
 *
 * @param  {HTMLElement} element
 * @param  {string[]} names Events names
 * @return
 */
const triggerEvents = (element: HTMLElement, names: string[]): void => {
	names.forEach(name => element.dispatchEvent(new Event(name, { bubbles: true })));
};

const focus = (target: HTMLElement): void => target.classList.add('is-focus');
const blur = (target: HTMLElement): void => target.classList.remove('is-focus');

/**
 * Class Checkbox
 *
 * @param {object} element DOM element.
 * @constructor Checkbox
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Checkbox {
	el: HTMLElement;
	$input: HTMLInputElement | null;
	checked: boolean;
	disabled: boolean;

	/**
	 *
	 * @param {HTMLElement} el
	 */
	constructor(el: HTMLElement) {
		this.el = el;
		this.$input = null;
		this.checked = false;
		this.disabled = false;

		// Bind
		this.handleClick = this.handleClick.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
	}

	init(): void | null {
		if (null === this.el) {
			return null;
		}

		this.$input = this.el.querySelector('input');
		this.checked = JSON.parse(this.el.getAttribute('aria-checked') as string);
		this.disabled = this.el.getAttribute('aria-disabled')
			? JSON.parse(this.el.getAttribute('aria-disabled') as string)
			: false;

		if (!this.checked) {
			this.el.setAttribute('aria-checked', 'false');
		}

		if (this.$input?.checked) {
			this.activate();
		}

		return this.initEvents();
	}

	initEvents(): void {
		this.el.addEventListener('keydown', this.handleKeydown);
		this.el.addEventListener('click', this.handleClick);
		this.el.addEventListener('blur', () => blur(this.el));
		this.el.addEventListener('focus', () => focus(this.el));
	}

	handleClick = (): void | null => this.toggle();

	handleKeydown(event: KeyboardEvent) {
		const { key, code } = event;

		const codes: any = {
			Space: () => {
				this.toggle();

				event.stopPropagation();
				event.preventDefault();
			},
			default: () => false,
		};

		return (codes[key || code] || codes.default)();
	}

	toggle(): void | null {
		if (this.checked) {
			this.deactivate();
		} else {
			this.activate();
		}

		return this.$input ? triggerEvents(this.$input, ['input', 'change']) : null;
	}

	/**
	 * Checkbox.activate
	 *
	 * @param {boolean} trigger Whether or not the event should be trigger.
	 *
	 * @return	{boolean}
	 */
	activate(trigger: boolean = true): boolean {
		if (this.checked) {
			return false;
		}

		if (this.disabled) {
			return false;
		}

		this.checked = true;

		//
		this.el.classList.add('is-selected');
		this.el.setAttribute('aria-checked', 'true');

		if (this.$input) {
			this.$input.checked = true;
			this.$input.setAttribute('checked', 'true');
		}

		if (trigger && this.$input) {
			triggerEvents(this.$input, ['activate']);
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
	deactivate(trigger: boolean = true): boolean {
		if (!this.checked) {
			return false;
		}

		this.checked = false;

		//
		this.el.classList.remove('is-selected');
		this.el.setAttribute('aria-checked', 'false');

		//
		if (this.$input) {
			this.$input.checked = false;
			this.$input.removeAttribute('checked');
		}

		if (trigger && this.$input) {
			triggerEvents(this.$input, ['deactivate']);
		}

		return true;
	}
}
