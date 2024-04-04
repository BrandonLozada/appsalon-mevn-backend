import mongoose from 'mongoose'

function validateObjectId(id, res) {
    // Validar un Object id.
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El identificador no es válido.')
        return res.status(400).json({
            message: error.message
        })
    }
}

function handleNotFoundError(message, res) {
    const error = new Error(message)
    return res.status(404).json({
        message: error.message
    })
}

export {
    validateObjectId,
    handleNotFoundError
}