import { fail, redirect } from '@sveltejs/kit';
import { PASS } from '$env/static/private';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const pass = formData.get('pass');
		const path = '/admin/records';

		if (pass === PASS) {
			cookies.set('authenticated', 'true', {
				path,
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // * 7; // 1 week (unit: seconds)
			});

			throw redirect(303, path);
		}

		// return { success: false };
		return fail(400, { incorrect: true });
	}
};
