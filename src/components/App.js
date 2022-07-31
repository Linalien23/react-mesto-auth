import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api';
import * as auth from '../utils/auth.js';
import union from '../images/Union.png';
import union_err from '../images/Union_Err.png';

function App() {

  // Хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); // переменная состояния currentUser
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const history = useHistory();

  useEffect(() => {
    checkToken()
  }, []);

  // Запрос к API за информацией о пользователе и массиве карточек при монтировании
  useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo()
        .then((userStats) => {
          setCurrentUser(
            userStats
          )
        })
        .catch((err) => {
          console.log(err);
        })

      api.getCards().
        then((data) => {
          setCards(data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function closeAllPopup() {
    setIsInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) { // Код, который будет вызываться при клике на лайк
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    function handleNewCardLike(newCard) {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }

    if (!isLiked) {
      api.likeCard(card._id)
        .then(handleNewCardLike)
        .catch(err => {
          console.log(err);
        });
    } else {
      api.dislikeCard(card._id)
        .then(handleNewCardLike)
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) { // Удаление карточки
    api.deleteCard(card, card._id)
      .then(() => {
        const result = cards.filter(item => item._id != (card._id));
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(data) { // Обновление инфы о пользователе
    api.updateUserInfo(data)
      .then((userStats) => {
        setCurrentUser(
          userStats
        )
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) { // Смена аватарки
    api.updateUserAvatar(data)
      .then((userStats) => {
        setCurrentUser(
          userStats
        )
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //
      });
  }

  function checkToken() {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const token = localStorage.getItem('token');
    if (token) {
      // проверим токен
      auth.getContent(token)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            const email = res.data.email
            setLoggedIn(true);
            setUserEmail(email);
          }
          history.push('/')
        })
        .catch((err) => console.log(err));
    }

  }

  function handleSignOut() { // удалить JWT-токен из localStorage и переадресовать пользователя на страницу /sign-in
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
    setUserEmail(null);
  }

  function onRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) { // Пользователь должен быть переадресован, только если форма регистрации правильно заполнена и отправлена
          history.push('./sign-in');
          setIsInfoTooltipOpen(true);
          setText('Вы успешно зарегистрировались!')
          setImage(union)
        } else {
          setIsInfoTooltipOpen(true);
          setText('Что-то пошло не так! Попробуйте ещё раз.')
          setImage(union_err)
        }
      })
      .catch((err) => console.log(err));
  }

  function onAuthorize(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/')
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}> // «обернуть» в провайдер объекта CurrentUserContext всё текущее содержимое корневого компонента

      <div className="page">
        <div className="page__content">
          
          <Header 
            email={userEmail} 
            onClick={ handleSignOut } />

          <Switch>

            <Route exact={true} path="/sign-in">
              <Login
                onAuthorize={onAuthorize} />
            </Route>

            <Route exact={true} path="/sign-up">
              <Register
                onButtonClick={onRegister} />
            </Route>

            <ProtectedRoute exact={true} path="/"
              loggedIn={loggedIn}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onEditProfile={setIsEditProfilePopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onCardClick={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
              userData={userEmail}
              onDeleteToken={handleSignOut}>
            </ProtectedRoute>

          </Switch>
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name='delete-form'
            title='Вы уверены?'
            buttonText='Да'>
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopup}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopup}
            image={image}
            text={text}
          />

        </div>
      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;