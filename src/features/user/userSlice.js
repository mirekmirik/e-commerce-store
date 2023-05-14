import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import { handleErrors, throwError } from "../../utils/common"


// const checkEmailHttp = async (email) => {
//     const res = await fetch(`${BASE_URL}/users/is-available`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             email
//         })
//     })
//     if (!res.ok) {
//         await throwError(res)
//     }
//     const data = await res.json()
//     return data
// }

export const createUser = createAsyncThunk('users/createUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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


export const loginUser = createAsyncThunk('users/loginUser', async (payload, thunkAPI) => {
    try {

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        if (!res.ok) {
            await throwError(res)
        }

        const { access_token } = await res.json()

        const login = await fetch(`${BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })

        if (!login.ok) {
            await throwError(res)
        }

        const loginData = await login.json()
        return loginData
    } catch (error) {
        return handleErrors(error, thunkAPI)
    }
})


export const updateUser = createAsyncThunk('users/updateUser', async (payload, thunkAPI) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${payload.id}`, {
            method: "PUT",
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


const initialState = {
    currentUser: null,
    cart: [],
    favourites: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
    errorMessage: null
}

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload
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



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, { payload }) => {
            const found = state.cart.find(({ id }) => id === payload.id)
            if (found) {
                const newCart = state.cart.map((item) => {
                    return item.id === payload.id ? { ...item, quantity: payload.quantity || item.quantity + 1 } : item
                })
                state.cart = newCart
            } else {
                state.cart.push({ ...payload, quantity: 1 })
            }
        },
        addItemToFavourites: (state, { payload }) => {
            const found = state.favourites.findIndex(({ id }) => id == payload.id)
            if (found >= 0) {
                state.favourites.splice(found, 1)
            } else {
                state.favourites.push(payload)
            }
        },
        removeItemFromCart: (state, { payload }) => {
            const found = state.cart.findIndex((element) => element.id == payload)
            state.cart.splice(found, 1)
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload
        },

        toggleFormType: (state, { payload }) => {
            if (state.formType === 'signup') {
                state.formType = 'login'
            } else {
                state.formType = 'signup'
            }
        },
        logoutAccount: (state) => {
            return {
                ...initialState
            }
        },
        setErrorMessageReducer: setErrorMessage
    },
    extraReducers: (builder) => {
        // Create User
        builder.addCase(createUser.pending, setIsLoading)
        builder.addCase(createUser.fulfilled, addCurrentUser)
        builder.addCase(createUser.rejected, setErrorMessage)
        // Login User
        builder.addCase(loginUser.pending, setIsLoading)
        builder.addCase(loginUser.fulfilled, addCurrentUser)
        builder.addCase(loginUser.rejected, setErrorMessage)
        // Update User
        builder.addCase(updateUser.pending, setIsLoading)
        builder.addCase(updateUser.fulfilled, addCurrentUser)
        builder.addCase(updateUser.rejected, setErrorMessage)
    }
})

export const logoutUser = () => (dispatch) => {
    dispatch({ type: "RESET" })
    dispatch(logoutAccount())
}


export const { addItemToCart, addItemToFavourites, toggleForm, toggleFormType, setErrorMessageReducer, logoutAccount, removeItemFromCart } = userSlice.actions
export default userSlice.reducer