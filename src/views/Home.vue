<template>
	<Page>
		<div class="home">
			<section class="head">
				<h1>Draw something</h1>
				<p>Left click on a point to draw. Right click on a point to remove it.</p>
			</section>
			<section>
				<Drawing />
			</section>
		</div>
	</Page>
</template>

<script>
import Page from '@/components/Page.vue'
import Drawing from '@/components/Drawing.vue'

export default {
	name: 'Home',
	components: {
		Page,
		Drawing
	}
}

</script>

<style lang="scss" scoped>

.home {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: auto;
	height: 100%;
	width: 100%;
}


</style>
