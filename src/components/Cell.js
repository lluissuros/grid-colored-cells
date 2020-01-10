import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useDisableFastSingleClicks from "../utils/useDisableFastSingleClicks";
import ClickNHold from "react-click-n-hold";

const Square = styled.div`
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
  onLongPress,
  onLongPressRelease,
  onMouseOver
}) {
  const singleOrDoubleClick = useDisableFastSingleClicks(
    onSingleClick,
    onDoubleClick,
    200
  );
  return (
    <ClickNHold time={1} onClickNHold={onLongPress}>
      <Square primaryColor={primaryColor} onClick={singleOrDoubleClick} />
    </ClickNHold>
  );
}

export default Cell;
