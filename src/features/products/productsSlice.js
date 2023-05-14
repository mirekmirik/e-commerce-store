import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import { handleErrors, shuffle, throwError } from "../../utils/common"
import { create } from "lodash"


export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products`)

        if (!res.ok) {
            await throwError(res)
        }

        const data = await res.json()
        return data
    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})

export const getProduct = createAsyncThunk('products/getProduct', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${payload}`)

        if (!res.ok) {
            await throwError(res)
        }

        const data = await res.json()
        return data
    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})

export const createProduct = createAsyncThunk('/products/createProduct', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        if (!res.ok) {
            await throwError(res)
        }

        const data = await res.json()
        return data

    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})


export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${payload}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            await throwError(res)
        }
        const data = await res.json()
        return data

    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})

export const updateProduct = createAsyncThunk('/products/updateProduct', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/products/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            await throwError(res)
        }
        const data = await res.json()
        return data

    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})


const addToState = (state, { payload }, property) => {
    state.isLoading = false
    state[property] = payload
    state.errorMessage = null
}

const setIsLoading = (state, { payload }) => {
    state.isLoading = true
    state.errorMessage = null

}

const setErrorMessage = (state, { payload }) => {
    state.errorMessage = payload
    state.isLoading = false
}


const initialState = {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
    createdProducts: [],
    createdProduct: '',
    errorMessage: null,
    isDeletedProduct: false,
    product: ''
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, action) => {
            state.filtered = state.list.filter(({ price }) => price < action.payload)
        },
        getRelatedProducts: (state, action) => {
            const list = state.list.filter(({ category: { id } }) => id === action.payload)
            state.related = shuffle(list)
        },
        removeCreatedProduct: (state, { payload }) => {
            state.createdProducts = state.createdProducts.filter(({ id }) => id !== payload)
        },
        setErrorMessageReducer: setErrorMessage
    },
    extraReducers: (builder) => {
        // Get Products
        builder.addCase(getProducts.pending, setIsLoading);
        builder.addCase(getProducts.fulfilled, (state, { payload }) => addToState(state, { payload }, "list"))
        builder.addCase(getProducts.rejected, setErrorMessage)


        // Get Product
        builder.addCase(getProduct.pending, setIsLoading);
        builder.addCase(getProduct.fulfilled, (state, { payload }) => addToState(state, { payload }, "product"))
        builder.addCase(getProduct.rejected, setErrorMessage)


        // Create Product
        builder.addCase(createProduct.pending, (state, { payload }) => {
            state.createdProduct = null
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(createProduct.fulfilled, (state, { payload }) => {
            state.createdProduct = payload
            state.createdProducts.push(payload)
            state.isLoading = false
            state.errorMessage = null
        })
        builder.addCase(createProduct.rejected, (state, { payload }) => {
            state.createdProduct = null
            state.isLoading = false
            state.errorMessage = payload
        })

        // Delete Product
        builder.addCase(deleteProduct.pending, (state, { payload }) => {
            state.isDeletedProduct = false
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.isDeletedProduct = payload
            state.isLoading = false
            state.errorMessage = null
        })
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.isDeletedProduct = false
            state.isLoading = false
            state.errorMessage = payload
        })

        // Update Product
        builder.addCase(updateProduct.pending, (state, { payload }) => {
            state.isLoading = true
            state.errorMessage = null
        })
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            const findIdxElement = state.createdProducts.findIndex(({ id }) => id == payload.id)
            state.createdProducts[findIdxElement] = payload
            state.createdProduct = payload
            state.isLoading = false
            state.errorMessage = null
        })
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.isLoading = false
            state.errorMessage = payload
        })
    }
})

export const { filterByPrice, getRelatedProducts, setErrorMessageReducer, removeCreatedProduct } = productsSlice.actions

export default productsSlice.reducer