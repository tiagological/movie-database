import React from 'react';
import styled from 'styled-components/macro';

export const Dashboard = ({ logout, session = { username: 'Tiago' } }) => (
  <Container>
    <Title>Hi {session.username}</Title>
    <p style={{ textAlign: 'center' }}>You are now logged in!</p>
    <Button onClick={logout}>Logout</Button>
  </Container>
);

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
