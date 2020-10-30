<template>
	<div class="drawing d-flex flex-column h-100">
		<div class="toolbar d-flex justify-content-between mb-3 ml-1 mr-1">
			<Button
				variant="light"
				@click="clearDrawing"
				iconName="trash"
			>Clear</Button>
			<Button
				:state="saveButtonState"
				@click="saveDrawing"
				iconName="cloud-upload-fill"
			>{{ saveButtonText }}</Button>
		</div>
		<div class="root flex-grow-1" ref="rootRef"></div>
	</div>
	<CollectDetails
		:showModal="showModal"
		@collected="storeDetails"
		@closed="showModal = false"
	/>
</template>

<script>

import { ref, reactive, onMounted, computed } from 'vue'
import { Drawing } from '@/utils/drawing'
import CollectDetails from './CollectDetails'
import Button from './Button'
import api from '@/api'
import _ from 'lodash'

const generateUniqueDrawingId = (drawingName) => {

	return drawingName + (Date.now() * Math.round((Math.random()*10000)))

}

export default {

	name: 'Drawing',

	components: {
		CollectDetails,
		Button
	},

	props: {
		modelValue: {
			type: Object,
			default: () => {

				return {
					drawingName: null,
					points: []
				}

			}
		}
	},

	setup(props, { emit }){

		// create a local copy of the passed-in drawing details (or create a fresh one)
		const details = reactive(Object.assign({}, props.modelValue))

		let drawing
		const rootRef = ref(null) // root div will be assigned to this automatically after render

		const showModal = ref(false)

		onMounted(() => {

			// set up the drawing once we have a rendered element to attach to
			drawing = new Drawing(rootRef.value)
			drawing.createGrid()
			drawing.draw(details.points)

		})

		const clearDrawing = () => {

			if(drawing){
				drawing.clear()
			}

		}


		// saving
		let saved = false // have we saved once already at least?

		let saveButtonState = ref('ready')

		let saveButtonText = computed(() => {

			const drawingName = details.drawingName || 'drawing'

			switch(saveButtonState.value){

				case 'inProgress':
					return `Saving`
				
				case 'success':
					return `Saved!`

				case 'error':
					return `Unable to save drawing`

				default:
					return `Save ${drawingName}`

			}

		})


		// save our drawing to the API
		const saveDrawing = async () => {

			// have we already saved? if not, we need to collect a drawing name
			if(!details.drawingName){
				showModal.value = true
				return
			}

			saveButtonState.value = 'inProgress'

			// get the latest drawn points
			details.points = drawing.getDrawingData()

			try {
				let res = await api.save(details)

				// saved successfully!
				saveButtonState.value = 'success'
				emit('update:modelValue', details)

			}

			catch(err){

				// error on save
				saveButtonState.value = 'error'
			}

			finally {

				// reset
				setTimeout(() => {

					saveButtonState.value = 'ready'

				}, 3000)

			}

		}

		// recieve details from modal
		const storeDetails = (updatedDetails) => {

			Object.assign(details, updatedDetails, {
				DrawingId: generateUniqueDrawingId(updatedDetails.drawingName)
			})

			saveDrawing()

		}

		return {
			rootRef,
			showModal,
			clearDrawing,
			saveDrawing,
			storeDetails,
			saveButtonState,
			saveButtonText
		}

	},



}


</script>


<style lang="scss" scoped>

.root {
	height: 100%;
	min-height: 800px;
	width: 100%;
	min-width: 800px;
	border: 1px dashed lightgrey;
}

</style>