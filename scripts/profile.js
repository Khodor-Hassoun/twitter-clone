
// declaring edit profile elements to fill them later
const editHeader = document.getElementById("header")
const editName = document.getElementById("name")
const editUsername = document.getElementById("username")
const editEmail = document.getElementById("email")
const editPhone = document.getElementById("phone")
const editMonth = document.getElementById("month")
const editDay = document.getElementById("day")
const editYear = document.getElementById("year")
const editPassword = document.getElementById("password")
const Edit = document.getElementById("edit")



//adding profile data to profile page
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
const userId = localStorage.getItem("userId")
let profileId = localStorage.getItem("profileId")


fetch(`http://localhost/twitter-clone/api/profile.php` // calls api to fille the visited profile information
  , {
    method: 'POST',
    body: new URLSearchParams({
      "profileId": localStorage.getItem("profileId"),
      "userId": localStorage.getItem("userId"),
    }),
  }).then(response => response.json()
  ).then(json => {
    profileBg.style.backgroundImage = `url(${json[0].profile_background})`
    profileBg.classList.add("bg-img-prop")
    profileImg.style.backgroundImage = `url(${json[0].profile_picture})`
    profileImg.classList.add("bg-img-prop")
    profileUsername.innerHTML = json[0].username
    console.log(json[0].username)
    editUsername.value = json[0].username
    profileName.innerHTML = json[0].name
    editName.value = json[0].name
    editEmail.value = json[0].email
    editPhone.value = json[0].phone
    profileDate.innerHTML = json[0].joining_date
    profileFollowing.innerHTML = `<span>${json[1][0].nb}</span> Following`
    profileFollowers.innerHTML = `<span>${json[2][0].nb}</span> Following`
    date = json[0].dob.split("-")
    editYear.value=date[0]
    editMonth.value =parseInt(date[1])
    editDay.value=date[2]
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

// adjusting the page accroding to if he is the owner of the profile or not

const button = document.getElementById("profile-button")
const blockBtnLink = document.getElementById("block-button-link")
const popup = document.querySelector(".popup-container")

if (userId == profileId) {
  button.addEventListener("click",() => {
    popup.classList.add("show")

  })
}
else {
  fetch(`http://localhost/twitter-clone/api/check-follow.php` // calls api to check if the logged user is following the profile user
    , {
      method: 'POST',
      body: new URLSearchParams({
        "userId": userId,
        "follow": profileId,
      }),
    }).then(response => response.json()
    ).then(json => {
      if (json) {
        button.innerHTML = "Following"
      } else button.innerHTML = "Follow"
    })
  button.addEventListener("click", () => {
    fetch(`http://localhost/twitter-clone/api/follow.php` // calls api to follow or unfollow
      , {
        method: 'POST',
        body: new URLSearchParams({
          "userId": userId,
          "follow": profileId,
        }),
      }).then(response => response.json()
      ).then(json => {
        if (json == "added") {
          button.innerHTML = "Following"
        } else button.innerHTML = "Follow"
      })
  })

  blockBtnLink.style.display = "block" // adding blovking ability
  blockBtnLink.addEventListener("click", () => {
    fetch(`http://localhost/twitter-clone/api/block.php` // calls api to follow or unfollow
      , {
        method: 'POST',
        body: new URLSearchParams({
          "userId": userId,
          "block": profileId,
        }),
      }).then(response => response.json()
      ).then(json => {
        console.log(json)
      })
  })
}

// adding the profile feed

const mainFeed = document.getElementById("main-feed")

const tweetAssemble = (tweet, id, name, username, pp, date, text, nb, images, liked) => { // constructs new tweets
  const link = document.createElement("a")
  link.href = "profile.html"


  const feedTweet = document.createElement("div")
  feedTweet.classList.add("feed-tweet")
  link.appendChild(feedTweet)
  mainFeed.appendChild(feedTweet)

  const tweeterImg = document.createElement("img")
  tweeterImg.classList.add("tweet-image")
  tweeterImg.src = pp
  link.appendChild(tweeterImg)
  feedTweet.appendChild(link)

  tweeterImg.addEventListener("click", (e) => {
    e.stopPropagation()
    localStorage.setItem("profileId", id)
    console.log(id)
  })

  const tweetDetails = document.createElement("div")
  tweetDetails.classList.add("feed-tweet-details")
  feedTweet.appendChild(tweetDetails)


  const tweeterDetails = document.createElement("div")
  tweeterDetails.classList.add("tweeter-details")
  tweetDetails.appendChild(tweeterDetails)

  const tweeterName = document.createElement("a")
  tweeterName.classList.add("tweeter-name")
  tweeterName.innerHTML = `${name} <span class="tweeter-handle">@${username} <b>·</b> ${date}</span>`
  tweeterDetails.appendChild(tweeterName)

  const more = document.createElement("i")
  more.classList.add("material-icons-outlined")
  more.innerHTML = "more_horiz"
  tweeterDetails.appendChild(more)

  const tweettext = document.createElement("div")
  tweettext.classList.add("tweet-text")
  tweettext.innerHTML = `<p>${text}</p>`
  tweetDetails.appendChild(tweettext)

  if (nb > 0) { // checks for images and adjusts css accordingly
    const tweetImages = document.createElement("div")
    tweetImages.classList.add("feed-images")

    if (nb == 1) {
      tweetImages.style.gridTemplate = "repeat(1, 1fr) / repeat(1, 1fr)"
    } else if (nb == 2) {
      tweetImages.style.gridTemplate = "repeat(1, 1fr) / repeat(2, 1fr)"
    } else if (nb == 3) {
      tweetImages.style.gridTemplate = "repeat(2, 1fr) / repeat(2, 1fr)"
    } else if (nb == 4) {
      tweetImages.style.gridTemplate = "repeat(2, 1fr) / repeat(2, 1fr)"

    }
    let image
    for (let i = 0; i < nb - 1; i++) {
      image = document.createElement("img")
      image.classList.add("feed-image")
      image.src = images[i]
      tweetImages.appendChild(image)
    }
    tweetDetails.appendChild(tweetImages)
  }
  const tweetIcons = document.createElement("div")
  tweetIcons.classList.add("tweet-icons")
  tweetDetails.appendChild(tweetIcons)

  const like = document.createElement("i")
  like.classList.add("material-icons-outlined")
  like.innerHTML = `favorite_border`
  like.style.cursor = "pointer"
  if (liked == "1") like.style.color = "red"
  tweetIcons.appendChild(like)

  like.addEventListener("click", (e) => {
    e.stopPropagation()
    fetch(`http://localhost/twitter-clone/api/like.php` // calls the api for like/unlike
      , {
        method: 'POST',
        body: new URLSearchParams({
          "userId": userId,
          "tweet": tweet,
        }),
      }).then(response => response.json()
      ).then(json => {
        if (json == "added") {
          like.style.color = "red"
        } else like.style.color = "rgb(110,118,125)"
      })

  })

}

const checkLiked = (tweet, nb, imgArr) => {// calls the api for checking if a tweet is liked or not and then adds the tweet to the feed
  fetch(`http://localhost/twitter-clone/api/check-liked.php`
    , {
      method: 'POST',
      body: new URLSearchParams({
        "userId": userId,
        "tweet": tweet.tweet,
      }),
    }).then(response => response.json()
    ).then(json => {
      tweetAssemble(tweet.tweet, tweet.id, tweet.name, tweet.username, tweet.profile_picture, tweet.date, tweet.text, nb, imgArr, json)
    })

}

fetch(`http://localhost/twitter-clone/api/feed.php` // calls the api for feed tweets and then calls checkLiked
  , {
    method: 'POST',
    body: new URLSearchParams({
      "profileId": profileId,
    }),
  }).then(response => response.json()
  ).then(json => {
    console.log(json)
    let imgArr = []
    for (const tweet of json) {
      if (tweet.images != null) {
        imgArr = tweet.images.split(" ")
        nb = imgArr.length
      } else {
        nb = 0
      }
      checkLiked(tweet, nb, imgArr)
    }
  })


// Edit profile form handling

document.getElementById("close").addEventListener("click", () => { // closes the popup on x
  popup.classList.remove("show")
})

Edit.addEventListener('click', (e) => {
  e.preventDefault()

  fetch(`http://localhost/twitter-clone/api/edit.php` // calls the api for feed tweets and then calls checkLiked
  , {
    method: 'POST',
    body: new URLSearchParams({
      "userId": userId,
      "username": editUsername.value,
      "email": editEmail.value,
      "phone": editPhone.value,
      "dob": editYear.value + "-" + editMonth.value + "-" + editDay.value,
      "password": editPassword.value,
      "name": editName.value,
    }),
  }).then(response => response.json()
  ).then(json => {
    console.log(editUsername.value)
    if(json[3]){
      editHeader.innerHTML = "Profile updated!"
    }else{
      if(json[0]) {
        editUsername.parentElement.classList.add("signup-error")
      }
      if(json[1]) {
        editEmail.parentElement.classList.add("signup-error")
      }
      if(json[2]) {
        editPhone.parentElement.classList.add("signup-error")
      }
    }
  })
})


// handling profile image change 

const bg = document.getElementById("profile-bg")
const pp = document.getElementById("profile-image")
const reader = new FileReader()

if(userId != profileId){
  bg.disabled = "true"  
  pp.disabled = "true"  
}

bg.addEventListener("change", async () => {
  reader.readAsDataURL(bg.files[0])
  await delay(500)
  fetch(`http://localhost/twitter-clone/api/picture-edit.php`
  , {
      method: 'POST', 
      body:new URLSearchParams({
        "userId":userId,
        "bg": image,
      }),
      }).then(response => response.json()
      ).then(json => { 
        profileBg.style.backgroundImage = `url(${json})`
        profileBg.classList.add("bg-img-prop")
      })
})

pp.addEventListener("change", async () => {
  reader.readAsDataURL(pp.files[0])
  await delay(500)
  fetch(`http://localhost/twitter-clone/api/picture-edit.php`
  , {
      method: 'POST', 
      body:new URLSearchParams({
        "userId":userId,
        "pp": image,
      }),
      }).then(response => response.json()
      ).then(json => { 
        profileImg.style.backgroundImage = `url(${json})`
        profileImg.classList.add("bg-img-prop")
      })
})




reader.addEventListener("load", () => {
  image = reader.result
  console.log(image)
})

function delay(milliseconds){ // allows for delay
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}