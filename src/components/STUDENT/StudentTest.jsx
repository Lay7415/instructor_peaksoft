import { Box } from '@mui/material'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { getStudentTestById } from '../../store/studentSlice'
import { BreadCrumb } from '../UI/BreadCrumb'
import AnswerVariant from '../UI/AnswerVariant'
import { Buttons } from '../UI/Buttons'

const style = {
   width: '100%',
   bgcolor: 'background.paper',
   border: '1px solid #EBEBEB',
   borderRadius: '10px',
   padding: '20px',
}

const StudentTest = () => {
   const { test, testTwo } = useSelector((store) => store.studentSlice)
   const dispatch = useDispatch()
   const { testId } = useParams()
   useEffect(() => {
      dispatch(getStudentTestById(testId))
   }, [])
   console.log(test)
   console.log(testTwo, 'testTwo')

   return (
      <Wrapper>
         <Flex>
            <Title>{test.testName}</Title>
            <BreadCrumb />
         </Flex>
         <Box sx={style}>
            <TotalScore>{test.testName}</TotalScore>
         </Box>
         <VariantWrapper>
            {test.questionResponses.length !== 0 &&
               test.questionResponses.map((question, index) => {
                  return (
                     <QuestionItem>
                        <div>
                           <h4>{`${index + 1}.${question.question}`}</h4>
                           {question.variantResponses.map((item) => {
                              console.log(item)
                              return (
                                 <AnswerVariant
                                    key={item.id}
                                    questionId={question.questionId}
                                    questionType={question.questionType}
                                    variantId={item.id}
                                    variant={item.option}
                                    isChecked={item.checked}
                                 />
                              )
                           })}
                        </div>
                        <Score>0 баллов из 1</Score>
                     </QuestionItem>
                  )
               })}
         </VariantWrapper>
         <ButtonContainer>
            <Buttons>Отправить</Buttons>
         </ButtonContainer>
      </Wrapper>
   )
}

export default StudentTest

const Flex = styled.div`
   display: flex;
   justify-content: start;
   align-items: center;
   margin-bottom: 20px;
   font-family: Open Sans;
`
const ButtonContainer = styled.div`
   display: flex;
   justify-content: flex-end;
`

const Wrapper = styled.div`
   padding-top: 24px;
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
`

const Title = styled.h1`
   margin-bottom: 10px;
   margin-right: 20px;
   font-weight: 600;
   font-size: 28px;
`

const TotalScore = styled.h3`
   font-weight: 400;
   font-size: 20px;
   font-family: var(--base-font);
`
const QuestionItem = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #c4c4c4;
   margin-top: 20px;
   font-family: 'Open Sans';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
`
const VariantWrapper = styled.div`
   background-color: white;
   border-radius: 10px;
   padding: 0px 20px 0px 20px;
   margin: 20px 0px;
`

const Score = styled.span`
   width: 100px;
`
