import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StudentCoursesRoutes from './StudentCoursesRoutes'

export const StudentRoutes = () => {
   return (
      <Routes>
         <Route path="" element={<Navigate to="courses" />} />
         <Route path="courses/*" element={<StudentCoursesRoutes />} />
      </Routes>
   )
}
