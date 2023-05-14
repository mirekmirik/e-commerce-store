import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import { handleErrors, throwError } from "../../utils/common"

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/categories`)

        if (!res.ok) {
            await throwError(res)
        }
        const data = await res.json()
        return data
    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})

export const getAllProductsByCategory = createAsyncThunk('categories/getAllProductsByCategory', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/categories/${payload.id}/products`)

        if (!res.ok) {
            await throwError(res)
        }

        const data = await res.json()
        return data
    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})

const initialState = {
    list: [],
    products: [],
    isLoading: false,
}


const addToState = (state, { payload }, property) => {
    state[property] = payload
    state.isLoading = false
    state.errorMessage = null
}

const setIsLoading = (state, { payload }) => {
    state.isLoading = true
}

const setErrorMessage = (state, { payload }) => {
    state.errorMessage = payload
    state.isLoading = false
}


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        // Get all categories
        builder.addCase(getCategories.pending, setIsLoading);
        builder.addCase(getCategories.fulfilled, (state, { payload }) => addToState(state, { payload }, "list"))
        builder.addCase(getCategories.rejected, setErrorMessage)

        // Get Products by Category
        builder.addCase(getAllProductsByCategory.pending, setIsLoading);
        builder.addCase(getAllProductsByCategory.fulfilled, (state, { payload }) => addToState(state, { payload }, "products"))
        builder.addCase(getAllProductsByCategory.rejected, setErrorMessage)

    }
})

export default categoriesSlice.reducer