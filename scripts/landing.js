// Below are for the popup responsiveness
const signupBtn = document.getElementById('signUp');
const popContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.popup-back-btn');
const popContainer2 = document.querySelector('.popup2-container');
const imgsBtn = document.querySelector('.pop-btn');

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

// signupBtn is for responsive popup 1
signupBtn.addEventListener('click', ()=>{
    popContainer.classList.add('show')
});
closeBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
})

// registerBtn for popup2
registerBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
    popContainer2.classList.add('show2')
})
imgsBtn.addEventListener('click',()=>{
    popContainer2.classList.remove('show2')
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
// http://localhost/twitter-clone/apis/signIn.php
signInForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formData = new FormData(signInForm);
    fetch('http://localhost/twitter-clone/apis/signIn.php',{method: 'post', body: formData})
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


