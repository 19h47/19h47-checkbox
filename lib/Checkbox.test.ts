import { afterEach, describe, expect, it, vi } from 'vitest';
import Checkbox from './Checkbox';

const createCheckbox = (attrs: Record<string, string> = {}) => {
	const el = document.createElement('div');

	el.setAttribute('role', 'checkbox');
	el.setAttribute('tabindex', '0');

	for (const [name, value] of Object.entries(attrs)) {
		el.setAttribute(name, value);
	}

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.name = 'option';
	input.value = 'option';
	el.appendChild(input);

	document.body.appendChild(el);

	return { el, input };
};

afterEach(() => {
	document.body.innerHTML = '';
});

describe('Checkbox', () => {
	it('reads getters from HTML', () => {
		const { el } = createCheckbox({
			'aria-checked': 'true',
			'aria-disabled': 'true',
		});
		const checkbox = new Checkbox(el);

		checkbox.init();

		expect(checkbox.ariaChecked).toBe('true');
		expect(checkbox.checked).toBe(true);
		expect(checkbox.disabled).toBe(true);
	});

	it('defaults ariaChecked to false when attribute is missing', () => {
		const { el } = createCheckbox();
		const checkbox = new Checkbox(el);

		checkbox.init();

		expect(checkbox.ariaChecked).toBe('false');
		expect(el.hasAttribute('aria-checked')).toBe(false);
	});

	it('syncs classes and native input from HTML', () => {
		const { el, input } = createCheckbox({
			'aria-checked': 'mixed',
			'aria-disabled': 'true',
		});
		const checkbox = new Checkbox(el);

		checkbox.init();

		expect(el.classList.contains('is-selected')).toBe(false);
		expect(el.classList.contains('is-mixed')).toBe(true);
		expect(el.classList.contains('is-disabled')).toBe(true);
		expect(input.checked).toBe(false);
		expect(input.indeterminate).toBe(true);
		expect(input.disabled).toBe(true);
	});

	it('activate, deactivate and mix update HTML and sync', () => {
		const { el } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);

		checkbox.init();

		checkbox.activate(false);
		expect(el.getAttribute('aria-checked')).toBe('true');
		expect(el.classList.contains('is-selected')).toBe(true);

		checkbox.mix(false);
		expect(el.getAttribute('aria-checked')).toBe('mixed');
		expect(el.classList.contains('is-mixed')).toBe(true);

		checkbox.deactivate(false);
		expect(el.getAttribute('aria-checked')).toBe('false');
		expect(el.classList.contains('is-selected')).toBe(false);
	});

	it('toggle flips between checked and unchecked', () => {
		const { el } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);

		checkbox.init();
		checkbox.toggle();
		expect(el.getAttribute('aria-checked')).toBe('true');

		checkbox.toggle();
		expect(el.getAttribute('aria-checked')).toBe('false');
	});

	it('does not toggle when disabled', () => {
		const { el } = createCheckbox({
			'aria-checked': 'false',
			'aria-disabled': 'true',
		});
		const checkbox = new Checkbox(el);

		checkbox.init();
		checkbox.toggle();

		expect(el.getAttribute('aria-checked')).toBe('false');
	});

	it('emits activate, input and change on state change', () => {
		const { el, input } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);
		const activate = vi.fn();
		const inputEvent = vi.fn();
		const change = vi.fn();

		checkbox.init();
		input.addEventListener('activate', activate);
		input.addEventListener('input', inputEvent);
		input.addEventListener('change', change);

		checkbox.activate();

		expect(activate).toHaveBeenCalledOnce();
		expect(inputEvent).toHaveBeenCalledOnce();
		expect(change).toHaveBeenCalledOnce();
	});

	it('does not emit when trigger is false', () => {
		const { el, input } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);
		const activate = vi.fn();

		checkbox.init();
		input.addEventListener('activate', activate);

		checkbox.activate(false);

		expect(activate).not.toHaveBeenCalled();
	});

	it('toggles on Space key', () => {
		const { el } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);

		checkbox.init();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

		expect(el.getAttribute('aria-checked')).toBe('true');
	});

	it('adds and removes is-focus on focus and blur', () => {
		const { el } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);

		checkbox.init();
		el.dispatchEvent(new Event('focus'));

		expect(el.classList.contains('is-focus')).toBe(true);

		el.dispatchEvent(new Event('blur'));
		expect(el.classList.contains('is-focus')).toBe(false);
	});

	it('destroy removes interaction handlers', () => {
		const { el } = createCheckbox({ 'aria-checked': 'false' });
		const checkbox = new Checkbox(el);

		checkbox.init();
		checkbox.destroy();

		el.click();
		expect(el.getAttribute('aria-checked')).toBe('false');
	});
});
