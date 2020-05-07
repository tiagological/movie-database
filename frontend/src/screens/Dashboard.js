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
      <Title>Hi {session.username}</Title>
      <p style={{ textAlign: 'center' }}>You are now logged in!</p>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 5px 0;
  font-size: 20px;
`;
