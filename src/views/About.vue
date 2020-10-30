<template>
	<div class="page">
		<h1>About</h1>
		<p>This application was built by Iain Ure to try out:
			<ul>
				<li>Vue 3 Composition API</li>
				<li>Vue CLI</li>
				<li>Bootstrap 5</li>
				<li>AWS
					<ul>
						<li>API Gateway</li>
						<li>Lambda</li>
						<li>S3</li>
					</ul>
				</li>
				<li>D3</li>
			</ul>
		</p>
		<p>Your art will not be used for any commercial purpose, even if I think it's incredible or culturally significant.</p>
		<p><a :href="githubUrl" >Github</a></p>
	</div>
</template>

<script>

import { githubUrl } from '@/utils/meta'

export default {

	name: 'About',

	setup(){

		return  {
			githubUrl
		}

	}

}

</script>
