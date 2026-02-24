<footer>
	<div>
		<p>Club &rarr; <a href="mailto:wishingwelltennis@hotmail.com">wishingwelltennis@hotmail.com</a></p>
		<!-- <p>Marina Mihailovich (president) &rarr; <a href="mailto:marinatenis@yahoo.ca">marinatenis@yahoo.ca</a></p>
			<p>Bill Edward (treasurer) &rarr; <a href="mailto:billedward1000@gmail.com">billedward1000@gmail.com</a></p> -->
		<p>Milica Stamenic (head pro) &rarr; <a href="mailto:s_milica@hotmail.com">s_milica@hotmail.com</a></p>
		<p>Michael Qian (instructor) &rarr; <a href="mailto:stringhome.ca@hotmail.com">stringhome.ca@hotmail.com</a></p>
		<p>Akemi Seiriki (instructor) &rarr; <a href="mailto:akemitennis@gmail.com">akemitennis@gmail.com</a></p>
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
			@media only screen and (min-width: 769px) {
				column-count: 2;
			}
			a:link {
				color: var(--primary);
				text-decoration: none;
				text-shadow: 0 1px 2px #000;
				&:is(:hover, :focus) {
					border-bottom: var(--primary) dotted 1px;
				}
				&:visited {
					color: var(--primary);
				}
			}
			p:first-child {
				margin-block-start: 0;
			}
		}
	}
</style>
