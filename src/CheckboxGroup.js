import Checkbox from '@/Checkbox';

export default class CheckboxGroup {
	constructor(element) {
		this.rootElement = element;

		this.checkboxes = null;
		this.lastChecked = null;

		this.handleCheck = this.handleCheck.bind(this);
	}

	init() {
		this.checkboxes = [...this.rootElement.querySelectorAll('[role="checkbox"]')].map(
			$element => {
				const checkbox = new Checkbox($element);
				checkbox.init();

				return checkbox;
			},
		);

		this.initEvents();
	}

	initEvents() {
		this.checkboxes.forEach(checkbox =>
			checkbox.rootElement.addEventListener('click', this.handleCheck, false),
		);
	}

	handleCheck(event) {
		const { currentTarget, shiftKey } = event;
		const checked = true === JSON.parse(event.currentTarget.getAttribute('aria-checked'));

		let inBetween = false;

		if (shiftKey && checked) {
			this.checkboxes.forEach(checkbox => {
				const { rootElement } = checkbox;

				if (rootElement === currentTarget || rootElement === this.lastChecked) {
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
