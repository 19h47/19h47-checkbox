/**
 * Class Checkbox
 *
 * 	<div class="js-checkbox" data-condition-class="">
 * 		<button role="checkbox" type="button" aria-checked="false"></button>
 * 		<div style="display: none;">
 *			<input id="option_1" name="option_1" value="false" type="checkbox">
 *		</div>
 *	</div>
 * `
 * @param obj element DOM element.
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */
export default class Checkbox {
	constructor(element) {
		this.$element = element;
	}

	init() {
		if (null === this.$element) return false;

		this.$button = this.$element.querySelector('button');
		this.$checkbox = this.$element.querySelector('input');

		this.isActive = this.$element.classList.contains('is-active');

		// Condition
		const conditionClass = this.$element.getAttribute('data-condition-class');
		this.conditionalEls = document.querySelectorAll(`.${conditionClass}`) || [];

		this.initEvents();

		return true;
	}


	/**
	 * Trigger event
	 *
	 * @param  obj element
	 * @param  str name Event name
	 * @return
	 */
	static triggerEvent(element, name) {
		const event = new Event(name);

		return element.dispatchEvent(event);
	}

	initEvents() {
		this.$element.addEventListener('click', () => {
			Checkbox.triggerEvent(this.$checkbox, 'change');
			this.toggle();
		});

		if (this.$checkbox.checked) {
			this.activate();
		}
	}


	/**
	 * Checkbox.toggle
	 */
	toggle() {
		if (this.isActive) return this.deactivate();

		return this.activate();
	}


	/**
	 * Checkbox.activate
	 *
	 * @return	bool
	 */
	activate() {
		if (this.isActive) return false;

		this.isActive = true;
		this.$element.classList.add('is-active');

		// Button.
		this.$button.classList.add('is-selected');
		this.$button.setAttribute('aria-checked', true);

		// Condition.
		for (let i = 0; i < this.conditionalEls.length; i += 1) {
			this.conditionalEls[i].classList.remove('is-off');
		}

		this.$checkbox.value = 'true';
		this.$checkbox.setAttribute('checked', true);

		return true;
	}


	/**
	 * Checkbox.deactivate
	 *
	 * @return	bool
	 */
	deactivate() {
		if (!this.isActive) return false;

		this.isActive = false;
		this.$element.classList.remove('is-active');

		// Buttons.
		this.$button.classList.remove('is-selected');
		this.$button.setAttribute('aria-checked', false);

		// Condition.
		for (let i = 0; i < this.conditionalEls.length; i += 1) {
			this.conditionalEls[i].classList.add('is-off');
		}

		this.$checkbox.value = 'false';
		this.$checkbox.removeAttribute('checked');

		return true;
	}
}
