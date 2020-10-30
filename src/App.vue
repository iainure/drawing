<template>
	<div class="layout">
		<header>
			<nav class="navbar navbar-light navbar-expand">
				<ul class="navbar-nav">
					<li :key="item.path" v-for="item in menu" class="nav-item">
						<router-link :class="`nav-link`" :to="item.path">{{ item.label }}</router-link>
					</li>
				</ul>
			</nav>
		</header>
		<section>
			<router-view v-slot="{ Component }">
				<transition name="fade-up" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</section>
		<Footer />
	</div>
</template>

<script>

import { reactive } from 'vue'
import Footer from '@/components/Footer'

export default {

	components: {
		Footer
	},

	setup () {

		const menu = reactive([
			{
				path: '/',
				label: 'Home'
			},
			{
				path: '/list',
				label: 'List'
			},
			{
				path: '/about',
				label: 'About'
			}
		])

		return {
			menu
		}

	}

}

</script>

<style lang="scss" scoped>

.layout {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr minmax(500px, 1200px) 1fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas: 
	'. header .'
	'. main .'
	'. footer .';
}

header {
	grid-area: header;
}

section {
	grid-area: main;
}


.fade-up-enter-active,
.fade-up-leave-active {
  transition: transform 0.1s ease-in, opacity 0.1s ease-out;
}

.fade-up-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}

.fade-up-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.fade-up-leave-from,
.fade-up-enter-to {
  transform: translateX(0);
  opacity: 1;
}


</style>
