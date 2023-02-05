import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { containerClasses } from "@mui/system";

const Container = styled.div`
  height: 84px;
  border-bottom: 1px solid #9da4a8;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 20px;
  @media screen and (max-width:1080px){
    padding: 10px;
  }
`;

const Avatar = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;
const Details = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const TextWrapper = styled.div`
  padding: 0 10px;
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
const SubText = styled.p`
  margin: 0;
  color: #9da4a8;
  font-size: 14px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const RightAction = styled.div`
  display: flex;
  align-items: center;
  background-color: #eeefef;
  border-radius: 25px;
  padding-left: 20px;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const RightActionWrapper = styled.div`
  background-color: transparent;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const Button = styled.button`
  background-color: #eeefef;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9da4a8;
  outline: none;
  border: none;
`;

const Input = styled.input`
  padding: 10px 0;
  background: transparent;
  outline: none;
  border: none;
  display: flex;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const AvatarWrapper = styled.div`
  height: 52px;
  width: 52px;
  position: relative;
`;

const AvatarBadge = styled.div`
  height: 10px;
  width: 10px;
  background-color: #2edb17;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: 1px solid white;
`;

const SearchResultContainer = styled.div`
  background-color: red;
  height: 50px;
  width: 54%;
  margin-top: 2px;
  position: absolute;
`;

export const Header = () => {
  const [search, setSearch] = useState('');
  return (
    <Container>
      <AvatarWrapper>
        <AvatarBadge />
        <Avatar src="https://images.unsplash.com/photo-1666933000057-bd414f5e214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
      </AvatarWrapper>
      <Details>
        <TextWrapper>
          <SubText>Hello</SubText>
          <Text>Jhane Doe</Text>
        </TextWrapper>
        <RightActionWrapper>

          <RightAction>
            <Input placeholder="find people" onChange={(e) => setSearch(e.target.value)} />
            <Button>
              <SearchIcon />
            </Button>
          </RightAction>
          {search.length ? <SearchResultContainer />: <></>}          
        </RightActionWrapper>

      </Details>
    </Container>
  );
};
