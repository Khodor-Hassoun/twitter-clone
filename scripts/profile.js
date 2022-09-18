const sideName = document.getElementById("feed-profile-name")
const sideUsername = document.getElementById("feed-profile-username")
const sideImg = document.getElementById("feed-profile-image")
const profileBg = document.getElementById("profileBg")
const profileImg = document.getElementById("profileImg")
const profileName = document.getElementById("profileName")
const profileUsername = document.getElementById("profileUsername")
const profileDate = document.getElementById("profileDate")
const profileFollowing = document.getElementById("profileFollowing")
const profileFollowers = document.getElementById("profileFollowers")

fetch(`http://localhost/twitter-clone/api/profile.php` // calls api to fille the visited profile information
  , {
    method: 'POST',
    body: new URLSearchParams({
      "profileId": localStorage.getItem("profileId"),
      "userId": localStorage.getItem("userId"),
    }),
  }).then(response => response.json()
  ).then(json => {
    profileImg.src = json[0].profile_picture
    console.log(`../${json[0].profile_background}`)
    console.log(`../${json[0].profile_picture}`)
    profileBg.style.backgroundImage = `url(${json[0].profile_background})`
    profileBg.classList.add("bg-img-prop")
    profileImg.style.backgroundImage = `url(${json[0].profile_picture})`
    profileImg.classList.add("bg-img-prop")
    profileUsername.innerHTML = json[0].username
    profileName.innerHTML = json[0].name
    profileDate.innerHTML = json[0].joining_date
    profileFollowing.innerHTML = `<span>${json[1][0].nb}</span> Following`
    profileFollowers.innerHTML = `<span>${json[2][0].nb}</span> Following`
  })

const profileImages = document.querySelectorAll(".feed-profile-img")

fetch(`http://localhost/twitter-clone/api/basic-user-home.php` // calls api for the logged in user information on the left side
  , {
    method: 'POST',
    body: new URLSearchParams({
      "userId": localStorage.getItem("userId"),
    }),
  }).then(response => response.json()
  ).then(json => {
    sideName.innerHTML = json[0].name
    sideUsername.innerHTML = json[0].username
    for (const i of profileImages) {
      i.src = json[0].profile_picture
    }
  })
