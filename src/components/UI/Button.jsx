import React, { memo } from "react";
import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  margin: 10px 0 10px 10px;
  border: 1px solid lightgray;
  cursor: pointer;

  //작성하기,추가하기
  ${(props) =>
    props.add &&
    css`
      background-color: #395b64;
      color: #fff;
      border-color: lightgray;
      &:hover {
        background-color: #fff;
        color: #2c3333;
      }
    `}

  //취소하기
  ${(props) =>
    props.cancel &&
    css`
      color: black;
      background-color: #fff;
      border-color: lightgray;
    `}

//삭제하기
  ${(props) =>
    props.delete &&
    css`
      color: #9c2121;
      background-color: #fff;
      border-color: lightgray;
      &:hover {
        background-color: #fff;
        color: red;
      }
    `}

//수정하기
  ${(props) =>
    props.edit &&
    css`
      color: gray;
      background-color: #fff;
      border-color: lightgray;
    `}
`;
export default memo(Button);
