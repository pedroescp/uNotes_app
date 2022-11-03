import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export function Base({ children }: LayoutProps) {
	return (
		<div className='flex justify-center h-[calc(100vh_-_80px)] lg:h-screen'>
			<div className='container px-4'>{children}</div>
		</div>
	);
}
