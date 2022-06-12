import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { FlexCards } from '../UI/FlexCards'
import { Cards } from '../UI/Cards'
import { ReactComponent as FixIcon } from '../../assets/icons/FixIcon.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/EditIcon.svg'
import { ReactComponent as Trash } from '../../assets/icons/TrashBin.svg'
import { getStudentCourses } from '../../store/studentSlice'
import { PaginationLink } from '../UI/BasicPagination'
import { ConditionalRender } from '../UI/ConditionalRender'

const StudentMycourses = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [searchParams, setSearchParams] = useSearchParams()
   const { pathname } = useLocation()
   const page = searchParams.get('page')
   useEffect(() => {
      dispatch(getStudentCourses(page || 1))
   }, [page])

   const { studentCourses, pages } = useSelector((store) => store.studentSlice)
   console.log(studentCourses)

   const openInnerPage = (id) => {
      navigate(`${id}?tabs=teachers`)
   }

   const option = [
      {
         id: Math.random().toString(),
         action: (courseInformation) => {
            const { id } = courseInformation
            setSearchParams({
               modal: 'appointTeacherCourse',
               courseId: id,
               page,
            })
         },
         content: (
            <>
               <FixIcon style={{ marginRight: '20px' }} />
               Назначить учителя
            </>
         ),
      },
      {
         id: Math.random().toString(),
         action: (courseInformation) => {
            const { id } = courseInformation
            setSearchParams({ modal: 'updateCourse', courseId: id, page })
         },
         content: (
            <>
               <EditIcon style={{ marginRight: '20px' }} />
               Редактировать
            </>
         ),
      },
      {
         id: Math.random().toString(),
         action: (courseInformation) => {
            const { id } = courseInformation
            setSearchParams({ modal: 'deleteCourse', courseId: id, page })
         },
         content: (
            <>
               <Trash style={{ marginRight: '20px' }} />
               Удалить
            </>
         ),
      },
   ]

   return (
      <Wrapper>
         <FlexCards>
            {studentCourses.map((el) => (
               <Cards
                  onCardClick={() => openInnerPage(el.id)}
                  key={el.id}
                  title={el.courseName}
                  image={el.image}
                  description={el.description}
                  duration={el.dateOfFinish}
                  cardId={el.id}
                  option={option}
                  allInformation={el}
               />
            ))}
         </FlexCards>
         <ConditionalRender isActive={pages > 1}>
            <StyledFooter>
               <PaginationLink path={pathname} count={pages} />
            </StyledFooter>
         </ConditionalRender>
      </Wrapper>
   )
}

export default StudentMycourses

const StyledFooter = styled.footer`
   margin-left: 50vh;
   margin-top: 30px;
`
const Wrapper = styled.div`
   padding-top: 24px;
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
`
