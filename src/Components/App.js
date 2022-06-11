import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';



function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);


    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
    }



  return (
    <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />

        <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        titleBtn='Сохранить'
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
        titleBtn='Создать'
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
        titleBtn='Сохранить изменения'
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

    <template className="card-template">
        <div className="photo-grid__item">
            <button type="button" className="photo-grid__show-btn">
                <img className="photo-grid__image" src="ссылка" alt="здесь красивая фотография" />
            </button>
            <div className="photo-grid__info">
                <h2 className="photo-grid__title"></h2>
                <div className="photo-grid__like-container">
                    <button type="button" className="photo-grid__like"></button>
                    <span className="photo-grid__like-counter">0</span>
                </div>
                <button type="button" className="photo-grid__delete"></button>
            </div>
        </div>
    </template>
    </div>
  );
}

export default App;


{/* <div className="popup popup_edit">
<div className="popup__container">
    <button type="button" className="popup__close popup__close-edit" aria-label="закрыть форму">Закрыть</button>
    <form name="profile" className="form form_profile-edit" noValidate>
        <h2 className="form__title">Редактировать профиль</h2>
        <fieldset className="form__fieldset">
            <label className="form__field">
                <input id="name-input" name="name" placeholder="Введите имя" autoComplete="off"
                     type="text" required minlength="2" maxlength="40"
                     className="form__input form__input_type_name" />
                <span className="name-input-error form__error"></span>
            </label>
            <label className="form__field">
                <input id="about-input" placeholder="Введите профессию" name="about" autoComplete="off"
                     type="text" required minlength="2" maxlength="200"
                     className="form__input form__input_type_about" />
                <span className="about-input-error form__error"></span>
            </label>
        </fieldset>
        <button type="submit" className="form__submit form__submit_type-edit"
            aria-label="сохранить изменения">Сохранить</button>
    </form>
</div>
</div>

<div className="popup popup_add">
<div className="popup__container">
    <button type="button" className="popup__close popup__close-add" aria-label="закрыть форму">Закрыть</button>
    <form name="Cards" className="form form_cards-add" noValidate>
        <h2 className="form__title">Новое место</h2>
        <fieldset className="form__fieldset">
            <label className="form__field">
            <input
            id="place-input"
            name="place"
            autoComplete="off"
            placeholder="Название"
            type="text"
            className="form__input form__input_type_title"
            required minlength="2"
            maxlength="30" />
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
        </fieldset>
        <button type="submit" className="form__submit form__submit_type-add"
            aria-label="сохранить изменения">Создать
        </button>
    </form>
</div>
</div>

<div className="popup popup_show popup_darkoverlay">
<div className="popup__fullscreen">
    <button type="button" className="popup__close popup__close-full" aria-label="закрыть форму">Закрыть</button>
    <img className="popup__image" src="ссылка" alt="здесь красивая фотография" />
    <p className="popup__description"></p>
</div>
</div>

<div className="popup popup_avatar">
<div className="popup__container">
    <button type="button" className="popup__close popup__close-avatar" aria-label="закрыть форму">Закрыть</button>
    <form className="form form_avatar-edit" noValidate>
        <h2 className="form__title">Обновить аватар</h2>
        <fieldset className="form__fieldset">
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
        </fieldset>
        <button type="submit" className="form__submit form__submit_type-add"
            aria-label="сохранить изменения">Создать
        </button>
    </form>
</div>
</div>

<div className="popup popup_delete">
<div className="popup__container">
    <form className="form form_delete">
    <h2 className="form__title">Вы уверены?</h2>
    <button type="submit" className="form__submit form__submit-type-confirm" aria-label="сохранить изменения">Да
    </button>
    <button type="button" className="popup__close popup__close-delete" aria-label="закрыть форму">Закрыть</button>
    </form>
</div>
</div> */}