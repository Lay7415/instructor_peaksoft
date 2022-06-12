import React from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import StudentMaterials from './StudentMaterials'

export const StudentMyCourseInnerPage = () => {
   const [searchParams] = useSearchParams()
   const { coursesId } = useParams()
   const tabs = searchParams.get('tabs')
   if (tabs === 'material') {
      return <StudentMaterials coursesId={coursesId} />
   }
   if (tabs === 'raiting') {
      return <h>raiting</h>
   }
   return null
}
