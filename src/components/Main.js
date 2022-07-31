import React, { useEffect, useState } from 'react';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

    const user = React.useContext(CurrentUserContext); // подписка на контекст


    return (
        <main>

            <section className='profile'>
                <div className='profile__avatar'>
                    <button
                        className='profile__avatar-btn'
                        type='button'
                        aria-label='Изменить_аватар'
                        onClick={() => { onEditAvatar(true) }} />
                    <img
                        src={user.avatar}
                        alt='Аватар'
                        className='profile__avatar-img'
                        onClick={() => { onEditAvatar(true) }} />
                </div>
                <div className='profile__inner'>
                    <h1 className='profile__inner-name'>{user.name}</h1>
                    <button
                        className='profile__inner-edit-btn'
                        type='button'
                        aria-label='Редактировать'
                        onClick={() => { onEditProfile(true) }} />
                    <p className='profile__inner-activity'>{user.about}</p>
                </div>
                <button
                    className='profile__add-btn'
                    type='button'
                    aria-label='Добавить_фотографию'
                    onClick={() => { onAddPlace(true) }} />
            </section>

            <section className='photo-gallery'>
                <ul className='photo-gallery__cards'>
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            _id={card._id}
                            name={card.name}
                            link={card.link}
                            owner={card.owner}
                            likes={card.likes}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>

        </main>
    );
}

export default Main;