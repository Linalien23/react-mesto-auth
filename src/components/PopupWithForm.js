import React from 'react';

function PopupWithForm({ name, title, isOpen, children, onClose, buttonText, onSubmit }) {

    return (
        <section className={`popup popup_type_${name}` + ' ' + (isOpen ? 'popup_opened' : '')}>
            <div className="popup__container">
                <button className="popup__close-btn edit-popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} ></button>
                <form className="popup__form edit-popup__form" name={name} onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                    {children}
                    <button className="popup__submit-btn edit-popup__submit-btn" type="submit">{buttonText}</button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;