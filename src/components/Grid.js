import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  border: solid;
  border-width: 0px;
`;

const createCellData = ({ primaryColor = true } = {}) => ({
  primaryColor
});

const Grid = ({ size = 5 }) => {
  const initGrid = size =>
    Array(size).fill(Array(size).fill(createCellData({ primaryColor: true })));
  const [grid, setGrid] = useState(initGrid(size));

  useEffect(() => {
    //TODO
    console.log("TODO grid changed");
  }, [grid]);

  const handleSingleClick = (rowIndex, cellIndex) => {
    console.log(`sigle click from ${rowIndex}, ${cellIndex}`);
  };

  const handleDoubleClick = (rowIndex, cellIndex) => {
    console.log(`doubleClick from ${rowIndex}, ${cellIndex}`);
  };

  const handleLongPress = (rowIndex, cellIndex) => {
    console.log(`handleLongPress from ${rowIndex}, ${cellIndex}`);
  };

  return (
    <section>
      {grid.map((row, rowIndex) => {
        return (
          <Row key={rowIndex}>
            {/* TODO: CAREFUL I dont think rowIndex is good key, if we change content it will be performant?? */}
            {row.map((cell, cellIndex) => {
              return (
                <Cell
                  primaryColor={cell.primaryColor}
                  onSingleClick={() => handleSingleClick(rowIndex, cellIndex)}
                  onDoubleClick={() => handleDoubleClick(rowIndex, cellIndex)}
                  onLongPress={() => handleLongPress(rowIndex, cellIndex)}
                />
              );
            })}
          </Row>
        );
      })}
    </section>
  );
};

export default Grid;
