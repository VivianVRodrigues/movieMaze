import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchData } from "./util/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiConfig } from "./store/homeSlice";

function App() {
  // const dispatch = useDispatch();
  // const { url } = useSelector((state) => state.home);

  // useEffect(() => {
  //   apiTest();
  // }, []);

  // const apiTest = () => {
  //   fetchData("/movie/popular").then((res) => {
  //     console.log(res.data);
  //     dispatch(getApiConfig(res.data));
  //   });
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    // fetchData("/configuration").then((res) => {
    //   const imagePath = res.data.images.secure_base_url + "original";

    //   const url = {
    //     backdrop: imagePath,
    //     poster: imagePath,
    //     profile: imagePath,
    //   };

    //   dispatch(getApiConfig(url));
    // });
    const imagePath = "https://image.tmdb.org/t/p/original";

    const url = {
      backdrop: imagePath,
      poster: imagePath,
      profile: imagePath,
    };

    dispatch(getApiConfig(url));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/:mediaType/:id" element={<Details></Details>} />
        <Route path="/explore/:mediaType" element={<Explore></Explore>} />
        <Route path="/search/:query" element={<SearchResult></SearchResult>} />
        <Route path="*" element={<PageNotFound></PageNotFound>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
