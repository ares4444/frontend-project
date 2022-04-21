//importing key from different file to hide it from GitHub...
import { songsKey } from "./keys.js"; 
const results = document.getElementById("results");

//.getItem retrivies an item that was saved into loval storage. this is how we got the value inside the search bar to be presented in the SongsPage...
const musicSearch = JSON.parse(localStorage.getItem("musicSearch"));
let index = 0;

//(window.addEventListener) is interchangeable with (document.addEventListener)...
window.addEventListener('DOMContentLoaded', async (event) => {
	const fetchSongs = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${musicSearch.artist}`, {
		method: "GET",
		headers: {
		  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		  "x-rapidapi-key": `${songsKey}`,
			},
		  }).then((response) => response.json())
	
		console.log("fetchSongs", fetchSongs.data)
		const songData = fetchSongs.data
		songData.map((song, index) => {

			//here we created a songCard that will be populated by the song that is fetched by the fetchSongs function. Each card has an "accordion" style for the lyrics to drop from. this styling was pulled in from Bootstrap...
			  let songCard = `<div class="music-container col-md-4">
	<div class="card deezerApi" style="width: 18rem;">
	  <img class="card-img-top" src="${song.album.cover_medium}" alt="Card image cap">
	  <div class="card-body">
	<div id="songTitle">${song.title}</div>
	<br>
	<audio controls type="audio/mpeg" src="${song.preview}" id="audio" style="width: 100%"></audio>
  </div>
  <div class="accordion accordion-flush" id="accordionFlushExample">
<div class="accordion-item">
  <h2 class="accordion-header" id="flush-heading${index}">
	<button id="accordionBtn" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
	  Lyrics
	</button>
  </h2>
  <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample">
	<div id="accordBody${index}" class="accordion-body"></div>
  </div>
</div>
	</div>
	  </div>
	  </div>`;
	  results.innerHTML += songCard;
		});

		//here we are mapping through the data that was received from the songsFetch and having the function of lyricsFetch look for the same artist and corresponding song...
	const lyricFetch = songData.map(async (song, index) => {
		await fetch(`https://private-amnesiac-3503f-lyricsovh.apiary-proxy.com/v1/${song.artist.name}/${song.title}`)
	.then(response => response.json())	
	.then(lyrics => {
	const accordBody = document.getElementById(`accordBody${index}`)
	console.log(lyrics);

	//The (.replace) method is used here to separate the lyrics in a cohesive manner. "\n" looks for each line break within the lyrics and gives it a <br> between. "g" was used to make the method global for the entirety of the lyrics for the song...
	accordBody.innerHTML = lyrics.lyrics.replace(new RegExp("\n", "g"), "<br>");
	})
	});
});
  

    	


    