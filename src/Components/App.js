import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';


const App = () => {

    //states variables of components
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState([]);
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, userCard]) => {
      setCurrentUser(userData)
      setCards(userCard);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }, []);


    //functions for openning popups

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };


    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };


    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };


    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCardLike = (card) => {
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      api.toggleLikeStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => console.log(err));
    }

    const handleCardDelete = (card) => {
      api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      }).catch((err) => console.log(err));
    }


    //function for closing popups
    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        titleButton='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
          <label className="form__field">
            <input
            id="name-input"
            name="name"
            placeholder="Введите имя"
            autoComplete="off"
            type="text"
            required
            minLength={2}
            maxLength={40}
            className="form__input form__input_type_name"
            />
            <span className="name-input-error form__error"></span>
          </label>
          <label className="form__field">
            <input
            id="about-input"
            placeholder="Введите профессию"
            name="about"
            autoComplete="off"
            type="text"
            required
            minLength={2}
            maxLength={200}
            className="form__input form__input_type_about" />
              <span className="about-input-error form__error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
        name='add'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >
            <label className="form__field">
            <input
            id="place-input"
            name="place"
            autoComplete="off"
            placeholder="Название"
            type="text"
            className="form__input form__input_type_title"
            required
            minLength={2}
            maxLength={30} />
                <span className="place-input-error form__error"></span>
            </label>
            <label className="form__field">
            <input
            id="link-input"
            name="link"
            autoComplete="off"
            placeholder="Ссылка на картинку"
            type="url"
            className="form__input form__input_type_link"
            required />
                <span className="link-input-error form__error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        titleButton='Сохранить изменения'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        >
        <label className="form__field">
            <input
            id="avatar-input"
            name="avatar"
            autoComplete="off"
            placeholder="ссылка на картинку"
            type="url"
            className="form__input form__input_type_link"
            required />
                <span className="avatar-input-error form__error"></span>
            </label>
        </PopupWithForm>

        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;