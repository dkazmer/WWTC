import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event: e, resolve }) => {
	const authenticated = e.cookies.get('authenticated');
	if (!authenticated && e.url.pathname === '/admin/records') throw redirect(303, '/admin');

	const response = await resolve(e);
	return response;
};
