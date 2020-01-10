import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import styled from "styled-components";

import Cell from "./Cell";

const Row = styled.div`
  display: flex;
  border: solid;
  border-width: 0px;
`;

const Grid = ({ size = 5 }) => {
  const createCellData = ({ primaryColor = true, id = uuid() } = {}) => {
    console.log("createCellData");
    return { id, primaryColor };
  };

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const initGrid = size => {
      console.log("INIT");
      let grid = Array(size).fill(Array(size).fill(null));
      return grid.map(row =>
        row.map(cell => createCellData({ primaryColor: true }))
      );
    };
    setGrid(initGrid(size));
  }, [size]);

  const handleSingleClick = (rowIndex, cellIndex) => {
    let gridCopy = grid.map(row => row.map(cell => ({ ...cell })));
    gridCopy[rowIndex][cellIndex] = createCellData({
      primaryColor: !gridCopy[rowIndex][cellIndex].primaryColor
    });
    setGrid(gridCopy);
  };

  const handleSingleClick_REMOVE_LATER_WORKS = (rowIndex, cellIndex) => {
    setGrid(
      grid.map((row, index) => {
        if (index === rowIndex) {
          return row.map((cell, index) => {
            if (index === cellIndex) {
              return { ...cell, primaryColor: !cell.primaryColor };
            }
            return cell;
          });
        } else {
          return row;
        }
      })
    );
  };

  const handleDoubleClick = (rowIndex, cellIndex) => {
    const columnIsPrimaryColor = !grid[rowIndex][cellIndex].primaryColor;
    let gridCopy = grid.map(row =>
      row.map((cell, index) =>
        createCellData({
          primaryColor:
            index === cellIndex ? columnIsPrimaryColor : cell.primaryColor
        })
      )
    );
    setGrid(gridCopy);
  };

  const handleLongPress = (rowIndex, cellIndex) => {
    console.log(`handleLongPress from ${rowIndex}, ${cellIndex}`);
  };

  return (
    <section>
      {grid.map((row, rowIndex) => (
        <Row key={row.map(cell => cell.id).join("")}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cell.id}
              primaryColor={cell.primaryColor}
              onSingleClick={() => handleSingleClick(rowIndex, cellIndex)}
              onDoubleClick={() => handleDoubleClick(rowIndex, cellIndex)}
              onLongPress={() => handleLongPress(rowIndex, cellIndex)}
            />
          ))}
        </Row>
      ))}
    </section>
  );
};

export default Grid;
