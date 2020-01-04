import React from "react";
import styled from "styled-components";

const CellBox = styled.div`
  background: ${props =>
    props.primaryColor ? props.theme.primaryColor : props.theme.secondaryColor};
  width: 100px;
  height: 100px;
  border: 5px solid ${props => props.theme.darkBackgroundColor};
`;

function Cell({
  primaryColor,
  isSelected,
  onSingleClick,
  onDoubleClick,
  oLongPress,
  onLongPressRelease,
  onMouseOver
}) {
  //probably the logic for check simple, double and long click is here
  return <CellBox primaryColor={primaryColor} />;
}

export default Cell;
