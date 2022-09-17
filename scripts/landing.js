// Below are for the popup responsiveness
const signupBtn = document.getElementById('signUp');
const popContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.popup-back-btn');

// Below are primarly for the Sign Up api
const registerForm = document.querySelector('.popup-contents');
const registerBtn = document.getElementById('register');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// Below are primarly for the Sign In api
const signInForm = document.querySelector('.lp-content-form');


// signupBtn is for responsive popup
signupBtn.addEventListener('click', ()=>{
    popContainer.classList.add('show')
});
closeBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
})

// send the sign up info to signUp.php
// http://localhost/twitter-clone/apis/signUp.php ---> Sign up api
// http://localhost/twitter-clone/apis/test.php ---> get data
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(registerForm);
    fetch("http://localhost/twitter-clone/apis/test.php")
        .then(res =>{
            return res.json()
        })
        .then(data =>{
            for(let entry of data){
                // console.log(entry);
                if(userName.value === entry.username || email.value === entry.email || phone.value === entry.phone){
                    console.log('Repeated value in ',entry)
                    // e.preventDefault()
                    return 'request invalid'
                    // put a class to add red text as a warning
                }
            }
            return fetch("http://localhost/twitter-clone/apis/signUp.php",{method: 'post', body: formData})
        })
        .then(req=>{
            console.log('REEEEEEEEEEEEQUESSSSSST SENT')
            return req.json()
        })
        .then(data =>{
            console.log('data:', data)
        })
        .catch(e=>{
            console.log('Error', e)
        })
})


// Send the sign in data and compare the values and return the id


