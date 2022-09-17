const profileImage = document.getElementById("profile-image")

const sendImage = (image) => {
    fetch(`http://localhost/twitter-clone/api/image.php`
    , {
        method: 'POST', 
        body:new URLSearchParams({
          "profile":image,   
        }),
        }).then(response => response.json()
        ).then(json => { console.log(json)
        })
}

profileImage.addEventListener("change", () => {
    const profile = profileImage.files[0]
    const reader = new FileReader()

    reader.addEventListener("load", () => {
        sendImage(reader.result)
    })
    reader.readAsDataURL(profile);
})

