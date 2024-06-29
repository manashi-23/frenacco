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
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                </a>
            `;
            videoResults.appendChild(videoElement);
        });
    }
});
