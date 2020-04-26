import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import styled from 'styled-components/macro';

export const MovieCard = ({ title, poster_path, base_url }) => {
  return (
    <StyledCard>
      <CardActionArea>
        <ImageWrapper>
          <OuterContainer>
            <InnerContainer>
              <Image src={`${base_url}w342${poster_path}`} />
            </InnerContainer>
          </OuterContainer>
        </ImageWrapper>
      </CardActionArea>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 45vw;
  margin: 1rem 0;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const OuterContainer = styled.div`
  height: 0px;
  width: 100%;
  padding-bottom: 150%;
  position: relative;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
