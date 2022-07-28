import React from 'react';

function ImagePopup({ card, onClose }) {

    return (
        <section className={'popup zoom-popup' + " " + (card.link && 'popup_opened')} >
            <div className="zoom-popup__container">
                <button className="popup__close-btn delete-popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="zoom-popup__card" alt="user_place" src={card.link} />
                <h2 className="zoom-popup__title">{card.name}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;