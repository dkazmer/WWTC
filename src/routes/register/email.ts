import { createTransport, type SendMailOptions } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { DB_PASS, DB_USER } from '$env/static/private';
import { season } from '$lib/constants';
import type { TableDB } from '$lib/server/db/schema';

const senderAlt = 'wwtcspri@sv32.byethost32.org';
const sender = 'wishingwelltennis@hotmail.com';

const transporter = createTransport({
	host: 'sv32.byethost32.org',
	port: 587,
	from: `Wishing Well Tennis Club <${senderAlt}>`,
	replyTo: `Wishing Well Tennis Club <${sender}>`,
	// headers: {
	// 	'MIME-Version': '1.0',
	// 	'Content-type': 'text/plain; charset=UTF-8'
	// },
	auth: {
		user: DB_USER,
		pass: decodeURIComponent(DB_PASS)
	}
});

export function send(userData: TableDB) {
	// return Promise.resolve('email fake sent' as unknown as SMTPTransport.SentMessageInfo);
	const mailOptions: SendMailOptions = {
		to: userData.email,
		from: `Wishing Well Tennis Club <${senderAlt}>`,
		replyTo: `Wishing Well Tennis Club <${sender}>`,
		bcc: ['dkazmer@live.ca', sender],
		subject: `${season} tennis season at WWTC`,
		// text: getBody(userData),
		html: getBody(userData)
	};

	return new Promise<SMTPTransport.SentMessageInfo>((res, rej) => {
		transporter.sendMail(mailOptions, (error, info) => {
			error ? rej(error) : res(info);
		});
	});
}

function getBody({ firstName, lastName, owing, bType }: TableDB) {
	return `Welcome${bType === 'returning' ? ' back' : ''}, <b>${firstName} ${lastName}</b>, to <i>Wishing Well Tennis Club</i> for the ${season} season!
<p>
Please remember to send a money transfer to <u>${sender}</u> in the amount of <b>$${owing}</b>.
</p>
Once we have received payment, we'll provide the gate combo-lock code, and you'll be able to collect your shoe tag on opening day or thereafter. Allow twenty-four (24) hours to process your membership.
<p>
If this message landed in your junk/spam folder, mark us as a safe sender in order to ensure receipt of future messages. We thank you for signing up and hope to see you soon!
</p>
<img src="https://material-icons.github.io/material-icons/svg/sports_tennis/outline.svg" width="24" height="24" style="width:24px;max-width:24px;filter:invert(28%) sepia(93%) saturate(1245%) hue-rotate(70deg) brightness(133%) contrast(93%);" />
<p>WWTC team</p>`;
}
