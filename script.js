const searchButton = document.getElementById("search-btn");
const artistBox = document.getElementById("artistName");


searchButton.addEventListener("click", (e) => {
    console.log("button clicked");
    e.preventDefault();
    let musicSearch = {
        "artist": artistBox.value,
    }
    console.log(musicSearch);

    //(localStorage.setItem) saves the items that you are calling inside of your local storage, to then be called on the page that you need to be populated with said items. this is how we get from the home page to the songs page after clicking "Search"...
     localStorage.setItem("musicSearch", JSON.stringify(musicSearch))
     window.location.replace("http://127.0.0.1:5501/songs.html");

});
