export const checkModelExist = async (Model, query, shouldExist, statusCode, errorMessage) => {
    //  ver si existe
     const document = await Model.findOne(query)

        // Si deberia existir y no existe
        if(shouldExist && !document){
            const error = new Error(errorMessage)
            error.statusCode = statusCode
            throw error
        }

       // No deberia existir y existe
            if(!shouldExist && document){
                const error = new Error(errorMessage)
                error.statusCode = statusCode
                throw error
            }

    // retornar documento encontrado o null si no lo encuentra
    return document
}