import React from 'react';
import PopupWithForm from './PopupWithForm';


const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeLink = (event) => {
        setLink(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onAddPlace({
            name: name,
            link: link
        });
    }


    return (
        <PopupWithForm
        name='add'
        title='Новое место'
        titleButton='Создать'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <label className="form__field">
            <input
            id="place-input"
            name="name"
            autoComplete="off"
            placeholder="Название"
            type="text"
            className="form__input form__input_type_title"
            required
            minLength={2}
            maxLength={30}
            onChange={handleChangeName}
            value={name ? name : ''}/>
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
            required
            onChange={handleChangeLink}
            value={link ? link : ''}
            />
                <span className="link-input-error form__error"></span>
            </label>
        </PopupWithForm>
    )

}

export default AddPlacePopup;