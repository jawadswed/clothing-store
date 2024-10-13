import styled, { css } from 'styled-components';

const subColor = 'grey'; // Sub color for the label.
const mainColor = 'black'; // Main color for the label.

// Mixin for shrinking the label. Mixin is a reusable block of code that can be used to apply styles to multiple elements.
const shrinkLabel = css`
  top: -14px; // Shrinking the label.
  font-size: 12px; // Changing the font size of the label.
  color: ${mainColor}; // Changing the color of the label.
`;

export const FormInputLabel = styled.label `
  color: ${subColor};
  font-size: 16px; // Changing the font size of the label.
  font-weight: normal; // Changing the font weight of the label.
  position: absolute; // Positioning the label absolutely.
  pointer-events: none; // Removing the pointer events of the label.
  left: 5px;
  top: 10px; // Positioning the label at the top.
  transition: 300ms ease all; // Adding a transition to the label.

  ${({shrink}) => shrink && shrinkLabel}; // Shrinking the label.
  
`;

export const Input = styled.input `
    background: none;
    background-color: white; // Changing the background color of the input.
    color: ${subColor}; // Changing the color of the input.
    font-size: 18px; // Changing the font size of the input.
    padding: 10px 10px 10px 5px; // Changing the padding of the input.
    display: block; // Displaying the input as a block.
    width: 100%; // Changing the width of the input.
    border: none; // Removing the border of the input.
    border-radius: 0; // Removing the border radius of the input.
    border-bottom: 1px solid ${subColor}; // Adding a border to the bottom of the input.
    margin: 25px 0; // Adding margin to the input.

    &:focus {
      outline: none; // Removing the outline of the input.
    }

    &:focus ~ ${FormInputLabel} {
      ${shrinkLabel}; // Shrinking the label.
    }
`;



  
export const Group = styled.div `
  position: relative;
  margin: 45px 0; // Adding margin to the group.
  
  input[type='password'] {
    letter-spacing: 0.3em; // Adding letter spacing to the input.
  }
`;