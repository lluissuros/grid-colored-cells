import React from "react";
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

const getColor = (isPrimaryColor, theme) =>
  isPrimaryColor ? theme.primaryColor : theme.secondaryColor;

const Square = styled.div`
  background: ${props => getColor(props.primaryColor, props.theme)};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 5px solid ${props => props.theme.darkBackgroundColor};

  &.selected {
    animation: ${rotate} 0.5s linear infinite;
    filter: grayscale(50%)
      drop-shadow(
        3px 12px 11px
          ${props => getColor(props.selectionOriginalPrimaryColor, props.theme)}
      );
    border: 5px solid
      ${props => getColor(props.selectionOriginalPrimaryColor, props.theme)};
  }
`;

function Cell({
  primaryColor = true,
  isSelected = false,
  size = 100,
  selectionOriginalPrimaryColor = true,
  onSingleClick = () => {},
  onDoubleClick = () => {},
  onLongPress = () => {},
  onPressRelease = () => {},
  onHover = () => {}
}) {
  const singleOrDoubleClick = useDistinguishSingleOrDoubleClick(
    onSingleClick,
    onDoubleClick,
    200
  );

  return (
    <ClickNHold time={1} onClickNHold={onLongPress}>
      <Square
        className={isSelected ? "selected" : ""}
        size={size}
        primaryColor={primaryColor}
        selectionOriginalPrimaryColor={selectionOriginalPrimaryColor}
        onClick={singleOrDoubleClick}
        onMouseOver={onHover}
        onMouseUp={onPressRelease}
      />
    </ClickNHold>
  );
}

export default Cell;
