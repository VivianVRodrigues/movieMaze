// import { useEffect } from "react";
// import { fetchData } from "./util/api";
// import { useDispatch, useSelector } from "react-redux";
// import { getApiConfig } from "./store/homeSlice";

import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
