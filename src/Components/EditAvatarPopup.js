import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateUser }) => {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';

    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            avatar: avatarRef.current.value,
        });
    };


    return (
        <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        titleButton='Сохранить изменения'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <label className="form__field">
            <input
            ref={avatarRef}
            id="avatar-input"
            name="link"
            autoComplete="off"
            placeholder="ссылка на картинку"
            type="url"
            className="form__input form__input_type_link"
            required />
                <span className="avatar-input-error form__error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
