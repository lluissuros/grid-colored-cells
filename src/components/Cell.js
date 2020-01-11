import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import useDistinguishSingleOrDoubleClick from "../utils/useDistinguishSingleOrDoubleClick";
import ClickNHold from "react-click-n-hold";

const rotate = keyframes`
    0%   {transform: rotate(0deg)}
    25%  {transform: rotate(-20deg)}
    50%{transform: rotate(0deg)}
    75%  {transform: rotate(20deg)}
    100%   {transform: rotate(0deg)}
`;

const Square = styled.div`
  background: ${props =>
    props.primaryColor ? props.theme.primaryColor : props.theme.secondaryColor};
  width: 100px;
  height: 100px;
  border: 5px solid ${props => props.theme.darkBackgroundColor};
`;

const SelectedSquare = styled(Square)`
  animation: ${rotate} 0.5s linear infinite;
  filter: grayscale(50%)
    drop-shadow(
      3px 12px 11px
        ${props =>
          props.primaryColor
            ? props.theme.primaryColor
            : props.theme.secondaryColor}
    );
`;

function Cell({
  primaryColor,
  isSelected,
  onSingleClick,
  onDoubleClick,
  onLongPress,
  onLongPressRelease,
  onHover
}) {
  const singleOrDoubleClick = useDistinguishSingleOrDoubleClick(
    onSingleClick,
    onDoubleClick,
    200
  );

  return (
    <ClickNHold time={1} onClickNHold={onLongPress}>
      {isSelected ? (
        <SelectedSquare
          primaryColor={primaryColor}
          onClick={singleOrDoubleClick}
          onMouseOver={onHover}
          onMouseUp={onLongPressRelease}
        />
      ) : (
        <Square
          primaryColor={primaryColor}
          onClick={singleOrDoubleClick}
          onMouseOver={onHover}
          onMouseUp={onLongPressRelease}
        />
      )}
    </ClickNHold>
  );
}

export default Cell;
