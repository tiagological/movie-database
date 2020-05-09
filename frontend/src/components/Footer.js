import React from 'react';
import styled from 'styled-components/macro';

export const Footer = () => {
  const date = new Date();

  return (
    <Container>
      <Text>Copyright &copy; {date.getFullYear()} Movie Database</Text>
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
`;

const Text = styled.span`
  color: #fff;
`;
