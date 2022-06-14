
import avatar from '../images/avatarka.jpg';
import api from '../utils/Api.js';
import React from 'react';
import Card from './Card';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

    //state variables of components
    const [userName, setUserName] = React.useState('Загрузка');
    const [userDescription, setUserDesctription] = React.useState('...');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);

    //get cards and user information
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, userCard]) => {
        setUserName(userData.name);
        setUserDesctription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(userCard);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }, []);


    return (
        <main>
        <section className="profile">
            <div className="profile__avatar-container">
                <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
                <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <p className="profile__about">{userDescription}</p>
                <button type="button" className="profile__edit-btn" aria-label="редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <button type="button" className="profile__add-btn" aria-label="добавить фотографии" onClick={onAddPlace}></button>
        </section>
        <section aria-label="Фотографии красивых мест" className="photo-grid">
            {cards.map((card) => (
                <Card card={card} key={card._id} onCardClick={onCardClick}/>
            ))}
        </section>
    </main>
    );
};

export default Main;