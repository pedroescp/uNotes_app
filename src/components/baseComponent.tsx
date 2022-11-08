import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export function Base({ children }: LayoutProps) {
	return (
		<div className='flex justify-center h-full lg:h-screen'>
			<div className='container !flex-col'>{children}</div>
		</div>
	);
}
