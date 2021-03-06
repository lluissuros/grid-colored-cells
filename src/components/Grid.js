import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import NumericInput from "react-numeric-input";
import styled from "styled-components";

import Cell from "./Cell";
import Post from "./Post";

const Row = styled.div`
  display: flex;
  border: solid;
  border-width: 0px;
`;

const Grid = ({ gridSizePx = 500 }) => {
  const [grid, setGrid] = useState([]);
  const [longPressCell, setLongPressCell] = useState(null);
  const [currentHovered, setCurrentHovered] = useState(null);
  const [size, setSize] = useState(5);

  const createCellData = ({
    primaryColor = true,
    isSelected = false,
    id = uuid()
  } = {}) => {
    return { id, primaryColor, isSelected };
  };

  useEffect(() => {
    const initGrid = size => {
      console.log("INIT");
      let grid = Array(size).fill(Array(size).fill(null));
      return grid.map(row =>
        row.map(cell =>
          createCellData({ primaryColor: true, isSelected: false })
        )
      );
    };
    setGrid(initGrid(size));
  }, [size]);

  const changeSingleCellColor = (rowIndex, columnIndex) => {
    let gridCopy = grid.map(row => row.map(cell => ({ ...cell })));
    gridCopy[rowIndex][columnIndex] = createCellData({
      primaryColor: !gridCopy[rowIndex][columnIndex].primaryColor
    });
    setGrid(gridCopy);
  };

  const changeColumnColor = (rowIndex, columnIndex) => {
    const columnIsPrimaryColor = grid[rowIndex][columnIndex].primaryColor;
    let gridCopy = grid.map(row =>
      row.map((cell, index) =>
        createCellData({
          primaryColor:
            index === columnIndex ? columnIsPrimaryColor : cell.primaryColor
        })
      )
    );
    setGrid(gridCopy);
  };

  const handleLongPress = (rowIndex, columnIndex) => {
    let gridCopy = grid.map(row => row.map(cell => ({ ...cell })));
    gridCopy[rowIndex][columnIndex] = createCellData({
      primaryColor: gridCopy[rowIndex][columnIndex].primaryColor,
      isSelected: true
    });
    setLongPressCell([rowIndex, columnIndex]);
    setCurrentHovered([rowIndex, columnIndex]);
    setGrid(gridCopy);
  };

  const handleHover = (hoveredRowIndex, hoveredColumnIndex) => {
    if (!longPressCell) {
      return;
    }
    if (
      currentHovered &&
      hoveredRowIndex === currentHovered[0] &&
      hoveredColumnIndex === currentHovered[1]
    ) {
      return;
    }
    const [longPressRowIndex, longPressColumnIndex] = longPressCell;
    const upperRowLimit = Math.max(hoveredRowIndex, longPressRowIndex);
    const bottomRowLimit = Math.min(hoveredRowIndex, longPressRowIndex);
    const upperColumnLimit = Math.max(hoveredColumnIndex, longPressColumnIndex);
    const bottomColumnLimit = Math.min(
      hoveredColumnIndex,
      longPressColumnIndex
    );
    let gridCopy = grid.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>
        createCellData({
          primaryColor: cell.primaryColor,
          isSelected:
            rowIndex >= bottomRowLimit &&
            rowIndex <= upperRowLimit &&
            columnIndex >= bottomColumnLimit &&
            columnIndex <= upperColumnLimit
        })
      )
    );
    setGrid(gridCopy);
    setCurrentHovered([hoveredRowIndex, hoveredColumnIndex]);
  };

  const handleLongPressRelease = (releaseRowIndex, releaseColumnIndex) => {
    if (!longPressCell) {
      return;
    }
    const [longPressRowIndex, longPressColumnIndex] = longPressCell;
    const originIsPrimaryColor =
      grid[longPressRowIndex][longPressColumnIndex].primaryColor;

    let gridCopy = grid.map((row, rowIndex) =>
      row.map((cell, columnIndex) => {
        if (cell.isSelected) {
          return createCellData({
            primaryColor: originIsPrimaryColor,
            isSelected: false
          });
        }
        return { ...cell };
      })
    );
    setLongPressCell(null);
    setCurrentHovered(null);
    setGrid(gridCopy);
  };

  const getOriginIsPrimaryColor = () => {
    if (!longPressCell) {
      return null;
    }
    const [longPressRowIndex, longPressColumnIndex] = longPressCell;
    return grid[longPressRowIndex][longPressColumnIndex].primaryColor;
  };

  return (
    <React.Fragment>
      <Post objectToPost={grid} />
      <section>
        <NumericInput
          min={2}
          max={10}
          value={size}
          onChange={val => setSize(val)}
        />
      </section>
      <section>
        {grid.map((row, rowIndex) => (
          <Row key={row.map(cell => cell.id).join("")}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cell.id}
                size={gridSizePx / size} //aprox!
                primaryColor={cell.primaryColor}
                isSelected={cell.isSelected}
                selectionOriginalPrimaryColor={getOriginIsPrimaryColor()}
                onSingleClick={() => changeSingleCellColor(rowIndex, cellIndex)}
                onDoubleClick={() => changeColumnColor(rowIndex, cellIndex)}
                onLongPress={() => handleLongPress(rowIndex, cellIndex)}
                onPressRelease={() =>
                  handleLongPressRelease(rowIndex, cellIndex)
                }
                onHover={() => handleHover(rowIndex, cellIndex)}
              />
            ))}
          </Row>
        ))}
      </section>
    </React.Fragment>
  );
};

export default Grid;
