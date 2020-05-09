import React, { useContext } from 'react';
import GlobalContext from '../context';
import styled from 'styled-components/macro';
import { logout } from '../services/session';

export const Dashboard = () => {
  const { session, setSession, setErrors } = useContext(GlobalContext);

  const handleLogout = () => {
    logout(setSession, setErrors);
  };

  return (
    <Container>
      <InnerContainer>
        <Title>Hi {session.username}</Title>
        <p style={{ textAlign: 'center' }}>You are now logged in!</p>
        <Button onClick={handleLogout}>Logout</Button>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(98, 98, 98, 1) 100%
  );
  background-repeat: no-repeat;
  overflow: auto;
  color: #fff;
`;

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media screen and (min-width: 1024px) {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 5px 0;
  font-size: 20px;
  background: transparent;
  border: 1px solid white;
  border-radius: 8px;
  color: #fff;

  :hover {
    cursor: pointer;
  }
`;
