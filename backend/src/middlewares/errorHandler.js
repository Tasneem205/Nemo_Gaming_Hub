import responses from "./responses.js";
function errorHandler(err, req, res, next) {
    console.log(err);
    responses.internalServerError(res);
}

export default errorHandler;