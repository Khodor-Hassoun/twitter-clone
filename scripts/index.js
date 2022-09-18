
let userId = localStorage.getItem("userId")
// tweeting api connection and image extraction
const tweetText = document.getElementById("new-tweet-text")
const newTweetImages = document.getElementById("new-tweet-images")
const tweet = document.getElementById("tweet")
const reader = new FileReader()
let images = ""

const tweetApi = () => {
    console.log("hello")
    fetch(`http://localhost/twitter-clone/api/tweet.php`
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
          "text": tweetText.value,
          "images": images,  
        }),
        }).then(response => response.json()
        ).then(json => { console.log(json)
        })
}

tweet.addEventListener("click", async() => {
    if(newTweetImages.files[0]){
        reader.readAsDataURL(newTweetImages.files[0]);
    }
    await delay(500)
    if(newTweetImages.files[1]){
        reader.readAsDataURL(newTweetImages.files[1]);
    }
    await delay(500)
    if(newTweetImages.files[2]){
        reader.readAsDataURL(newTweetImages.files[2]);
    }
    await delay(500)
    if(newTweetImages.files[3]){
        reader.readAsDataURL(newTweetImages.files[3]);
    }
    tweetApi()
})

reader.addEventListener("load", () => {
    images = images + reader.result + " "
    console.log(images)
})

function delay(milliseconds){ // allows for delay
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


// user profile data extraction api

const profileName = document.getElementById("feed-profile-name")
const profileUsername = document.getElementById("feed-profile-username")
const profileImages = document.querySelectorAll(".feed-profile-img")

fetch(`http://localhost/twitter-clone/api/basic-user-home.php`
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
        }),
        }).then(response => response.json()
        ).then(json => { 
            profileName.innerHTML = json[0].name
            profileUsername.innerHTML = json[0].username
            for(const i of profileImages){
                i.src = json[0].profile_picture
            }
        })


// fetch tweets feed

const mainFeed = document.getElementById("main-feed")

const tweetAssemble = (tweet,id,name,username,pp,date,text,nb,images,liked) => { // constructs new tweets
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
        localStorage.setItem("profileId", id )
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
    
    const tweettext = document.createElement("div")
    tweettext.classList.add("tweet-text")
    tweettext.innerHTML = `<p>${text}</p>`
    tweetDetails.appendChild(tweettext)

    if(nb>0) { // checks for images and adjusts css accordingly
        const tweetImages = document.createElement("div")
        tweetImages.classList.add("feed-images")
        
        if(nb==1){
            tweetImages.style.gridTemplate = "repeat(1, 1fr) / repeat(1, 1fr)"
        }else if(nb==2){
            tweetImages.style.gridTemplate = "repeat(1, 1fr) / repeat(2, 1fr)"
        }else if(nb==3){
            tweetImages.style.gridTemplate = "repeat(2, 1fr) / repeat(2, 1fr)"
        }else if(nb==4){
            tweetImages.style.gridTemplate = "repeat(2, 1fr) / repeat(2, 1fr)"
            
        }
        let image
        for(let i = 0 ; i<nb-1 ; i++){
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
    if(liked == "1") like.style.color = "red"
    tweetIcons.appendChild(like)

    like.addEventListener("click", (e) => {
        e.stopPropagation()
        fetch(`http://localhost/twitter-clone/api/like.php` // calls the api for like/unlike
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
          "tweet": tweet,
        }),
        }).then(response => response.json()
        ).then(json => { 
            if(json == "added"){
                like.style.color = "red"
            }else like.style.color = "rgb(110,118,125)"
        })

    })

}

const checkLiked = (tweet,nb,imgArr) => {// calls the api for checking if a tweet is liked or not and then adds the tweet to the feed
    fetch(`http://localhost/twitter-clone/api/check-liked.php` 
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
          "tweet":tweet.tweet,
        }),
        }).then(response => response.json()
        ).then(json => {
            tweetAssemble(tweet.tweet,tweet.id,tweet.name,tweet.username,tweet.profile_picture,tweet.date,tweet.text,nb,imgArr,json)
        })

}

fetch(`http://localhost/twitter-clone/api/feed.php` // calls the api for feed tweets and then calls checkLiked
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
        }),
        }).then(response => response.json()
        ).then(json => { 
            console.log(json)
            let imgArr= []
            for(const tweet of json){
                if(tweet.images != null){
                    imgArr = tweet.images.split(" ")
                    nb = imgArr.length
                }else {
                    nb = 0
                }
                checkLiked(tweet,nb,imgArr)
            }
        })


        //home bar profile button
const ownProfile = document.getElementById("ownProfile")

ownProfile.addEventListener("click", () => {
    localStorage.setItem("profileId", userId)
})