import React from 'react'
import styled from "styled-components";
import { Sidebar } from '../Sidebar/Sidebar';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
const Left = styled.div`
  flex: 1.3;

  @media screen and (max-width:1080px){
    transition: .5s ease-in-out;
    flex: .5;
  }
`;
const Right = styled.div`
  flex: 4;
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
