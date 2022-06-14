import React from 'react';

const Card = ({card, onCardClick}) => {

    const handleCardClick = () => {
        onCardClick(card)
        console.log(card)
    }

    return (
        <div className="photo-grid__item">
            <button type="button" className="photo-grid__show-btn" onClick={handleCardClick}>
                <img className="photo-grid__image" src={card.link} alt={card.name}/>
            </button>
            <div className="photo-grid__info">
                <h2 className="photo-grid__title">{card.name}</h2>
                <div className="photo-grid__like-container">
                    <button type="button" className="photo-grid__like"></button>
                    <span className="photo-grid__like-counter">{card.likes.length}</span>
                </div>
                <button type="button" className="photo-grid__delete"></button>
            </div>
        </div>
    )
}

export default Card;