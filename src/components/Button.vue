<template>

	<button
		:class="buttonClasses"
		:disabled="state == 'inProgress'"
	>
		<Icon
			v-if="!!iconName"
			:name="iconName"
			size="sm"
			class="mr-2"
		/>
		<slot v-if="useSlot"></slot>
		{{ (!useSlot ? buttonText : '') }}
		<div v-if="state == 'inProgress'" class="spinner-grow spinner-grow-sm text-light ml-3" role="buttonStatus"></div>
	</button>

</template>


<script>

import Icon from '@/components/Icon'
import { ref, computed, watch } from 'vue'

export default {

	name: 'Button',

	components: {
		Icon
	},

	props: {

		state: {
			type: String,
			default: 'ready',

		},

		buttonText: {
			type: String,
			default: 'Save'
		},

		variant: {
			type: String,
			default: 'primary'
		},

		iconName: {
			type: String
		}

	},

	setup(props, {slots}){

		const buttonClasses = computed(() => {

			const result = ['d-flex', 'align-items-center','btn']

			switch(props.state){

				case 'success':
					result.push('btn-success')
					break;

				case 'error':
					result.push('btn-danger')
					break;

				case 'inProgress':
					result.push('btn-primary')
					break;

				default:
					result.push(`btn-${props.variant}`)

			}

			return result

		})

		// accept button text via prop or slot. Slot takes precedence
		const useSlot = ref(!!slots.default)

		return {
			useSlot,
			buttonClasses
		}

	}

}

</script>