import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { adminGroupSlice } from './adminGroupSlice'
import { courseSlice } from './courseSlice'
import { teachersSlice } from './adminTeachersSlice'
import { instructorSlice } from './instructorCoursesSlice'
import { TaskCreaterSlice } from './InstructorTaskCreaterSlice'
import { testCreaterSlice } from './testCreaterSlice'
import { studentSlice } from './studentSlice'

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      groupSlice: adminGroupSlice.reducer,
      courseSlice: courseSlice.reducer,
      teacher: teachersSlice.reducer,
      instructorSlice: instructorSlice.reducer,
      TaskCreaterSlice: TaskCreaterSlice.reducer,
      testCreaterSlice: testCreaterSlice.reducer,
      studentSlice: studentSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware({ serializableCheck: false })]
   },
})
