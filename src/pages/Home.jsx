import React from 'react';
import Banner from '../components/Banner/Banner';
import Introduction from '../components/Introduction/Introduction';
import Partners from '../components/Partners/Partners';
import Activities from '../components/Activities/Activities';
import TopEvents from '../components/TopEvents/TopEvents';
import AfterMovies from '../components/AfterMovies/AfterMovies';
import Team from '../components/Team/Team';

const Home = () => {
    return (
        <>
            <Banner />
            <Introduction />
            <Partners />
            <Activities />
            <TopEvents />
            <AfterMovies />
            <Team />
        </>
    );
};

export default Home;
