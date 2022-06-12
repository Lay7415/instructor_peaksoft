import React from 'react'
import { Route, Routes } from 'react-router'
import StudentMycourses from '../../components/STUDENT/StudentMycourses'
import { StudentMyCourseInnerPage } from '../../components/STUDENT/StudentMyCourseInnerPage'
import StudentTest from '../../components/STUDENT/StudentTest'

const StudentCoursesRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<StudentMycourses />} />
         <Route path="/:coursesId/*" element={<StudentMyCourseInnerPage />} />
         <Route path="/:courseId/test/:testId" element={<StudentTest />} />
      </Routes>
   )
}

export default StudentCoursesRoutes
