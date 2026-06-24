export type AriaChecked = 'true' | 'false' | 'mixed';

export type CheckboxInputEventName =
	| 'activate'
	| 'deactivate'
	| 'mix'
	| 'input'
	| 'change';

const parseAriaChecked = (value: string | null): AriaChecked => {
	if ('true' === value || 'mixed' === value) {
		return value;
	}

	return 'false';
};

const triggerEvents = (
	element: HTMLElement,
	names: readonly CheckboxInputEventName[],
): void => {
	names.forEach(name => element.dispatchEvent(new Event(name, { bubbles: true })));
};

const setFocusClass = (target: HTMLElement): void => target.classList.add('is-focus');
const removeFocusClass = (target: HTMLElement): void => target.classList.remove('is-focus');

export default class Checkbox {
	el: HTMLElement;
	$input: HTMLInputElement | null = null;

	constructor(el: HTMLElement) {
		this.el = el;
	}

	get ariaChecked(): AriaChecked {
		return parseAriaChecked(this.el.getAttribute('aria-checked'));
	}

	get checked(): boolean {
		return 'true' === this.ariaChecked;
	}

	get disabled(): boolean {
		return 'true' === this.el.getAttribute('aria-disabled');
	}

	init(): void {
		this.$input = this.el.querySelector<HTMLInputElement>('input');

		if (!this.el.hasAttribute('aria-checked')) {
			this.el.setAttribute('aria-checked', 'false');
		}

		this.sync();
		this.initEvents();
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
		this.el.addEventListener('blur', () => removeFocusClass(this.el));
		this.el.addEventListener('focus', () => setFocusClass(this.el));
	}

	handleClick = (): void => {
		this.toggle();
	};

	handleKeydown = (event: KeyboardEvent): void => {
		if (' ' !== event.key && 'Space' !== event.code) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		this.toggle();
	};

	toggle(): void {
		if (this.disabled) {
			return;
		}

		if ('true' === this.ariaChecked) {
			this.deactivate();
		} else {
			this.activate();
		}

		if (this.$input) {
			triggerEvents(this.$input, ['input', 'change']);
		}
	}

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
