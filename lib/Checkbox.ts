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

export type AriaChecked = 'true' | 'false' | 'mixed';

/**
 * Class Checkbox
 *
 * @param {HTMLElement} el HTML element.
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
export default class Checkbox {
	el: HTMLElement;
	$input: HTMLInputElement | null = null;

	constructor(el: HTMLElement) {
		this.el = el;
	}

	get ariaChecked(): AriaChecked {
		return (this.el.getAttribute('aria-checked') ?? 'false') as AriaChecked;
	}

	get checked(): boolean {
		return 'true' === this.ariaChecked;
	}

	get disabled(): boolean {
		return 'true' === this.el.getAttribute('aria-disabled');
	}

	init(): void | null {
		if (null === this.el) {
			return null;
		}

		this.$input = this.el.querySelector('input');

		if (!this.el.hasAttribute('aria-checked')) {
			this.el.setAttribute('aria-checked', 'false');
		}

		this.sync();

		return this.initEvents();
	}

	/** Apply HTML attributes to classes and the native input. */
	sync(): void {
		const { ariaChecked } = this;

		this.el.classList.toggle('is-selected', 'true' === ariaChecked);
		this.el.classList.toggle('is-mixed', 'mixed' === ariaChecked);

		if (this.$input) {
			this.$input.checked = 'true' === ariaChecked;
			this.$input.indeterminate = 'mixed' === ariaChecked;

			if ('true' === ariaChecked) {
				this.$input.setAttribute('checked', '');
			} else {
				this.$input.removeAttribute('checked');
			}
		}
	}

	initEvents(): void {
		this.el.addEventListener('keydown', this.handleKeydown);
		this.el.addEventListener('click', this.handleClick);
		this.el.addEventListener('blur', () => blur(this.el));
		this.el.addEventListener('focus', () => focus(this.el));
	}

	handleClick = (): void | null => this.toggle();

	handleKeydown = (event: KeyboardEvent): any => {
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
	};

	toggle(): void | null {
		if (this.disabled) {
			return null;
		}

		if ('true' === this.ariaChecked) {
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
		if (this.disabled || 'true' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'true');
		this.sync();

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
		if (this.disabled || 'false' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'false');
		this.sync();

		if (trigger && this.$input) {
			triggerEvents(this.$input, ['deactivate']);
		}

		return true;
	}

	/**
	 * Checkbox.mix
	 *
	 * @param {boolean} trigger Whether or not the event should be trigger.
	 *
	 * @return	{boolean}
	 */
	mix(trigger: boolean = true): boolean {
		if (this.disabled || 'mixed' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'mixed');
		this.sync();

		if (trigger && this.$input) {
			triggerEvents(this.$input, ['mix']);
		}

		return true;
	}
}
