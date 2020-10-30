<template>
	<transition name="fade">
		<div class="modalWrap" v-if="showModal">
			<div class="modal d-block">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Save your drawing</h5>
							<button type="button" class="btn btn-close" @click="close" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<p>To save your drawing to the database, please provide a name for it:</p>
							<form>
								<div>
									<input
										type="text"
										class="form-control"
										placeholder="Enter a name for your drawing"
										v-model="drawingName"
									/>
									<div :class="`invalid-feedback${valid ? '' : ' d-block'}`">
										Please enter a name that is at least 3 characters long.
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" @click="close">
								Cancel
							</button>
							<button type="button" class="btn btn-primary" @click="update">
								Save drawing
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-backdrop d-block"></div>
		</div>
	</transition>
</template>

<script>

import { ref, watch } from 'vue'


const validateName = (value) => {

	return value && value.length >= 3

}

export default {

	name: 'CollectDetails',

	props: {

		showModal: {
			type: Boolean
		}

	},

	setup(props, { emit }){

	
		// validation		
		const valid = ref(true)

		const validateInput = (toValidate) => {

			valid.value = validateName(toValidate)

		}


		// name data
		const drawingName = ref('')
		watch(drawingName, (newValue) => validateInput(newValue))


		// buttons
		const update = () => {

			validateInput(drawingName.value)

			if(valid.value){
				emit('collected', {
					drawingName: drawingName.value
				})
				emit('closed')
			}

		}

		const close = () => {

			emit('closed')

		}

		return {
			drawingName,
			valid,
			update,
			close
		}


	}

}

</script>



<style lang="scss" scoped>

.modal-backdrop {
	opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

</style>