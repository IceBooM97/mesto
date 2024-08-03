const  main = document.querySelector('.main');

const editProfileButton = main.querySelector('.profile__edit-button');
const profileName = main.querySelector('.profile__name');
const profileDescription = main.querySelector('.profile__description');
const popupEditProfile = document.getElementById('popupEdit');
const closePopupProfileButton = popupEditProfile.querySelector('.popup__close-button');
const formElementEdit = popupEditProfile.querySelector('.form');
const inputEditName = formElementEdit.querySelector('.form__input_name');
const inputEditDescription = formElementEdit.querySelector('.form__input_description');

const addCardButton = main.querySelector('.profile__add-button');
const popupAdd = document.getElementById('popupAdd');
const closeAddPopupButton = popupAdd.querySelector('.popup__close-button');
const formElementAdd = popupAdd.querySelector('.form');
const inputAddImageName = formElementAdd.querySelector('.form__input_image-name');
const inputAddImageLink = formElementAdd.querySelector('.form__input_link');

const popupTypeImage = document.getElementById('popupTypeImage');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupText = popupTypeImage.querySelector('.popup__image-name');
const closeImagePopupButton = popupTypeImage.querySelector('.popup__close-button');

const cardsContainer = main.querySelector('.cards__container');
const template = document.getElementById('cardTemplate').content.querySelector('.card');

function handleToggleLike(cardLikeBtn) {
cardLikeBtn.classList.toggle('card__like-button_active')
}// Поставить/убрать лайк

function handleDeleteCard(cardElement) {
    cardElement.remove()
}// Удаление карточки



function createCards(card) {
    const cardElement = template.cloneNode(true);
    const imageElement = cardElement.querySelector('.card__image');
    const nameElement = cardElement.querySelector('.card__name');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');    
    
    imageElement.src = card.link;
    imageElement.alt = 'Фото ' + card.name;;
    nameElement.textContent = card.name;

    cardLikeBtn.addEventListener('click', () => handleToggleLike(cardLikeBtn));
    cardDeleteBtn.addEventListener('click', () => handleDeleteCard(cardElement));
    imageElement.addEventListener('click', () => handleOpenImagePopup(imageElement.src, nameElement.textContent));
   
    return cardElement;
} //Создание карточки, добавление слушателей

function handleOpenImagePopup(link, name) {    
    popupImage.src = link;
    popupImage.alt = 'Фото ' + name;
    popupText.textContent = name;
    openPopup(popupTypeImage);
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened')
} // Открытие "попапов"

const closePopup = (popup) => {
    popup.classList.remove('popup_opened')
} // Закрытие "попапов"

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.
    profileName.textContent = inputEditName.value;
    profileDescription.textContent = inputEditDescription.value;   
    closePopup(popupEditProfile);
}
formElementEdit.addEventListener('submit', handleEditFormSubmit); 

function handleAddFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.
    const card = {
        name: inputAddImageName.value,
        link: inputAddImageLink.value
    };                         
    const newCard = createCards(card)
    cardsContainer.prepend(newCard);
    closePopup(popupAdd);
    formElementAdd.reset();
}
formElementAdd.addEventListener('submit', handleAddFormSubmit); 

document.addEventListener("DOMContentLoaded", () => {
    initialCards.forEach(card => {
        const cardElement = createCards(card);
        cardsContainer.appendChild(cardElement);
    })
})
//Создание первых 6 карточек при загрузке страницы

editProfileButton.addEventListener('click', () => openPopup(popupEditProfile));
closePopupProfileButton.addEventListener('click', () => closePopup(popupEditProfile));

addCardButton.addEventListener('click', () => openPopup(popupAdd));
closeAddPopupButton.addEventListener('click', () => closePopup(popupAdd));

closeImagePopupButton.addEventListener('click', () => closePopup(popupTypeImage));
//можно передалать закрытие в цикле для всех крестиков.

editProfileButton.addEventListener('click', () => {
    inputEditName.value = profileName.textContent;
    inputEditDescription.value = profileDescription.textContent;
}); //При открытии формы поля «Имя» и «О себе» заполняются теми значениями, 
    //которые отображаются на странице.
