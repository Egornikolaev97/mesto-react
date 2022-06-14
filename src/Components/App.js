import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



const App = () => {

    //states variables of components
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);


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

    //function for closing popups
    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    };


  return (
    <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
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

    </div>
  );
}

export default App;


// <div className="popup popup_delete">
// <div className="popup__container">
//     <form className="form form_delete">
//     <h2 className="form__title">Вы уверены?</h2>
//     <button type="submit" className="form__submit form__submit-type-confirm" aria-label="сохранить изменения">Да
//     </button>
//     <button type="button" className="popup__close popup__close-delete" aria-label="закрыть форму">Закрыть</button>
//     </form>
// </div>
// </div>