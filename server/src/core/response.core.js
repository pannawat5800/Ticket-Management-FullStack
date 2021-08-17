class ResponseCore {

    success(data) {
        return {
            status: "Success",
            data: data
        }
    }

    invalideRequest(error) {
        return {
            status: "InvalideRequest",
            error: error
        }
    }

    internalError(error) {
        return {
            status: "InternalError",
            error: error
        }
    }

}

module.exports.ResponseCore = ResponseCore