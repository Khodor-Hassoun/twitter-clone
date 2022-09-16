const signupBtn = document.getElementById('signUp');
const popContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.popup-back-btn');


signupBtn.addEventListener('click', ()=>{
    popContainer.classList.add('show')
});

closeBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
})