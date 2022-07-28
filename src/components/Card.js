import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const user = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === user._id; // Определяю, являюсь ли я владельцем текущей карточки
    const cardDeleteButtonClassName = (`photo-gallery__delete-btn ${isOwn ? 'photo-gallery__delete-btn_visible' : 'photo-gallery__delete-btn_hidden'}`);
    const isLiked = props.likes.some(i => i._id === user._id); // Определяею, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = (`${isLiked ? 'photo-gallery__like-btn_active' : 'photo-gallery__like-btn'}`);


    function handleCardClick() {
        props.onCardClick(props);
    }

    function handleCardLike() {
        props.onCardLike(props);
    }

    function handleCardDelete() {
        props.onCardDelete(props);
    }

    return (

        <li className="photo-gallery__card">
            <img
                className="photo-gallery__item"
                src={props.link}
                alt={props.name}
                onClick={handleCardClick} />
            <h2 className="photo-gallery__title">{props.name}</h2>
            <div className="photo-gallery__like">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Лайк"
                    onClick={handleCardLike} />
                <p className="photo-gallery__like-counter">{props.likes.length}</p>
            </div>
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Корзина"
                onClick={handleCardDelete} />
        </li>
    );
}

export default Card;