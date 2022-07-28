//формы
export const formElementAdd = document.querySelector('.add-popup__form');
export const formElementEdit = document.querySelector('.edit-popup__form');
export const formElementEditAvatar = document.querySelector('.edit-avatar-popup__form');

//аватар
export const profileAvatar = document.querySelector ('.profile__avatar');

export const userData = {
    nameValueSelector: '.profile__inner-name',
    jobValueSelector: '.profile__inner-activity',
    avatarSelector: '.profile__avatar-img'
}

export const formElementList = {
    input: '.popup__input',
    submitButton: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_error',
    errorTextClass: 'popup__input_texterror'
  };

//кнопки
export const buttonEdit = document.querySelector('.profile__inner-edit-btn'); // Редактировать
export const buttonAdd = document.querySelector('.profile__add-btn'); // Добавить фотографию

//инпуты
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');