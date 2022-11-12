import React from 'react'
import styled from "styled-components";
import { Sidebar } from '../Sidebar/Sidebar';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
const Left = styled.div`
  flex: 2;
`;
const Right = styled.div`
  flex: 5;
  background-color: gray;
`;

export const Home = () => {
  return (
    <Container>
      <Left>
        <Sidebar/>
      </Left>
      <Right>
        right
      </Right>
    </Container>
  )
}
