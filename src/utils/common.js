
export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random())


export const throwError = async (res, err = null) => {
    const data = await res.json()
    throw new Error(JSON.stringify(data))
    // if (!res) {
    //     throw new Error(err.mesage)
    // }
    // const data = await res.json()
    // throw new Error(data)
}


export const handleErrors = (error, thunkAPI) => {
    const jsonError = JSON.parse(error.message)
    const errorMessage = Array.isArray(jsonError.message) ? jsonError.message.join(', ') : jsonError.message
    return thunkAPI.rejectWithValue(errorMessage)
}


export const buildUrl = (url, params) => {
    let urlWithParams = url;
    Object.entries(params).forEach(([key, value], idx) => {
        const sign = !idx ? '?' : '&'
        urlWithParams += `${sign}${key}=${value}`
    })

    return urlWithParams
}


export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0)
