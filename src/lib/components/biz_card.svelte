<script lang="ts">
	const { email, id, name, cell, title, sms, active }: Card = $props();
</script>
<script module>
	export type Card = { [K in 'id' | 'title' | 'name' | 'email' | 'cell']: string } & {
		[K in 'sms' | 'active']?: boolean;
	};
</script>

<div class="biz-card {active ? 'active' : ''}" {id}>
	{title}
	<div class="name">&emsp;{name}&emsp;</div>
	<div>
		<div>{sms ? 'sms:' : 'c:'} {@html !cell ? 'N/A' : sms ? cell : `<a href="tel:+${cell}">${cell}</a>`}</div>
		<div><a href="mailto:{email}">{email}</a></div>
	</div>
</div>

<style>
	:global(.cards) {
		display: flex;
		flex-wrap: wrap;
		padding-top: 2em;
		justify-content: space-between;

		@media only screen and (max-width: 1200px) {
			justify-content: space-evenly;
		}
	}

	.biz-card {
		margin-bottom: 2em;
		width: 350px;
		height: 200px;
		display: inline-flex;
		flex-direction: column;
		background: linear-gradient(0deg, #eee, #ccc);
		box-shadow: darkgray 0 1px 2px;
		padding: 1.5em;
		box-sizing: border-box;
		text-align: center;
		text-shadow: 0 1px white;
		user-select: none;

		&.active {
			background: white;
		}

		@supports (-webkit-text-security: circle) {
			&:hover {
				translate: 0 -1px;
				box-shadow: darkgray 0 2px 3px;
			}
		}

		.name {
			font-weight: 600;
			padding-top: 1em;
			font-size: 2.4rem;
			flex: 1;

			&::before,
			&::after {
				content: "*";
				display: inline-block;
				translate: 0 4px;
			}
		}

		div:last-of-type {
			display: flex;
			justify-content: space-between;
			font-size: 1.3rem;
			line-height: normal;
		}
	}
</style>
