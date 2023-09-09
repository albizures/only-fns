import React from 'react';

export type ToggleStatus = 'on' | 'off';

export type SetStatus = React.Dispatch<React.SetStateAction<ToggleStatus>>;

export function useToggle(defaultStatus: ToggleStatus = 'off') {
	return React.useState<ToggleStatus>(defaultStatus);
}

export function toggle(setStatus: SetStatus) {
	setStatus(current => {
		return current === 'off' ? 'on' : 'off';
	});
}
