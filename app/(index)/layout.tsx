import ToggleTheme from '@/components/ToggleTheme';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='h-screen p-4'>
			<ToggleTheme />
			{children}
		</div>
	);
};

export default layout;
