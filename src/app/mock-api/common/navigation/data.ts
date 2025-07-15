import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    	{
		id: 'Dashboard',
		title: 'Dashboard',
		type: 'basic',
		icon: 'heroicons_outline:rocket-launch',
		link: '/user'
	},
	{
		id: 'Profile',
		title: 'Profile',
		type: 'basic',
		icon: 'heroicons_outline:user',
		link: 'profile'
	},
	{
		id: 'Users',
		title: 'Utilisateurs',
		type: 'basic',
		icon: 'heroicons_outline:users',
		link: 'users'
	},
	{
		id: 'classes',
		title: 'classes',
		type: 'basic',
		icon: 'heroicons_outline:academic-cap',
		link: 'classes'
	}
];
export const compactNavigation: FuseNavigationItem[] = [
	{
		id: 'example',
		title: 'Example',
		type: 'basic',
		icon: 'heroicons_outline:chart-pie',
		link: '/example'
	}
];
export const futuristicNavigation: FuseNavigationItem[] = [
	{
		id: 'example',
		title: 'Example',
		type: 'basic',
		icon: 'heroicons_outline:chart-pie',
		link: '/example'
	}
];
export const horizontalNavigation: FuseNavigationItem[] = [
	{
		id: 'example',
		title: 'Example',
		type: 'basic',
		icon: 'heroicons_outline:chart-pie',
		link: '/example'
	}
];
