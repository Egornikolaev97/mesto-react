import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    const handleChangeName = (event) => {
        setName(event.target.value);
    }


    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }


    return (
        <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        titleButton='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
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
            onChange={handleChangeName}
            value={name ? name : ''}
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
            className="form__input form__input_type_about"
            onChange={handleChangeDescription}
            value={description ? description : ''}
            />
              <span className="about-input-error form__error"></span>
          </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;