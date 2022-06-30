import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import avatarPreloader from '../images/avatarka.jpg';
import api from '../utils/Api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  //states variables of components
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Загрузка',
    about: '...',
    avatar: avatarPreloader,
  });

  //get user information and inital cards from the server
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, userCard]) => {
        setCurrentUser(userData);
        setCards(userCard);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
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

  const confirmCardDelete = (card) => {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  };

  //function for setting like to card
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  };

  //function for deleting card
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for editing user info
  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for edtiting user avatar
  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for adding cards
  const handleAddCards = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //function for closing popups
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
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
          onCardDelete={confirmCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddCards} />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateAvatar} />

        <ConfirmDeletePopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateAvatar}
        onConfirm={handleCardDelete}
        card={cardToDelete} />

        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
