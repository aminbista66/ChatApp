import React from "react";
import styled from "styled-components";

const Square = styled.div`
  width: 72px;
  height: 72px;
  position: absolute;
  z-index: -1;
  top: -60px;
  left: -60px;
  opacity: 0.55;
  background-color: #469ce7;
  animation: square 25s linear alternate infinite;

  @keyframes square {
    to {
      transform: translate(100vw, 100vh);
    }
  }
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  opacity: 0.55;
  z-index: -1;
  top: 80px;
  left: -40px;
  background-color: #ecaa74;
  animation: circle 25s linear alternate infinite;

  @keyframes circle {
    to {
      transform: translate(70vw, -100vh);
    }
  }
`;

const Rect = styled.div`
  width: 64px;
  height: 130px;
  position: absolute;
  opacity: 0.55;
  z-index: -1;
  top: 200px;
  left: -120px;
  background-color: #54f761;
  animation: circle 30s linear alternate infinite;

  @keyframes circle {
    to {
      transform: translate(100vw, -50vh);
    }
  }
`;

export const AuthAnimatedShape = () => {
  return (
    <>
      <Square />
      <Circle />
      <Rect />
    </>
  );
};
