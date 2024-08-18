function generateDatabaseDateTime(date) {
	return date.toISOString().replace('T',' ').substring(0, 19);
}
// Function to send a success response
const sendSuccessResponse = (res, type, data = null, statusCode = 200) => {
	return res.status(statusCode).json({
		type: type,
		result: 'success',
		timestamp: generateDatabaseDateTime(new Date()),
		error:'',
		data
	});
};

// Function to send an error response
const sendErrorResponse = (type=null, res, message, statusCode = 500) => { 
	return res.status(statusCode).json({
		type: type,
		result: 'failure',
		timestamp: generateDatabaseDateTime(new Date()),
		error: message,
		data: {}
	});
};

export default {
	sendSuccessResponse,
	sendErrorResponse
};
