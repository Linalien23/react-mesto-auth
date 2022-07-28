import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef(''); // реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению

    React.useEffect(() => { // Очищать инпуты только при открытии (монтировании)
        avatarRef.current.value = ''
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='edit-avatar-form'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'>
            <input
                id='url-input-avatar'
                ref={avatarRef}
                className='popup__input popup__input_type_url'
                type='url' name='avatar'
                placeholder='Ссылка на аватар'
                required />
            <span className='url-input-avatar-error popup__texterror edit-avatar-popup__texterror' />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;