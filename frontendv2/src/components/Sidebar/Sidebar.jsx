import React from "react";
import styled from "styled-components";
import { Header } from "./Header";
import GroupsIcon from "@mui/icons-material/Groups";
import { UserCard } from "./UserCard";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: sticky;
  top: 0;
`;

const EasterWrapper = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media screen and (max-width: 720px) {
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
  }
`;

const Easter = styled.div`
  background-color: #2e999d;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EasterText = styled.span`
  color: #9da4a8;
  font-size: 12px;
  font-weight: 600;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const UserList = styled.div`
  height: 100%;
  padding: 10px 20px;
  overflow: scroll;
  padding-bottom: 100px;
  max-height: calc(100vh - 200px);
`;

export const Sidebar = () => {
  return (
    <Container>
      <Header />
      <EasterWrapper>
        <Easter>
          <GroupsIcon fontSize="20px" />
        </Easter>
        <EasterText>All Message</EasterText>
      </EasterWrapper>

      <UserList>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </UserList>
    </Container>
  );
};
