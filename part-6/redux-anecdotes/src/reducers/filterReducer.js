
export function setFilter(value) {
	return { type: 'FILTER', value: value };
}

const initialFilter = '';

function filterReducer(state = initialFilter, action) {
	switch (action.type) {
		case 'FILTER':
			return action.value;
		default:
			return state;
	}
}

export default filterReducer;