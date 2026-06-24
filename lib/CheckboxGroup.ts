import Checkbox from './Checkbox';

export default class CheckboxGroup {
	el: HTMLElement;
	checkboxes: Checkbox[] = [];
	lastChecked: HTMLElement | null = null;

	constructor(el: HTMLElement) {
		this.el = el;
	}

	init(): void {
		this.checkboxes = Array.from(
			this.el.querySelectorAll<HTMLElement>('[role="checkbox"]'),
		).map($element => {
			const checkbox = new Checkbox($element);

			checkbox.init();

			return checkbox;
		});

		this.initEvents();
	}

	initEvents(): void {
		this.checkboxes.forEach(checkbox =>
			checkbox.el.addEventListener('click', this.handleCheck, false),
		);
	}

	handleCheck = (event: MouseEvent): void => {
		const { currentTarget, shiftKey } = event;

		if (!(currentTarget instanceof HTMLElement)) {
			return;
		}

		const checked = 'true' === currentTarget.getAttribute('aria-checked');

		let inBetween = false;

		if (shiftKey && checked) {
			this.checkboxes.forEach(checkbox => {
				const { el } = checkbox;

				if (el === currentTarget || el === this.lastChecked) {
					inBetween = !inBetween;
				}

				if (inBetween) {
					checkbox.activate();
				}
			});
		}

		this.lastChecked = currentTarget;
	};
}
