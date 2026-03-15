<script lang="ts">
	import PrimaryBtn from '$lib/components/pri_btn.svelte';
	import { keyDates, rates, season } from '$lib/constants';
	import { determine } from './period.svelte';

	const adultRate = determine(keyDates, rates.adult);

	const {
		adult: { earlyBird, regular, fall },
		junior
	} = rates;

	let legal = $state(false);
	// svelte-ignore non_reactive_update: don't use $state on `lastName`!
	let lastName = '';
	let validEmail = $state(false);
	let dataFamily = $state<Family[]>([{ lastName, firstName: '', age: '', gender: '' }]);
	let total = $state(0);

	// biome-ignore lint/correctness/noUnusedVariables: is used
	function addFamily() {
		dataFamily.length < 6 && dataFamily.push({ firstName: '', lastName, age: '', gender: '' });
	}

	// biome-ignore lint/correctness/noUnusedVariables: is used
	function rmFamily(i: number) {
		dataFamily.splice(i, 1);
		totalReducer();
	}

	function totalReducer() {
		// biome-ignore format: compact
		total = dataFamily.reduce((tally, { age }) => tally + (x => {
			switch (x) {
				case 'a': return adultRate;
				case 'j': return junior;
				default: return 0;
			}
		})(age), 0); // 0, not lessonsTally
	}

	interface Family {
		firstName: string;
		lastName: string;
		age: 'a' | 'j' | '';
		gender: 'm' | 'f' | 'o' | '';
	}
</script>

<h1>Sign up for the {season} season&hellip;</h1>
<section id="disclaimer" aria-hidden={!legal}>
	<div>
		BY COMPLETING THIS FORM THE APPLICANT(S) CONFIRM THAT THEY HAVE READ AND WILL COMPLY WITH ALL THE REQUIREMENTS OF
		THE CITY OF TORONTO GUIDELINES FOR PLAYING TENNIS EACH TIME THEY ATTEND THE WISHING WELL TENNIS CLUB, AND RELEASES,
		WAIVES AND FOREVER DISCHARGES THE WISHING WELL TENNIS CLUB AND ITS OFFICERS AND DIRECTORS OF AND FROM ANY AND ALL
		CLAIMS OR LOSSES ARISING OUT OF THEIR ATTENDANCE AT THE WISHING WELL TENNIS CLUB.
	</div>
</section>
<div class="a">
	<button type="button" aria-controls="disclaimer" aria-expanded={legal} onclick={() => legal = !legal}>
		legal disclaimer
	</button>
</div>
<section>
	<!-- <form action="connect.php" method="post"> -->
	<form>
		{@render person(dataFamily.at(0)!, 0)}
		<section class="returning">
			<input type="radio" name="returning" id="nMem" value="new" required><label for="nMem">New member</label>
			<input type="radio" name="returning" id="rMem" value="returning"><label for="rMem">Returning member</label>
		</section>
		<section class="contact">
			<h2>Contact</h2>
			<div>
				<input
					type="tel"
					name="phone"
					maxlength="12"
					placeholder="Phone*"
					required
					pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
					title="eg., 888-888-8888"
				>
				<input
					type="tel"
					name="phone_sec"
					maxlength="12"
					placeholder="Phone 2"
					pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
					title="eg., 888-888-8888"
				>
			</div>
			<div>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email*"
					class="long"
					required
					pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"}
					title="eg., example@site.com"
					onchange={({ target }: Event) => validEmail = (target as HTMLInputElement)?.validity?.valid}
				>
			</div>
			<div>
				<input
					type="email"
					id="email2"
					placeholder="Verify email*"
					class="long"
					required
					disabled={!validEmail}
					onpaste={() => false}
					autocomplete="off"
					pattern={'[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,4}$'}
					title="eg., example@site.com"
				><span></span>
			</div>
		</section>
		<section class="address">
			<h2>Address</h2>
			<div><input type="text" name="street" placeholder="Street*" class="long" required></div>
			<div>
				<input type="text" name="city" placeholder="City*" required>
				<input
					type="text"
					name="postalCode"
					placeholder="Postal code*"
					maxlength="7"
					required
					pattern="^[A-Z]\d[A-Z][ \-]\d[A-Z]\d$"
					title="eg., M9M 9M9"
				>
			</div>
		</section>
		<section class="additional">
			<h2>Additional family members</h2>
			(at same address)
			<button
				type="button"
				class="plus"
				title="add another family member"
				onclick={addFamily}
				disabled={dataFamily.length > 5}
			>
				+
			</button>
			<span class="count">{dataFamily.length-1}/5</span>
			{#each dataFamily as item, i}
				{#if i > 0}
					{@render person(item, i, true)}
				{/if}
			{/each}
		</section>
		<section class="lessons">
			<input type="radio" name="lessons" id="nolessons" value="none" checked><label for="nolessons">No lessons</label>
			<input type="radio" name="lessons" id="plessons" value="private">
			<label for="plessons">Private lessons<!--  ($70) --></label>
			<input type="radio" name="lessons" id="lessons" value="public">
			<label for="lessons">Public lessons<!--  ($40) --></label>
		</section>
		<div class="total">{total}</div>
		<input type="hidden" name="owing" bind:value={total}>
		<input type="hidden" name="season" value="">
		<section class="info">
			<p><b>Membership type:</b></p>
			<ul>
				<li>junior: (under 18yo) at <span class="dollar-junior bold">{junior}</span>.</li>
				<li>
					adult:
					<ul>
						<li>early bird at <span class="dollar-adult-eb bold">{earlyBird}</span></li>
						<li>regular season at <span class="dollar-adult bold">{regular}</span></li>
						<li>late season (from August 15) at <span class="bold">${fall}</span></li>
					</ul>
				</li>
			</ul>
			<p>
				<b>Lessons:</b>
				please contact the club head pro <b>Milica Stamenic</b>
				at <a href="tel:+437-984-7792">437-984-7792</a> or
				<a href="mailto:s_milica@hotmail.com">s_milica@hotmail.com</a>,
				<b>Michael Qian</b>
				(Mandarin only) <a href="mailto:stringhome.ca@hotmail.com">stringhome.ca@hotmail.com</a>
				or <b>Akemi Seiriki</b> <a href="mailto:akemitennis@gmail.com">akemitennis@gmail.com</a>.
			</p>
			<p>
				<b>Privacy policy:</b>
				We value and respect your privacy. Your personal information will never be used without your consent for any
				purpose other than relating to WWTC. Membership information is confidential and is restrictively used by Wishing
				Well Tennis Club and the Scarborough Tennis Federation.
			</p>
			<p>
				<input type="checkbox" name="send-money" id="send-money" required>
				<label for="send-money"
					><b>Acknowledgement:</b>
					Please send a money transfer of the above total to <i>wishingwelltennis@hotmail.com</i>. A confirmation email
					will be sent to you shortly.</label
				>
			</p>
		</section>
		<PrimaryBtn label="Submit" type="submit" />
	</form>
</section>

{#snippet person(item: typeof dataFamily[number], i: number, hasClose = false)}
	{@const id = i ? `[${i}]` : ''}
	<section>
		<input
			type="text"
			maxlength="32"
			name="firstName{id}"
			placeholder="First name*"
			required
			pattern={'[A-Z]{1}[a-z]{1,32}'}
			title="eg., Martin"
			bind:value={item.firstName}
		>
		{#if i === 0}
			<input
				type="text"
				maxlength="32"
				name="lastName{id}"
				placeholder="Last name*"
				bind:value={lastName}
				required
				pattern={'[A-Za-z]{1,32}'}
			>
		{:else}
			<input
				type="text"
				maxlength="32"
				name="lastName{id}"
				placeholder="Last name*"
				bind:value={item.lastName}
				required
				pattern={'[A-Za-z]{1,32}'}
			>
		{/if}
		<select name="gender{id}" required bind:value={item.gender}>
			<option value="" disabled selected>Gender*</option>
			<option value="m">Male</option>
			<option value="f">Female</option>
			<option value="o">Other</option>
		</select>
		<select name="ageGroup{id}" required bind:value={item.age} onchange={totalReducer}>
			<option value="" disabled selected>Age group*</option>
			<option value="a">Adult</option>
			<option value="j">Junior</option>
		</select>
		{#if hasClose}
			<button type="button" title="remove this entry" onclick={() => rmFamily(i)}>×</button>
		{/if}
	</section>
{/snippet}

<!-- <Test /> -->

<style lang="scss">
	/* form */
	input,
	select {
		font-family: inherit;
		font-weight: 500;
		font-size: 1.6rem;
		padding: 8px 16px;
		margin: 0 4px 8px 0;
		border: none;
	}
	input:not([type="button"], [type="hidden"], [type="checkbox"], [type="radio"]) {
		min-width: 219px;

		&.long {
			min-width: 478px;
		}
	}
	@supports (-webkit-text-security: circle) {
		select {
			padding: 7px 14px;
		}
	}

	select[required]:invalid {
		color: #777;
	}
	.total {
		font-weight: 600;
		font-size: 2.6rem;
		line-height: 8rem;
		user-select: none;
		margin: 40px 0 20px;
		border-top: darkgray dashed 1px !important;

		&::before {
			content: "Total: $";
		}
	}
	button,
	[type="button"] {
		cursor: pointer;
	}
	.lessons,
	.address,
	.additional,
	.contact {
		padding-top: 20px;

		h2 {
			font-size: inherit;
			font-weight: 600;
			margin: 0 0 6px;
			border-top: darkgray dashed 1px;
			opacity: 1;
		}
	}
	.additional {
		&::before {
			content: "";
			display: block;
			padding-top: 12px;
			border-top: darkgray dashed 1px;
		}
		h2 {
			display: inline-block;
			border: none;
			padding: 0;
		}
		button {
			cursor: pointer;
			appearance: none;
			font-size: 1.6rem;
			line-height: 24px;
			font-family: sans-serif;
			font-weight: 600;
			padding: 0;
			width: 22px;
			height: 22px;
			border: none;
			border-radius: 50%;
			color: #636;
			text-shadow: 0 1px white;
			background-color: #eee;
			box-shadow:
				grey 0 1px 3px,
				#fff 0 1px 1px inset;
			background-image: linear-gradient(180deg, #ddd, transparent);

			&:hover {
				background-color: #636;
				background-image: none;
				color: #fff;
				box-shadow: none;
				text-shadow: none;
			}
			&.plus {
				color: var(--primary);
				border-color: var(--primary);
				margin-left: 1em;
				width: auto;
				min-width: 22px;
				user-select: none;

				&:hover {
					background-color: var(--primary);
					color: #fff;
				}

				&:disabled {
					pointer-events: none;
					color: gray;
				}
			}
		}
	}
	.lessons {
		display: none;

		label {
			margin-right: 30px;
		}
	}
	.info {
		font-size: 1.4rem;
		line-height: 2rem;
		padding-bottom: 2em;

		@media only screen and (width > 768px) {
			columns: 2;
			column-gap: 4em;
			column-rule: gray dotted 1px;
			p {
				margin-top: 0;
				page-break-inside: avoid;
			}
			#send-money {
				margin-bottom: 3em;
			}
		}

		label[for="send-money"] {
			cursor: pointer;
		}
		b {
			font-weight: 600;
		}
	}
	#disclaimer {
		font-size: 1.3rem;
		line-height: 2rem;
		border-top: none !important;
		overflow: hidden;
		max-height: 20px;
		transition: max-height 0.3s ease-in-out;

		&[aria-hidden="false"] {
			max-height: 120px;
		}
		& > div {
			padding: 20px 0;
		}
	}
	.total,
	#disclaimer + .a {
		border: darkgray solid 1px;
		border-left: none;
		border-right: none;
	}
	#disclaimer + .a {
		display: block;
		margin: -1em 0 2em;
		padding: 0 0 1em;
		text-transform: uppercase;
		font-size: 1.3rem;
		border-top: none;
		border-bottom: #a9a9a9 solid 1px !important;
		background-color: #ddd;
		position: relative;
		z-index: 1;

		button {
			background: none;
			border: none;
			padding: 0;
			color: var(--secondary-light);
		}

		button::after {
			content: "";
			display: inline-block;
			width: 17px;
			height: 17px;
			background-repeat: no-repeat;
			background-position: center;
			background-image: url('data:image/svg+xml,\00003csvg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\00003cpath fill="rgb(119,68,119)" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">\00003c/path>\00003c/svg>');
			vertical-align: sub;
			transition: rotate 0.3s linear 0.3s;
			border: transparent solid 1px;
			border-inline: none;
			translate: 0 1px;
		}

		button:hover::after {
			border-color: #ddd;
		}

		button:not(:hover) {
			border-bottom: none;
		}
	}

	#disclaimer[aria-hidden="false"] + .a button::after {
		rotate: 180deg;
	}

	:is(.dollar-adult, .dollar-adult-eb, .dollar-junior)::before {
		content: "$";
	}
	[type="checkbox"] {
		margin-top: 6px !important;
		margin-left: -21px !important;
	}
	span.count {
		user-select: none;
		font-size: 1.3rem;
		color: #666;
	}
	span.bold {
		font-weight: 600;
	}

	.returning {
		font-size: 1.3rem;
		padding-top: 1em;

		input {
			margin-right: 4px;
			translate: 0 1px;
		}
		label {
			margin-right: 2em;
			font-size: 1.6rem;
			cursor: pointer;
		}
	}

	input:is([type="radio"], [type="checkbox"]) {
		pointer-events: none;
		opacity: 0;
		position: absolute;
		margin-left: 3px;
		margin-top: 8px;

		& + label {
			user-select: none;
		}
		& + label::before {
			content: "";
			display: inline-block;
			width: 18px;
			height: 18px;
			border: #fff solid 4px;
			border-radius: 50%;
			background-color: #fff;
			margin-right: 6px;
			vertical-align: sub;
			box-sizing: border-box;
			box-shadow: darkgrey 0 1px 2px;
		}
		&:focus + label::before,
		& + label:hover::before {
			box-shadow:
				darkgrey 0 1px 2px,
				var(--primary) 0 0 4px 1px;
		}
		&:checked + label::before {
			background-color: gray;
		}
		&:not([type="checkbox"]):checked + label:hover::before {
			background-color: #350;
		}
	}
	input[type="checkbox"] {
		& + label::before {
			float: left;
			border: none;
			border-radius: 3px;
			margin-bottom: 3em;
		}
		&:checked + label::before {
			content: "\2713";
			background-color: #fff;
			text-align: center;
			font-weight: bold;
			color: #350;
		}
	}

	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) {
			select {
				appearance: none;
				border-radius: 0;
				&[required]:invalid {
					color: #aaa;
				}
			}
			.returning input {
				translate: 0 -1px;
			}
		}
	}

	h1 {
		text-transform: initial;
	}

	@media only screen and (width <= 768px) {
		input:not([type="button"], [type="hidden"], [type="checkbox"], [type="radio"]) {
			min-width: unset;
			max-width: 8em;

			&.long {
				min-width: calc(18em + 8px);
			}
		}
	}

	input:-webkit-autofill,
	input:-webkit-autofill:is(:hover, :focus, :active) {
		box-shadow: 0 0 0 30px #deb inset !important;
	}
</style>
