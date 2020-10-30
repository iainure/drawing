<template>
	<div class="page">
		<h1>Drawing List</h1>
		<div v-if="loading" class="w-100 d-flex justify-content-center m-3">
			<div class="loadingDrawings spinner-grow text-primary"></div>
		</div>

		<div v-else class="list pt-3" >
			
			<p class="text-center" v-if="!drawings.length" >
				No drawings created yet
			</p>

			<ul class="list-group" v-else>
				<ListItem
					v-for="drawing in drawings"
					:key="drawing.DrawingId"
					:drawing="drawing"
					@deleted="remove"
				/>
			</ul>

		</div>
	</div>
</template>


<script>

import { ref, reactive } from 'vue'
import ListItem from '@/components/ListItem'
import api from '@/api'

export default {

	name: 'List',

	components: {
		ListItem
	},

	setup(){

		let loading = ref(true)
		let drawings = ref([])

		const loadList = async function(){

			try {

				let res = await api.loadList()
				drawings.value = res.Items.sort()

			}

			catch (err){

				throw new Error('Unable to load drawing list: ' + err)

			}
			
			finally {
				loading.value = false
			}

		}

		const remove = (idToRemove) => {

			drawings.value = drawings.value.filter(drawing => drawing.DrawingId != idToRemove)

		}

		loadList()

		return {
			loading,
			drawings,
			remove
		}

	}


}

</script>


<style lang="scss" scoped>

.loadingDrawings {
	width: 3rem;
	height: 3rem;
}

</style>