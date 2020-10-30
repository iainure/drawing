const urlRoot = 'https://wfb05mfty7.execute-api.eu-west-2.amazonaws.com/test/drawing?TableName=Drawing'

const apiKey = process.env.VUE_APP_API_KEY


const apiCall = async (method = 'GET', body) => {

	try {

		let res = await fetch(urlRoot, {
			method: method,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': apiKey
			},
			body: JSON.stringify(body)
		})

		let resJSON = await res.json()
		return resJSON

	}

	catch(err){

		return Promise.reject(err)

	}
}

export const loadList = async () => {

	return await apiCall('GET')

}

export const save = (drawingData) => {

	return apiCall('POST', drawingData)

}

export const destroy = (drawingId) => {

	return apiCall('DELETE', {
		TableName : 'Drawing',
		Key: {
			DrawingId: drawingId
		}
	})

}

export default {
	save,
	loadList,
	destroy
}