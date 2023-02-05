import React from "react";
import styled from "styled-components";


const AvatarWrapper = styled.div`
  height: 62px;
  width: 62px;
  position: relative;
`;

const AvatarBadge = styled.div`
  height: 10px;
  width: 10px;
  background-color: #2edb17;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  right: 8px;
  border: 1px solid white;
`;

const Avatar = styled.img`
  height: 58px;
  width: 58px;
  border-radius: 50%;
  object-fit: cover;
`;

const Text = styled.p`
  margin: 5px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333333;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const TextWrapper = styled.div`
  @media screen and (max-width: 720px) {
    display: none;
  }`;

const RecentMessage = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #9da4a8;
    @media screen and (max-width: 720px) {
    display: none;
  }
`;
const Time = styled.span`
font-size: 14px;
font-weight: 500;
color: #555555;
@media screen and (max-width: 720px) {
    display: none;
  }
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
gap: 10px;
@media screen and (max-width:1080px){
    gap: 0;
  }
`;
const Container = styled.div`
  height: 84px;
  border-radius: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  &:hover {
    background-color: #4784DE;
    transition: .1s ease-in-out all;
  }
  &:hover ${Text} {
    color: white;
  }
  &:hover ${RecentMessage}{
    color: whitesmoke;
  }
  &:hover ${Time}{
    color: whitesmoke;
  }

`;
export const UserCard = () => {
  return (
    <Container>
    <Wrapper>
      <AvatarWrapper>
        <AvatarBadge />
        <Avatar src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
      </AvatarWrapper>
      <TextWrapper>
      <Text>Muhammad Salla</Text>
      <RecentMessage>Hello jane!</RecentMessage>
      </TextWrapper>
    </Wrapper>
    <Time>9:38 pm</Time>
    </Container>
  );
};
