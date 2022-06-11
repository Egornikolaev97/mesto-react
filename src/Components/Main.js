
import avatar from '../images/avatarka.jpg';


const Main = ({ onEditProfile, onAddPlace, onEditAvatar}) => {


    return (
        <main>
        <section className="profile">
            <div className="profile__avatar-container">
                <img className="profile__avatar" src={avatar} alt="Аватар пользователя" />
                <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">Загрузка</h1>
                <p className="profile__about">...</p>
                <button type="button" className="profile__edit-btn" aria-label="редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <button type="button" className="profile__add-btn" aria-label="добавить фотографии" onClick={onAddPlace}></button>
        </section>
        <section aria-label="Фотографии красивых мест" className="photo-grid">
        </section>
    </main>
    );
};

export default Main;