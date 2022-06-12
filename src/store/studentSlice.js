import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { baseFetch } from '../api/baseFetch'
import { fileFetchApi } from '../api/fileFetchApi'

export const getStudentCourses = createAsyncThunk(
   'admin/slice/getStudentCourses',
   async (page, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: 'api/students/studentCourses',
            method: 'GET',
            params: {
               page,
               size: 1000,
            },
         })
         console.log(response)
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

export const getStudentTestById = createAsyncThunk(
   'admin/slice/getStudentTestById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await baseFetch({
            path: `api/tests/lesson/${id}`,
            method: 'GET',
         })
         return response
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

const initState = {
   isLoading: null,
   pages: 0,
   courses: [],
   coursesDetails: [],
   currentPage: 0,
   teachers: [],
   studentCourses: [],
   test: {
      questionResponses: [],
   },
   testTwo: [],
}
export const studentSlice = createSlice({
   name: 'course/slice',
   initialState: initState,
   reducers: {
      changeCheckBoxVariant(state, actions) {
         const { questionId, variantId, checked } = actions.payload
         const fQIndex = state.test.questionResponses.findIndex(
            (item) => item.questionId === questionId
         )
         const fVIndex = state.test.questionResponses[
            fQIndex
         ].variantResponses.findIndex((item) => item.id === variantId)
         state.test.questionResponses[fQIndex].variantResponses[
            fVIndex
         ].checked = !checked
      },
      changeRadioButtonVariant(state, actions) {
         const { questionId, variantId, checked } = actions.payload
         const fQIndex = state.test.questionResponses.findIndex(
            (item) => item.questionId === questionId
         )
         const variantResponses = state.test.questionResponses[
            fQIndex
         ].variantResponses.map((item) => {
            return { ...item, checked: false }
         })
         state.test.questionResponses[fQIndex].variantResponses =
            variantResponses
         const fVIndex = state.test.questionResponses[
            fQIndex
         ].variantResponses.findIndex((item) => item.id === variantId)
         state.test.questionResponses[fQIndex].variantResponses[
            fVIndex
         ].checked = !checked
      },
   },
   extraReducers: {
      [getStudentTestById.fulfilled]: (state, actions) => {
         const actionTest = actions.payload
         const questionResponses = actionTest.questionResponses.map((item) => {
            return {
               ...item,
               variantResponses: item.variantResponses.map((item) => {
                  return {
                     ...item,
                     checked: false,
                  }
               }),
            }
         })

         state.test = { ...actionTest, questionResponses }
      },
      [getStudentTestById.rejected]: (state, actions) => {
         const error = actions.payload
         toast.error(` ${error}`)
      },

      [getStudentCourses.fulfilled]: (state, actions) => {
         state.studentCourses = actions.payload
      },
      [getStudentCourses.rejected]: (state, actions) => {
         const error = actions.payload
         toast.error(` ${error}`)
      },
   },
})

export const studentSliceAction = studentSlice.actions
