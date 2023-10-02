import Checkbox from './Checkbox';

export default class CheckboxGroup {
	el: HTMLElement;
	checkboxes: Checkbox[];
	lastChecked: EventTarget | null;

	constructor(el: HTMLElement) {
		this.el = el;

		this.checkboxes = [];
		this.lastChecked = null;

		this.handleCheck = this.handleCheck.bind(this);
	}

	init(): void {
		this.checkboxes = [...this.el.querySelectorAll('[role="checkbox"]')].map(
			$element => {
				const checkbox = new Checkbox($element as HTMLElement);
				checkbox.init();

				return checkbox;
			},
		);

		this.initEvents();
	}

	initEvents(): void {
		this.checkboxes.forEach(checkbox =>
			checkbox.el.addEventListener('click', this.handleCheck, false),
		);
	}

	handleCheck(event: MouseEvent): void {
		const { currentTarget, shiftKey } = event;

		const checked = true === JSON.parse((event.currentTarget as HTMLElement)?.getAttribute('aria-checked') as string);

		let inBetween = false;

		if (shiftKey && checked) {
			this.checkboxes.forEach(checkbox => {
				const { el } = checkbox;

				if (el === currentTarget || el === this.lastChecked) {
					inBetween = !inBetween;
					console.log('Starting to check them in between!');
				}

				if (inBetween) {
					checkbox.activate();
				}
			});
		}

		this.lastChecked = currentTarget;
	}
}
