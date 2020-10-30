<template>
	<footer>
		<div class="footer-left">
			<p class="text-muted"><small>Built in Vue 3 with D3 and Bootstrap 5</small></p>
		</div>
		<div class="footer-right">
			<p class="text-muted">
				<small>
					Iain Ure
					<br><a :href="githubUrl">Github</a>
				</small>
			</p>
		</div>
	</footer>
</template>

<script>

import { githubUrl } from '@/utils/meta'

export default {

	name: 'Footer',

	setup(){

		return {
			githubUrl
		}

	}

}

</script>


<style lang="scss" scoped>

footer {
	grid-area: footer;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

</style>