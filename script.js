document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('activity-form');
    const videoResults = document.getElementById('video-results');
    const placeResults = document.getElementById('place-results');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const activity = document.getElementById('activity').value;
        const location = document.getElementById('location').value;
        fetchVideos(activity, location);
        fetchPlaces(activity, location);
    });

    function fetchVideos(activity, location) {
        const apiKey = 'AIzaSyAYqcmT3ASDhSggRZWcJrEiu2mUbI3tQ8A'; 
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${activity}+in+${location}&part=snippet&type=video&maxResults=8`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayVideos(data.items);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayVideos(videos) {
        videoResults.innerHTML = '';
        videos.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.high.url;
            const videoElement = document.createElement('div');
            videoElement.classList.add('col-md-4', 'video');
            videoElement.innerHTML = `
                <h3>${title}</h3>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                </div>
            `;
            videoResults.appendChild(videoElement);
        });
    }

    function fetchPlaces(activity, location) {
        const apiKey = 'AIzaSyAYqcmT3ASDhSggRZWcJrEiu2mUbI3tQ8A'; 
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
        
        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    const loc = data.results[0].geometry.location;
                    searchPlaces(activity, loc);
                } else {
                    console.error('Error geocoding location:', data.status);
                }
            })
            .catch(error => console.error('Error fetching location data:', error));
    }

    function searchPlaces(activity, location) {
        const apiKey = 'AIzaSyAYqcmT3ASDhSggRZWcJrEiu2mUbI3tQ8A'; 
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            query: activity,
            location: new google.maps.LatLng(location.lat, location.lng),
            radius: '5000'
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                displayPlaces(results);
            } else {
                console.error('Error fetching places data:', status);
            }
        });
    }

    function displayPlaces(places) {
        placeResults.innerHTML = '';
        places.forEach(place => {
            const name = place.name;
            const address = place.formatted_address;
            const placeElement = document.createElement('div');
            placeElement.classList.add('place');
            placeElement.innerHTML = `
                <h3>${name}</h3>
                <p>${address}</p>
            `;
            placeResults.appendChild(placeElement);
        });
    }
});
