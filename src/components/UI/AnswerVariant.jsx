import React from 'react'
import styled from 'styled-components'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch } from 'react-redux'
import { RadioButton } from './RadioButton'
import { studentSliceAction } from '../../store/studentSlice'

const AnswerVariant = ({
   variant,
   questionType,
   questionId,
   variantId,
   isChecked,
}) => {
   const dispatch = useDispatch()

   const onToggleRadioButton = () => {
      dispatch(
         studentSliceAction.changeRadioButtonVariant({
            questionId,
            variantId,
            checked: isChecked,
         })
      )
   }

   const onToggleCheckbox = () => {
      dispatch(
         studentSliceAction.changeCheckBoxVariant({
            questionId,
            variantId,
            checked: isChecked,
         })
      )
   }

   return (
      <Variant>
         {questionType === 'SINGLE' && (
            <RadioButton onClick={onToggleRadioButton} checked={isChecked} />
         )}
         {questionType === 'MULTIPLE' && (
            <Checkbox onClick={onToggleCheckbox} checked={isChecked} />
         )}

         <p>{variant}</p>
      </Variant>
   )
}

export default AnswerVariant

const Variant = styled.div`
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin: 20px 0px 10px 0px;
`
