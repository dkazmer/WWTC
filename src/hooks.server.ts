import { type Handle, redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event: e, resolve }) => {
	const authenticated = e.cookies.get('authenticated');
	console.log('>> authenticated', authenticated);
	if (!authenticated && e.url.pathname === '/admin/records') throw redirect(303, '/admin');
	// if (!authenticated) throw { authenticated };

	const response = await resolve(e);
	return response;
};
