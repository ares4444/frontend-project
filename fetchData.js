import {key} from "../keys.js";

function fetchData(musicSearch) {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${musicSearch}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": 
        `${key}`
	}
})
.then((response) => response.json())
//  .then(data => {
//  	showResults(data.Search)})

.catch((error) => {
    return 'Error:', error;
})

.then(data => {
    console.dir()
	return data;
 
   })
}

export {fetchData};