const errorsMiddleware= async (ctx, next) =>  {
	try {
		await next();
	} 
	catch(err) {
		let status = err.statusCode || err.status || 500;
		
		if(err.name === "ValidationError") {
			status = 400; 
		}
		
		ctx.status = status;
		
		ctx.body = {
			message: err.message
		};
	}
};

module.exports = errorsMiddleware;