import { useState, useRef } from 'react';
import axios from 'axios';

const useHandleSearch = () => {
  const [item, setItem] = useState(null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState();
  const [reviews, setReviews] = useState();
  // const [similars, setSimilars] = useState();
  const fetchReviewsCalled = useRef(false);
  const fetchDataCalled = useRef(false);
  const fetchCreditsCalled = useRef(false);
  // const fetchSimilarCalled = useRef(false);

  const fetchDetails = async () => {
    if (!fetchDataCalled.current && item !== undefined && item !== null) {
      const url = `https://api.themoviedb.org/3/movie/${item}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhOTFjNTY4YjYyNWRjMTBiYjMyMTZiMmU4OTNjZSIsInN1YiI6IjY1YjM3OTVkYTA2NjQ1MDE3YzhkODdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-J_vpdCaIcpcHQqeu_ltZbhKGRyu_a4IsRKGb1g_wY',
        },
      };
      try {
        const response = await axios.get(url, options);
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        throw new Error('There was an error fetching the data.');
      } finally {
        fetchDataCalled.current = true;
      }
    }
  };

  const fetchCredits = async () => {
    if (!fetchCreditsCalled.current && item !== undefined && item !== null) {
      const url = `https://api.themoviedb.org/3/movie/${item}/credits?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhOTFjNTY4YjYyNWRjMTBiYjMyMTZiMmU4OTNjZSIsInN1YiI6IjY1YjM3OTVkYTA2NjQ1MDE3YzhkODdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-J_vpdCaIcpcHQqeu_ltZbhKGRyu_a4IsRKGb1g_wY',
        },
      };
      try {
        const response = await axios.get(url, options);
        setCredits(response.data.cast);
      } catch (error) {
        throw new Error('There was an error fetching the data.');
      } finally {
        fetchCreditsCalled.current = true;
      }
    }
  };

  const fetchReviews = async () => {
    if (!fetchReviewsCalled.current && item !== undefined && item !== null) {
      const url = `https://api.themoviedb.org/3/movie/${item}/reviews?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhOTFjNTY4YjYyNWRjMTBiYjMyMTZiMmU4OTNjZSIsInN1YiI6IjY1YjM3OTVkYTA2NjQ1MDE3YzhkODdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-J_vpdCaIcpcHQqeu_ltZbhKGRyu_a4IsRKGb1g_wY',
        },
      };
      try {
        const response = await axios.get(url, options);
        setReviews(response.data);
      } catch (error) {
        throw new Error('There was an error fetching the reviews data.');
      } finally {
        fetchReviewsCalled.current = true;
      }
    }
  };

  // const fetchSimilars = async () => {
  //   if (!fetchReviewsCalled.current && item !== undefined && item !== null) {
  //     const url = `https://api.themoviedb.org/3/movie/${item}/similar?language=en-US`;
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhOTFjNTY4YjYyNWRjMTBiYjMyMTZiMmU4OTNjZSIsInN1YiI6IjY1YjM3OTVkYTA2NjQ1MDE3YzhkODdhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-J_vpdCaIcpcHQqeu_ltZbhKGRyu_a4IsRKGb1g_wY',
  //       },
  //     };
  //     try {
  //       const response = await axios.get(url, options);
  //       setSimilars(response.data.results.slice(0, 3));
  //       console.log(response.data.results);
  //     } catch (error) {
  //       throw new Error('There was an error fetching the reviews data.');
  //     } finally {
  //       fetchSimilarCalled.current = true;
  //     }
  //   }
  // };

  const fetchData = () => {
    fetchDetails();
    fetchCredits();
    fetchReviews();
  };

  return {
    fetchData,
    reviews,
    credits,
    setItem,
    data,
    isLoading,
  };
};

export default useHandleSearch;
