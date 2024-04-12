// Complete the Index page component for a basic Othello game
import { Box, Grid, GridItem, useColorModeValue, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";

const boardSize = 8; // Othello board is 8x8

const Index = () => {
  // Initialize the game board with the starting four pieces
  const initialBoard = () => {
    const middle = boardSize / 2;
    let board = Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill(null));
    board[middle - 1][middle - 1] = "white";
    board[middle][middle] = "white";
    board[middle - 1][middle] = "black";
    board[middle][middle - 1] = "black";
    return board;
  };

  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("black");

  // Function to handle placing a piece on the board
  const placePiece = (row, col) => {
    if (board[row][col] !== null) return; // Spot already taken

    // Place the piece
    let newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Change player
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  // Render the game board
  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={1} width="50vmin" height="50vmin">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridItem key={`${rowIndex}-${colIndex}`} w="100%" h="100%" bg={useColorModeValue("gray.200", "gray.700")}>
              <IconButton icon={cell ? <FaCircle /> : null} colorScheme={cell} aria-label="Place piece" isRound={true} size="lg" onClick={() => placePiece(rowIndex, colIndex)} isDisabled={cell !== null} _disabled={{ opacity: 1 }} />
            </GridItem>
          )),
        )}
      </Grid>
    </Box>
  );
};

export default Index;
