import * as D3 from 'd3'
import _ from 'lodash'

const pointR = 4
const pointFill = 'lightgrey'
const hoverR = pointR * 2

// selected
const drawColour = '#17a2b8'
const drawR = pointR * 2

export class Drawing {

	constructor(rootElement, initialPoints){

		this.xMax = 20;
		this.yMax = 20;

		this.$root = D3.select(rootElement)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.on('contextmenu', (event, d, e) => {

				event.preventDefault()

			})

	}


	draw(drawing = []){

		this.createGrid()

	}


	setScales(){

		this.scaleX = D3.scaleLinear()
			.domain([0, this.xMax])
			.range([0, parseFloat(this.$root.style('width'))])

		this.scaleY = D3.scaleLinear()
			.domain([0, this.yMax])
			.range([0, parseFloat(this.$root.style('height'))])

	}


	getXShift(){
		// how much to shift points so their center is on the point
		return -(this.scaleX(0.5))

	}


	getYShift(){

		return -(this.scaleY(0.5))

	}


	positionPoint($point, data){

		// move point to the correct position based on its data, including shifting it so the center of the circle is on the point
		$point
			.attr('cx', d => this.scaleX(d.x))
			.attr('cy', d => this.scaleY(d.y))
			.attr('transform', `translate(${this.getXShift()}, ${this.getYShift()})`)

	}


	createGrid(){

		this.setScales()



		// build an array of gridpoints based on the maximum value we have
		const gridPoints = []

		for(let iX = 1; iX <= this.xMax; iX++){
			for(let iY = 1; iY <= this.yMax; iY++){
				gridPoints.push({x: iX, y:iY})
			}
		}


		const $groups = this.$root
			.selectAll('.gridPoint')
			.data(gridPoints)
			.join('g')

		$groups
			// hover effect on grid points
			.on('mouseover', function(){

				D3.select(this)
					.selectAll('.gridPoint')
					.attr('r', hoverR)

			})
			.on('mouseout', function(){

				D3.select(this)
					.selectAll('.gridPoint')
					.attr('r', pointR)

			})
			// add point to drawing
			.on('click', (el, d) => this.addPoint(d))

		$groups.exit()
			.remove()

		// create grid dot
		const positionPoint = this.positionPoint.bind(this)

		$groups.append('circle')
			.attr('class', 'gridPoint')
			.attr('r', pointR)
			.style('fill', pointFill)
			.style('cursor', 'pointer')
			.each(function(d){ positionPoint(D3.select(this), d) })

	}


	draw(pointsToDraw){

		// draw links first so they are beneath the points
		const links = _.compact(pointsToDraw.map((point, i) => {

			if(i == 0){
				return null
			}

			return {
				source: pointsToDraw[i-1],
				target: point
			}

		}))

		const hLinker = this.getVerticalLinker()
		const vLinker = this.getHorizontalLinker()

		this.$root
			.selectAll('.link')
			.data(links)
			.join('path')
				.attr('class', 'link')
				.attr('fill', 'none')
				.attr('stroke', drawColour)
				.attr('stroke-width', drawR)
				.attr('d', d => {

					// work out the angle of the link
					const xLength = Math.abs(d.source.x - d.target.x)
					const yLength = Math.abs(d.source.y - d.target.y)

					// ratio of opposite to adjacent
					const angleRad = Math.atan(yLength / xLength)
					// convert to degrees
					const angleDeg = angleRad * 180 / Math.PI

					// pointing up? vertical linkage. pointing to the side? horizontal
					return angleDeg < 45 ? vLinker(d) : hLinker(d)

				})


		// create actual points
		const positionPoint = this.positionPoint.bind(this)

		const $drawnPoints = this.$root
			.selectAll('.point')
			.data(pointsToDraw, data => `${data.x}:${data.y}`)
			.join('circle')
				.attr('r', drawR)
				.each(function(d){ positionPoint(D3.select(this), d) })
				.style('fill', drawColour)
				.attr('class', 'point')
				.style('cursor', 'pointer')
				.on('click', (el, d, e) => this.addPoint(d))
				.on('contextmenu', (event, d, e) => this.removePoint(d))

	}



	addPoint(newPoint){


		const $drawnPoints = this.$root
			.selectAll('.point')

		// redraw with this point added
		this.draw($drawnPoints.data().concat([newPoint]))

	}

	removePoint(toRemove){

		const $drawnPoints = this.$root
			.selectAll('.point')

		// redraw with this point removed from the data
		this.draw($drawnPoints.data().filter(existingPoint => !_.isEqual(existingPoint, toRemove)))

	}

	getHorizontalLinker(){

		return D3.linkHorizontal()
			.x(d => d ? this.scaleX(d.x) + this.getXShift() : null)
			.y(d => d ? this.scaleY(d.y) + this.getYShift() : null)

	}

	getVerticalLinker(){

		return D3.linkVertical()
			.x(d => d ? this.scaleX(d.x) + this.getXShift() : null)
			.y(d => d ? this.scaleY(d.y) + this.getYShift() : null)

	}

	// actions

	clear(){

		this.draw([])

	}

	getDrawingData(){

		return this.$root
			.selectAll('.point')
			.data()


	}

}