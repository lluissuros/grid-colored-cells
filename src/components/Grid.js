import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  border: solid;
  border-width: 0px;
`;

const Grid = ({ size = 5 }) => {
  const initGrid = size => Array(size).fill(Array(size).fill(0));
  const [grid, setGrid] = useState(initGrid(size));

  useEffect(() => {
    //TODO
    console.log("TODO grid changed");
  }, [grid]);

  return (
    <div className="main-grid">
      <Row>
        <Cell number={0} primaryColor />
        <Cell number={1} />
        <Cell number={2} />
      </Row>
      <Row>
        <Cell number={3} />
        <Cell number={4} />
        <Cell number={5} />
      </Row>
      <Row>
        <Cell number={6} />
        <Cell number={7} />
        <Cell number={8} />
      </Row>
    </div>
  );
};

export default Grid;
