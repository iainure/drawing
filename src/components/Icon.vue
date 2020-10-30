<template>
	
	<component
		:is="IconSVG"
		:style="styles"
	></component>

</template>

<script>

// icon catalogue: https://icons.getbootstrap.com/

import { computed, defineAsyncComponent } from 'vue'

const getDimension = (size) => {

	switch(size){

		case 'sm':
			return '1'

		case 'lg':
			return '2'

		case 'md':
		default:
			return '1.5'

	}

}

export default {

	name: 'Icon',

	props: {

		name: {
			type: String,
			default: 'alarm'
		},

		size: {
			type: String,
			default: 'md'
		}

	},

	setup(props){

		const styles = computed(() => {

			const sizeValue = `${getDimension(props.size)}rem`

			return {
				height: sizeValue,
				width: sizeValue
			}

		})

		// load asynchronously to avoid loading all icons up front
		const IconSVG = computed(() => {
		
			const svgName = props.name // required to trigger reactivity
			return	defineAsyncComponent(() => import(`bootstrap-icons/icons/${svgName}.svg`))

		})

		return {
			styles,
			IconSVG
		}

	}

}

</script>