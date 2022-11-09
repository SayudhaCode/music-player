const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music lists
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electrical Chill Machine',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army (remix)',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight Disco Queen',
		artist: 'Jacinto Design',
	},
	{
		name: 'metric-1',
		displayName: 'Front Row (Remix)',
		artist: 'Metric/Jacinto Design',
	},
];

// check if playing
let isPlaying = false;

// play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// pause
function pauseSong() {
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	isPlaying = false;
	music.pause();
}

// event play
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// prev song
function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;
	loadSong(songs[songIndex]);
	playSong();
}

// next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) songIndex = 0;
	loadSong(songs[songIndex]);
	playSong();
}

// on load
loadSong(songs[songIndex]);

// update progress bar
function updateProgressBar(e) {
	if (isPlaying) {
		const {duration, currentTime} = e.target;
		const progressPercent = (currentTime / duration) * 100;
		// updateProgressBar
		progress.style.width = `${progressPercent}%`;
		// calculate timer on progress bar
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
		if (durationSeconds) durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		// timer on play
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
		if (currentSeconds) currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// event next prev
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);