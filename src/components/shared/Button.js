import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 3px;
  background-color: ${props => props.backgrColor || '#3884ff'};
  transition: all 200ms ease;
  text-align: center;
  display: block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  margin: 0 auto;

  :hover,
  :focus {
    background-color: ${props => props.hoverColor || '#1f65d6'};
  }
`;

const Button = ({ type, onClick, backgrColor, hoverColor, children }) => (
  // eslint-disable-next-line react/button-has-type
  <StyledButton
    type={type}
    onClick={onClick}
    backgrColor={backgrColor}
    hoverColor={hoverColor}
  >
    {children}
  </StyledButton>
);
Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};
Button.defaultProps = {
  onClick: null,
  type: 'button',
};
export default Button;
