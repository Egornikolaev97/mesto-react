const PopupWithForm = ({name, title, titleButton, isOpen, children, onClose, onSubmit}) => {

    return (
        <div className={`popup popup_${name}` + (isOpen && ' popup_opened')}>
        <div className="popup__container">
            <button type="button" className="popup__close" aria-label="закрыть форму" onClick={onClose}>Закрыть</button>
            <form name="profile" className="form form_profile-edit" noValidate onSubmit={onSubmit}>
                <h2 className="form__title">{title}</h2>
                <fieldset className="form__fieldset">
                    {children}
                </fieldset>
                <button type="submit" className="form__submit form__submit_type-edit"
                    aria-label="сохранить изменения">{titleButton}</button>
            </form>
        </div>
    </div>
    )
};

export default PopupWithForm