import React, { useEffect, useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import { getAllMovies } from "../../utils/MoviesApi";
import Preloader from "../Movies/Preloader/Preloader";

function App() {
  //СТЕЙТЫ

  //стейт для массива Всех фильмов
  const [allMovies, setAllMovies] = useState([]);

  //стейт для активации BurgerMenu
  const [isMenuActive, setIsMenuActive] = useState(false);

  //стейт для зарегистрированного пользователя
  const [isRegistered, setIsRegistered] = useState(true);

  //стейт для стилизации Header и его наполнения
  const [isPromo, setIsPromo] = useState(false);

  //стейт для загрузки прелоадера
  const [isLoading, setisLoading] = useState(false);

  //стейт для введенного в поле запроса значения
  const [movieQuery, setMovieQuery] = useState(""); //он нужен??




  //ФУНКЦИИ

  //функция первоначального поиска и записи фильмов в стейт
  const handleSearch = () => {
    console.log("работает");
    //запускаем Прелоадер
    setisLoading(true);
    //получили все карточки из базы и записали их в стейт
    getAllMovies()
      .then((allMoviesData) => setAllMovies(allMoviesData))
      .then(console.log("allMovies1", allMovies)) //убери потом это
      .catch((err) => console.log(err))

      //TODO: Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз

      //выключили Прелоадер
      .finally(() => {
        setisLoading(false);
      });
  };

  console.log("allMovies2", allMovies);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Register isRegistered={false} />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <Main
              menuActive={isMenuActive}
              setActive={setIsMenuActive}
              isRegistered={isRegistered}
              isPromo={true}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              isRegistered={isRegistered}
              menuActive={isMenuActive}
              setActive={setIsMenuActive}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              menuActive={isMenuActive}
              setActive={setIsMenuActive}
              isRegistered={isRegistered}
              isPromo={false}
              handleSearch={handleSearch}
              isLoading={isLoading}
              allMovies={allMovies}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              menuActive={isMenuActive}
              setActive={setIsMenuActive}
              isRegistered={isRegistered}
              isPromo={false}
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
