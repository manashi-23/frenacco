document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('activity-form');
    const videoResults = document.getElementById('video-results');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const activity = document.getElementById('activity').value;
        const location = document.getElementById('location').value;
        fetchVideos(activity, location);
    });

    function fetchVideos(activity, location) {
        const apiKey = 'AIzaSyDRKcHHPOb1tdAebP4NGRuVntDwNvdM_Uo'; 
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
  
});
