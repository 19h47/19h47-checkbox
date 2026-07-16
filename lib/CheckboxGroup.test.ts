import { afterEach, describe, expect, it } from 'vitest';
import CheckboxGroup from './CheckboxGroup';

const createGroup = (count: number, disabledIndex: number | null = null) => {
	const group = document.createElement('div');
	group.setAttribute('role', 'group');

	for (let i = 0; i < count; i += 1) {
		const el = document.createElement('div');
		el.setAttribute('role', 'checkbox');
		el.setAttribute('tabindex', '0');
		el.setAttribute('aria-checked', 'false');
		el.dataset.id = String(i);

		if (disabledIndex === i) {
			el.setAttribute('aria-disabled', 'true');
		}

		const input = document.createElement('input');
		input.type = 'checkbox';
		el.appendChild(input);
		group.appendChild(el);
	}

	document.body.appendChild(group);

	return group;
};

afterEach(() => {
	document.body.innerHTML = '';
});

describe('CheckboxGroup', () => {
	it('initializes a Checkbox per role=checkbox', () => {
		const group = createGroup(3);
		const checkboxGroup = new CheckboxGroup(group);

		checkboxGroup.init();

		expect(checkboxGroup.checkboxes).toHaveLength(3);
	});

	it('shift-select activates checkboxes in range', () => {
		const group = createGroup(5);
		const checkboxGroup = new CheckboxGroup(group);

		checkboxGroup.init();

		const items = checkboxGroup.checkboxes.map(checkbox => checkbox.el);

		items[1].click();
		items[3].dispatchEvent(
			new MouseEvent('click', { bubbles: true, shiftKey: true }),
		);

		expect(items[1].getAttribute('aria-checked')).toBe('true');
		expect(items[2].getAttribute('aria-checked')).toBe('true');
		expect(items[3].getAttribute('aria-checked')).toBe('true');
		expect(items[0].getAttribute('aria-checked')).toBe('false');
		expect(items[4].getAttribute('aria-checked')).toBe('false');
	});

	it('shift-select skips disabled checkboxes', () => {
		const group = createGroup(4, 2);
		const checkboxGroup = new CheckboxGroup(group);

		checkboxGroup.init();

		const items = checkboxGroup.checkboxes.map(checkbox => checkbox.el);

		items[0].click();
		items[3].dispatchEvent(
			new MouseEvent('click', { bubbles: true, shiftKey: true }),
		);

		expect(items[1].getAttribute('aria-checked')).toBe('true');
		expect(items[2].getAttribute('aria-checked')).toBe('false');
		expect(items[3].getAttribute('aria-checked')).toBe('true');
	});

	it('destroy tears down child checkboxes', () => {
		const group = createGroup(2);
		const checkboxGroup = new CheckboxGroup(group);

		checkboxGroup.init();
		checkboxGroup.destroy();

		expect(checkboxGroup.checkboxes).toHaveLength(0);

		const first = group.querySelector('[role="checkbox"]') as HTMLElement;
		first.click();

		expect(first.getAttribute('aria-checked')).toBe('false');
	});
});
