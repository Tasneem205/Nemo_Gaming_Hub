function success(res, message, data = {}) {
    return res.status(200).json({success: true, message, data});
}

function created(res, message, data = {}) {
    return res.status(201).json({success: true, message, data});
}

function badRequest(res, message) {
    return res.status(400).json({ success: false, message});
}

function unAuthorized(res, message) {
    return res.status(401).json({message: message});
}

function notFound(res, message) {
    return res.status(404).json({success: false, message});
}

function internalServerError(res) {
    return res.status(500).json({message: "Internal server error"});
}

const responses = {
    success,
    created,
    badRequest,
    unAuthorized,
    notFound,
    internalServerError
};

export default responses;
