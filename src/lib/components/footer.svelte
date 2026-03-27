<script lang="ts">
	const list: Profile[] = [
		{
			name: 'Club',
			occupation: '',
			email: 'wishingwelltennis@hotmail.com'
		},
		{
			name: 'Milica Stamenic',
			occupation: 'head pro',
			email: 's_milica@hotmail.com'
		},
		{
			name: 'Michael Qian',
			occupation: 'instructor',
			email: 'stringhome.ca@hotmail.com'
		},
		{
			name: 'Akemi Seiriki',
			occupation: 'instructor',
			email: 'akemitennis@gmail.com'
		}
	] as const;

	type Profile = { [K in 'name' | 'occupation' | 'email']: string };
</script>

<footer>
	<div>
		{#each list as item, i}
			{@const [first, last] = item.name.split(' ')}
			<p class={i ? null : 'club'}>
				{first} <span>{last}</span>{@html item.occupation ? ' &bull;' : ''} {item.occupation}
				<span><a href="mailto:{item.email}">{item.email}</a></span>
			</p>
		{/each}
	</div>
</footer>

<style>
	footer {
		background-color: #333;
		background-image: url("$lib/assets/ww.jpg");
		background-repeat: no-repeat;
		background-position: right 85%;
		background-blend-mode: multiply;

		& > div {
			color: #ccc;
			font-size: 1.3rem;

			@media only screen and (width > 768px) {
				display: grid;
				grid-template-columns: 1fr 1fr;
			}

			a:link {
				color: oklch(from var(--primary) 0.8 c h);
				text-decoration: none;
				text-shadow: 0 1px 2px #000;

				&:is(:hover, :focus) {
					/*border-bottom: var(--primary) dotted 1px;*/
					text-decoration: underline;
				}
				&:visited {
					color: var(--primary);
				}
			}

			span:has(a:link) {
				display: block;
			}

			p {
				margin-bottom: 2em;

				&::before {
					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4'/%3E%3C/svg%3E");
					float: left;
					filter: invert(0.7);
					margin-right: 10px;
				}

				&.club::before {
					content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19.52 2.49C17.18.15 12.9.62 9.97 3.55c-1.6 1.6-2.52 3.87-2.54 5.46c-.02 1.58.26 3.89-1.35 5.5l-4.24 4.24l1.42 1.42l4.24-4.24c1.61-1.61 3.92-1.33 5.5-1.35s3.86-.94 5.46-2.54c2.92-2.93 3.4-7.21 1.06-9.55m-9.2 9.19c-1.53-1.53-1.05-4.61 1.06-6.72s5.18-2.59 6.72-1.06c1.53 1.53 1.05 4.61-1.06 6.72s-5.18 2.59-6.72 1.06M18 17c.53 0 1.04.21 1.41.59c.78.78.78 2.05 0 2.83c-.37.37-.88.58-1.41.58s-1.04-.21-1.41-.59c-.78-.78-.78-2.05 0-2.83c.37-.37.88-.58 1.41-.58m0-2a3.998 3.998 0 0 0-2.83 6.83c.78.78 1.81 1.17 2.83 1.17a3.998 3.998 0 0 0 2.83-6.83A4 4 0 0 0 18 15'/%3E%3C/svg%3E");
				}

				span:not(:has(a:link)) {
					text-transform: uppercase;
				}
			}
		}
	}
</style>
