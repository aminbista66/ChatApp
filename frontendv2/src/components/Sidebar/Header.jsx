import React, {useState} from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
    List,
    ListItem,
    IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Container = styled.div `
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

const Avatar = styled.img `
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;
const SearchAvatar = styled.img `
  height: 32px;
  width: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
const Details = styled.div `
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const TextWrapper = styled.div `
  padding: 0 10px;
`;
const Text = styled.p `
  margin: 5px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const SubText = styled.p `
  margin: 0;
  color: #9da4a8;
  font-size: 14px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const RightAction = styled.div `
  display: flex;
  align-items: center;
  background-color: #eeefef;
  border-radius: 25px;
  padding-left: 20px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const RightActionWrapper = styled.div `
  background-color: transparent;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;
const Button = styled.button `
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

const Input = styled.input `
  padding: 10px 0;
  background: transparent;
  outline: none;
  border: none;
  display: flex;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const AvatarWrapper = styled.div `
  height: 52px;
  width: 52px;
  position: relative;
`;

const AvatarBadge = styled.div `
  height: 10px;
  width: 10px;
  background-color: #2edb17;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  right: 5px;
  border: 1px solid white;
`;

export const Header = () => {
    const [search, setSearch] = useState('');
    return (
        <Container>
            <AvatarWrapper>
                <AvatarBadge/>
                <Avatar src="https://images.unsplash.com/photo-1666933000057-bd414f5e214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"/>
            </AvatarWrapper>
            <Details>
                <TextWrapper>
                    <SubText>Hello</SubText>
                    <Text>Jhane Doe</Text>
                </TextWrapper>
                <RightActionWrapper>

                    <RightAction>
                        <Input placeholder="find people"
                            onChange={
                                (e) => setSearch(e.target.value)
                            }/>
                        <Button>
                            <SearchIcon/>
                        </Button>
                    </RightAction>
                    {
                    search.length ? <List sx={
                        {
                            position: 'absolute',
                            width: '242px',
                            maxWidth: 360,
                            bgcolor: '#eeefef',
                            borderRadius: '8px',
                            marginTop: '2px',
                            maxHeight: '600px',
                            height: 'auto',
                            overflow: 'scroll'
                        }
                    }>
                      {Array(1,2,3,4,5,6,7,8,9,0,1,1,3,3,5,6).map(item => (
                          <ListItem 
                          sx={{
                            '&:hover': {
                              backgroundColor: '#9da4a8',
                            },
                            
                          }}
                          secondaryAction={
                              <IconButton>
                                <PersonAddAlt1Icon/>
                              </IconButton>
                          }>
                              <SearchAvatar src="https://images.unsplash.com/photo-1666933000057-bd414f5e214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"/>
                              <Text style={{marginLeft: "5px", fontSize: "14px"}}>Jackline Hermanos</Text>
                          </ListItem>
                        )
                      )}
                        

                    </List> : <></>
                } </RightActionWrapper>

            </Details>
        </Container>
    );
};
