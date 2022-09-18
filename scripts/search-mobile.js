const search = document.getElementById("search")
const searchresults =document.getElementById("search-results")
const noSearch = document.getElementById("noSearch")
let searches = []
userId = localStorage.getItem("userId")

const searchItem = (id,name,pp,username) => { // constructs the search results
    const link = document.createElement("a")
    link.href = "profile.html"
    searchresults.appendChild(link)
    searches.push(link)

    const searchRes = document.createElement("div")
    searchRes.classList.add("search-result")
    link.appendChild(searchRes)

    const searchImage = document.createElement("div")
    searchImage.classList.add("search-image")
    searchRes.appendChild(searchImage)

    const image = document.createElement("img")
    image.src = pp
    searchImage.appendChild(image)

    const flex = document.createElement("div")
    flex.classList.add("flex-column")
    searchRes.appendChild(flex)

    const span = document.createElement("span")
    span.classList.add("account-name-search")
    span.innerHTML= name
    flex.appendChild(span)

    const p = document.createElement("p")
    p.classList.add("account-username-search")
    p.innerHTML= `@${username}`
    flex.appendChild(p)

    link.addEventListener("click",() => {
        localStorage.setItem("profileId", id )
        console.log(id)
    })
}


search.addEventListener("change", () => { // searches for result on every change
    for(const result of searches){
        searchresults.removeChild(result)
    }
    searches = []
    flag =1
    if(flag){
        fetch(`http://localhost/twitter-clone/api/search.php`
        , {
        method: 'POST', 
        body:new URLSearchParams({
          "userId":userId,
          "search":search.value,
        }),
        }).then(response => response.json()
        ).then(json => { 
            if(json.length==0){
                if(noSearch.style.display == "none") noSearch.style.display = "flex"
                noSearch.innerHTML = "No Results"
            }else noSearch.style.display = "none"
            for(const searchRes of json){
                searchItem(searchRes.id,searchRes.name,searchRes.profile_picture,searchRes.username)
            }
        })
    }

})

// handling loout 

const logout = document.getElementById("logout")

logout.addEventListener("click", () => {
    localStorage.removeItem("userId")
})

// handling main profile link 

const profiles = document.querySelectorAll(".profile-link")

for(const profile of profiles){
    profile.addEventListener("click", () => {
        localStorage.setItem("profileId", userId)
    })
    
}