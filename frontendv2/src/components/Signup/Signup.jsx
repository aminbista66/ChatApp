import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SignupSVG from "../../assets/signup.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthAnimatedShape } from "../AuthAnimatedShape";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const Left = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #eeefef;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 720px) {
    width: 80%;
  }
`;
const Input = styled.input`
  padding: 15px 20px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #9da4a8;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  background: transparent;

  @media screen and (max-width: 600px) {
    padding: 10px;
  }

  &::placeholder {
    color: #9da4a8;
  }
`;
const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #4784de;
  width: 80%;
  padding: 15px 20px;
  color: white;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #315fc6;
    transition: 0.15s ease-in-out;
  }
`;
const Title = styled.h2`
  font-size: 38px;
  font-weight: 400;
  margin: 10px 0;
  color: #43464a;

  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
`;
const SubTitle = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #9da4a8;
  margin-bottom: 20px;
`;

const Image = styled.img``;

const InputWrapper = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const Label = styled.p`
  color: #43464a;
  font-size: 16px;
  margin: 10px 0;
`;

const PasswordWrapper = styled.div`
  display: flex;
  border: 1px solid #9da4a8;
  border-radius: 10px;
  align-items: center;
`;

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Container>
      <AuthAnimatedShape />
      <Left>
        <Wrapper>
          <Title>SIGNUP</Title>
          <SubTitle>Welcome! Please enter your details.</SubTitle>
          <InputWrapper>
            <Label>First Name</Label>
            <Input placeholder="Enter your first name" />
          </InputWrapper>
          <InputWrapper>
            <Label>Last Name</Label>
            <Input placeholder="Enter your last name" />
          </InputWrapper>
          <InputWrapper>
            <Label>Username</Label>
            <Input placeholder="Enter your username" />
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                placeholder="********"
                style={{ border: "none", outline: "none" }}
                type={showPassword ? "text" : "password"}
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  padding: "5px 10px",
                  color: "#43464a",
                }}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {!showPassword ? (
                  <VisibilityIcon color="#9da4a8" />
                ) : (
                  <VisibilityOffIcon color="#9da4a8" />
                )}
              </button>
            </PasswordWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <PasswordWrapper>
              <Input
                placeholder="********"
                style={{ border: "none", outline: "none" }}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  padding: "5px 10px",
                  color: "#43464a",
                }}
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {!showConfirmPassword ? (
                  <VisibilityIcon color="#9da4a8" />
                ) : (
                  <VisibilityOffIcon color="#9da4a8" />
                )}
              </button>
            </PasswordWrapper>
          </InputWrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0 0 0",
            }}
          ></div>
          <Button>Sign up</Button>
          <SubTitle style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account?
            <Link style={{ color: "#4784DE", marginLeft: "5px" }}>Sign in</Link>
          </SubTitle>
        </Wrapper>
      </Left>
      <Right>
        <Image src={SignupSVG} height={550} width={550} />
      </Right>
    </Container>
  );
};
