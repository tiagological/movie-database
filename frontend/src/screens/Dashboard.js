import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context';
import styled from 'styled-components/macro';
import { Layout } from '../components';
import { logout, fetchWatchList } from '../services/session';
import MoonLoader from 'react-spinners/MoonLoader';
import emptyListImage from '../assets/images/list-is-empty.png';
import { AiOutlineUser } from 'react-icons/ai';

export const Dashboard = () => {
  const {
    session,
    setSession,
    setErrors,
    watchList: watchListData,
    setWatchList,
    movieBaseURL,
    setIsLoggedIn,
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchWatchList = async () => {
      await fetchWatchList(setWatchList).catch((err) => console.log(err));
      setIsLoading(false);
    };
    handleFetchWatchList();
  }, []);

  const handleLogout = () => {
    logout(setSession, setErrors, setIsLoggedIn);
  };

  const emptyListPlaceholder = (
    <EmptyListContainer>
      <EmptyListPlaceHolder src={emptyListImage} />
      <Text>Your watch list is currently empty</Text>
    </EmptyListContainer>
  );

  const watchList = watchListData.map((movie) => {
    const formattedDuration = `${Math.floor(movie.runtime / 60)}${
      movie.runtime / 60 > 1 ? 'hrs' : 'hr'
    } ${movie.runtime % 60} mins`;

    return (
      <MovieDataContainer key={movie.id}>
        <ImageWrapper>
          <OuterContainer>
            <InnerImgContainer>
              <Image src={`${movieBaseURL}w342${movie.poster_path}`} />
            </InnerImgContainer>
          </OuterContainer>
        </ImageWrapper>
        <MovieInfoContainer>
          <MovieTitle>{movie.title}</MovieTitle>
          <Duration>{formattedDuration}</Duration>
        </MovieInfoContainer>
      </MovieDataContainer>
    );
  });

  const watchListIsEmpty = watchList.length === 0;

  if (isLoading) {
    return (
      <Container>
        <LoaderContainer>
          <MoonLoader color='#fff' />
        </LoaderContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Layout>
        <InnerContainer>
          <UserContainer>
            <UserAvatar />
            <Username>{session.username}</Username>
          </UserContainer>
          {watchListIsEmpty ? (
            emptyListPlaceholder
          ) : (
            <>
              <WatchListTitle>Watchlist</WatchListTitle>
              {watchList}
            </>
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </InnerContainer>
      </Layout>
    </Container>
  );
};

const EmptyListContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyListPlaceHolder = styled.img`
  width: 100%;
  height: auto;
`;

const Text = styled.span`
  margin: 3rem 0;
`;

const WatchListTitle = styled.h2`
  padding: 0 3rem;
`;

const MovieDataContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #fff;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    padding: 0 5rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: auto;
  flex-shrink: 0;
  padding: 1rem 0;
  margin: 0 2rem;
`;

const OuterContainer = styled.div`
  height: 0px;
  width: 25vw;
  padding-bottom: 150%;
  position: relative;
`;

const InnerImgContainer = styled.div`
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
  border-radius: 8px;
`;

const MovieInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 2rem;
`;

const MovieTitle = styled.h3``;

const Duration = styled.span``;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(98, 98, 98, 1) 100%
  );
  background-repeat: no-repeat;
  overflow: auto;
  color: #fff;
`;

const LoaderContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
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

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserAvatar = styled(AiOutlineUser)`
  color: #fff;
  width: 20vw;
  height: auto;
`;

const Username = styled.span`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0;
`;

const Button = styled.button`
  margin: 2rem;
  padding: 1.5rem 0;
  font-size: 2rem;
  background: transparent;
  border: 1px solid white;
  border-radius: 8px;
  color: #fff;

  :hover {
    cursor: pointer;
  }
`;
