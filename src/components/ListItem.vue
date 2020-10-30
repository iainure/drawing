<template>

	<li class="list-group-item">
		
		<div class="row">
			<div class="col-9 d-flex align-items-center">
				<h5 class="mb-0">{{ drawing.drawingName }}</h5>
			</div>
			<div class="col-3">
				<div class="d-flex justify-content-end">
					<Button
						v-bind="viewButtonBindings"
						class="mr-3"
						@click="toggleView(!viewing)"
					/>
					<Button
						variant="danger"
						iconName="trash"
						@click="deleteDrawing"
						:state="deleteButtonState"
					>{{ deleteButtonText }}</Button>
				</div>
			</div>
		</div>

		<div class="overflow-hidden">
			<transition name="slide-down">
				<div v-if="viewing" class="mt-3 mb-3">
					<Drawing v-model="localDrawing" />
				</div>
			</transition>
		</div>
	</li>

</template>

<script>

import { ref, computed, reactive } from 'vue'
import api from '@/api'
import Button from '@/components/Button'
import Drawing from '@/components/Drawing.vue'

export default {

	name: 'ListItem',

	components: {
		Button,
		Drawing
	},

	props: {

		drawing: {
			type: Object,
			required: true
		}

	},

	setup(props, { emit }){

		// make a local copy so we can modify
		const localDrawing = reactive(Object.assign({}, props.drawing))

		let viewing = ref(false)

		let deleteButtonState = ref('ready')
		let deleteButtonText = ref('Delete')

		const deleteDrawing = async () => {

			try {

				deleteButtonState.value = 'inProgress'
				deleteButtonText.value = 'Deleting'

				await api.destroy(props.drawing.DrawingId)

				deleteButtonState.value = 'success'
				deleteButtonText.value = 'Deleted!'

				setTimeout(() => {

					emit('deleted', props.drawing.DrawingId)

				}, 1000)

			}

			catch (err){

				deleteButtonState.value = 'error'
				deleteButtonText.value = 'Unable to delete'
				throw new Error(`Unable to delete drawing ${props.drawing.DrawingId}: ${err}`)

				setTimeout(() => {
					
					deleteButtonState.value = 'ready'
					deleteButtonText.value = 'Delete'

				}, 3000)

			}

		}

		const toggleView = (bool) => viewing.value = bool
		
		const viewButtonBindings = computed(() => {

			if(viewing.value){

				return {
					buttonText: 'Close',
					iconName: 'x-square',
					variant: 'light'
				}

			}else{

				return {
					buttonText: 'View',
					iconName: 'eye',
					variant: 'secondary'
				}

			}

		})

		return {
			localDrawing,
			deleteButtonState,
			deleteButtonText,
			deleteDrawing,
			viewing,
			toggleView,
			viewButtonBindings
		}


	}

}

</script>



<style lang="scss" scoped>

.slide-down-enter-active,
.slide-down-leave-active {
  transition: height 0.2s ease-in;
}

.slide-down-enter-from,
.slide-down-leave-to {
  height: 0;
}

.slide-down-leave-from,
.slide-down-enter-to {
  height: 800px;
}

</style>