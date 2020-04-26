import React from 'react';
import styled from 'styled-components/macro';

export const Header = () => {
  return (
    <Container>
      <Text>Movie Database</Text>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const Text = styled.h1``;
