// Below are for the popup responsiveness
const signupBtn = document.getElementById('signUp');
const popContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.popup-back-btn');
const popContainer2 = document.querySelector('.popup2-container');
const imgsBtn = document.querySelector('.pop-btn');
const userErrorMsg = document.querySelector('.signup-userN-error')
const invalidSignUpMsg = document.querySelector('.signup-error-txt')
let signUpSuccess = false

// Below are primarly for the Sign Up api
const registerForm = document.querySelector('.popup-contents');
const registerBtn = document.getElementById('register');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

// Below are primarly for the Sign In api
const signInForm = document.querySelector('.lp-content-form');
const signInEmail = document.getElementById('signIn-email')
const signInpassword = document.getElementById('signIn-pword')

// signupBtn is for responsive popup
signupBtn.addEventListener('click', ()=>{
    popContainer.classList.add('show')
});
closeBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
})

// registerBtn for popup2
imgsBtn.addEventListener('click',()=>{
    popContainer2.classList.remove('show2')
})


// send the sign up info to signUp.php
// http://localhost/twitter-clone/apis/signUp.php ---> Sign up api
// http://localhost/twitter-clone/apis/test.php ---> get data
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(registerForm);
    fetch("http://localhost/twitter-clone/api/test.php")
        .then(res =>{
            return res.json()
        })
        .then(data =>{
            for(let entry of data){
                if(userName.value === entry.username){
                    userErrorMsg.classList.remove('hidden')
                }
                if(userName.value === entry.username || email.value === entry.email || parseInt(phone.value) === entry.phone){
                    console.log('Repeated value in ',entry);
                    invalidSignUpMsg.classList.remove("hidden");
                    email.parentElement.classList.add('signup-error');
                    userName.parentElement.classList.add('signup-error');
                    phone.parentElement.classList.add('signup-error');
                    signUpSuccess = false
                    return 'request invalid'
                }
            }
            signUpSuccess = true
            userErrorMsg.classList.add("hidden");
            invalidSignUpMsg.classList.add("hidden");
            email.parentElement.classList.remove("signup-error");
            userName.parentElement.classList.remove("signup-error");
            phone.parentElement.classList.remove("signup-error");
            return fetch("http://localhost/twitter-clone/api/signUp.php",{method: 'post', body: formData})
        })
        .then(req=>{
            console.log('REEEEEEEEEEEEQUESSSSSST SENT')
            return req.json()
        })
        .then(data =>{
            // When we know that the inputs are unique and the user is inside. Take him to popup 2

            popContainer.classList.remove('show')
            popContainer2.classList.add('show2')
            console.log('data:', data)
        })
        .catch(e=>{
            console.log('Error', e)
        })
})

// registerBtn.addEventListener('click',()=>{
//     if(signUpSuccess){
//         popContainer.classList.remove('show')
//         popContainer2.classList.add('show2')
//     }
   
// })


// Send the sign in data and compare the values and return the id
// http://localhost/twitter-clone/apis/signIn.php
signInForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formData = new FormData(signInForm);
    fetch('http://localhost/twitter-clone/api/signIn.php',{method: 'post', body: formData})
        .then(res =>{
            return res.json()
        })
        .then(data =>{
            if(!data){
                console.log('Thiiiiiiiiiiiiiiiissssss is NNUUUUUUUUUUULLLLLLLL')
                signInForm.classList.add('signin-error')
                signInForm.childNodes[7].classList.remove('hidden')
            }
            else{
                console.log(data)
                signInForm.classList.remove('signin-error')
                signInForm.childNodes[7].classList.add('hidden')
                localStorage.setItem("userId", data.id)
            }
        })
})


