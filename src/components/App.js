import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';
import api from '../utils/Api';

function App() {

  // Хуки
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({}); // переменная состояния currentUser
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => { // эффект при монтировании
    api.getProfileInfo().then((userStats) => {
      setCurrentUser(
        userStats
      )
    })
      .catch((err) => {
        console.log(err);
      })

    api.getCards().then((data) => {
      setCards(
        data.map((card) => ({
          _id: card._id,
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes
        }))
      )
    })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) { // Код, который будет вызываться при клике на лайк
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) { // 
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
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

  return (
    <CurrentUserContext.Provider value={currentUser}> // «обернуть» в провайдер объекта CurrentUserContext всё текущее содержимое корневого компонента
      <CardContext.Provider value={cards}>
        <div className="page">
          <div className="page__content">

            <Header />
            <Main
              onEditAvatar={setIsEditAvatarPopupOpen}
              onEditProfile={setIsEditProfilePopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onCardClick={setSelectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

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

          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;