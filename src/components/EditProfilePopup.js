import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const user = React.useContext(CurrentUserContext); // подписка на контекст

    // управляемые компоненты с переменными состояния
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // эффект, который будет обновлять переменные состояния при изменении контекста
    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit-form'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'>
            <input
                id="name-input"
                value={name || ''}
                onChange={handleChangeName}
                className="popup__input popup__input_type_name"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required />
            <span className="name-input-error popup__texterror popup__texterror_top" />
            <input
                id="job-input"
                value={description || ''}
                onChange={handleChangeDescription}
                className="popup__input popup__input_type_job"
                type="text" name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required />
            <span className="job-input-error popup__texterror popup__texterror_bottom" />
        </PopupWithForm>
    );

}

export default EditProfilePopup;