export type AriaChecked = 'true' | 'false' | 'mixed';

const parseAriaChecked = (value: string | null): AriaChecked => {
	if ('true' === value || 'mixed' === value) {
		return value;
	}

	return 'false';
};

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
		this.sync();
		this.initEvents();
	}

	destroy(): void {
		this.el.removeEventListener('keydown', this.handleKeydown);
		this.el.removeEventListener('click', this.handleClick);
		this.el.removeEventListener('blur', this.handleBlur);
		this.el.removeEventListener('focus', this.handleFocus);
		this.el.classList.remove('is-focus');
	}

	/** Apply HTML attributes to classes and the native input. */
	sync(): void {
		const { ariaChecked, disabled } = this;

		this.el.classList.toggle('is-selected', 'true' === ariaChecked);
		this.el.classList.toggle('is-mixed', 'mixed' === ariaChecked);
		this.el.classList.toggle('is-disabled', disabled);

		if (this.$input) {
			this.$input.checked = 'true' === ariaChecked;
			this.$input.indeterminate = 'mixed' === ariaChecked;
			this.$input.disabled = disabled;
		}
	}

	initEvents(): void {
		this.el.addEventListener('keydown', this.handleKeydown);
		this.el.addEventListener('click', this.handleClick);
		this.el.addEventListener('blur', this.handleBlur);
		this.el.addEventListener('focus', this.handleFocus);
	}

	handleClick = (): void => {
		this.toggle();
	};

	handleKeydown = (event: KeyboardEvent): void => {
		if (' ' !== event.key && 'Space' !== event.code) {
			return;
		}

		event.preventDefault();
		this.toggle();
	};

	handleFocus = (): void => {
		this.el.classList.add('is-focus');
	};

	handleBlur = (): void => {
		this.el.classList.remove('is-focus');
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
	}

	activate(trigger: boolean = true): boolean {
		if (this.disabled || 'true' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'true');
		this.sync();
		this.emit(trigger, 'activate');

		return true;
	}

	deactivate(trigger: boolean = true): boolean {
		if (this.disabled || 'false' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'false');
		this.sync();
		this.emit(trigger, 'deactivate');

		return true;
	}

	mix(trigger: boolean = true): boolean {
		if (this.disabled || 'mixed' === this.ariaChecked) {
			return false;
		}

		this.el.setAttribute('aria-checked', 'mixed');
		this.sync();
		this.emit(trigger, 'mix');

		return true;
	}

	private emit(trigger: boolean, name: 'activate' | 'deactivate' | 'mix'): void {
		if (!trigger) {
			return;
		}

		const target: HTMLElement = this.$input ?? this.el;
		const options = { bubbles: true };

		[name, 'input', 'change'].forEach(eventName => {
			target.dispatchEvent(new Event(eventName, options));
		});
	}
}
