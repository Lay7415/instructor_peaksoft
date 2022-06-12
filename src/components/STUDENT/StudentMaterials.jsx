import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { getMaterialsByCourseId } from '../../store/instructorCoursesSlice'
import { FlexCards } from '../UI/FlexCards'
import { MODAL_TYPES } from '../../utils/constants/constants'
import { LessonCard } from '../UI/LessonCard'

const StudentMaterials = ({ coursesId }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [searchParams, setSearchParams] = useSearchParams()
   const tabs = searchParams.get('tabs')
   const { materials } = useSelector((store) => store.instructorSlice)
   useEffect(() => {
      dispatch(getMaterialsByCourseId(coursesId))
   }, [])

   // const openLessonModal = () => {
   //    setSearchParams({ tabs, modal: MODAL_TYPES.ADDNEWLESSON })
   // }

   // const addNewLesson = (lessonName) => {
   //    dispatch(
   //       addNewLessonByCourseId({ name: lessonName, courseId: coursesId })
   //    )
   // }

   const openDeleteLessonModal = (lessonId) => {
      setSearchParams({ tabs, modal: MODAL_TYPES.DELETELESSON, lessonId })
   }

   const openVideoPreview = (videoLessonId) => {
      if (videoLessonId) {
         navigate(`previewPage/${videoLessonId}?view=video`)
      }
   }

   const openTasksPreview = (taskId) => {
      if (taskId) {
         navigate(`previewPage/${taskId}?view=task`)
      }
   }

   const getPresentation = (presentationId) => {
      if (presentationId) {
         navigate(`previewPage/${presentationId}?view=presentation`)
      }
   }

   const openTest = (testId) => {
      if (testId) {
         navigate(`/student/courses/${coursesId}/test/${testId}`)
      }
   }

   return (
      <FlexCards>
         {materials.map((lesson) => {
            console.log(lesson)
            return (
               <LessonCard
                  openTaskHandler={() => openTasksPreview(lesson.taskId)}
                  openVideoHandler={() =>
                     openVideoPreview(lesson.videoLessonId)
                  }
                  openPresentationHandler={() =>
                     getPresentation(lesson.presentationId)
                  }
                  openTestHandler={() => openTest(lesson.testId)}
                  onDeleteHandler={() => openDeleteLessonModal(lesson.id)}
                  lessonName={lesson.name}
                  lessonId={lesson.id}
                  taskId={lesson.taskId}
                  linkId={lesson.linkId}
                  testId={lesson.testId}
                  videoId={lesson.videoLessonId}
                  presentationId={lesson.presentationId}
                  isVisibleTypeForm={false}
                  isVisibleTypeChangeButton={false}
               />
            )
         })}
      </FlexCards>
   )
}
export default StudentMaterials
