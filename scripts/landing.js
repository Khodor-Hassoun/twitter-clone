// Below are for the popup responsiveness
const signupBtn = document.getElementById('signUp');
const popContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.popup-back-btn');

// Below are primarly for the apis
const registerForm = document.querySelector('.popup-contents');
const registerBtn = document.getElementById('register');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');


// signupBtn is for responsive popup
signupBtn.addEventListener('click', ()=>{
    popContainer.classList.add('show')
});
closeBtn.addEventListener('click',()=>{
    popContainer.classList.remove('show')
})

// send the sign up info to api
// http://localhost/twitter-clone/apis/signUp.php ---> Sign up api
// http://localhost/twitter-clone/apis/test.php ---> get
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(registerForm);
    // e.preventDefault()
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
}) //RegisterForm