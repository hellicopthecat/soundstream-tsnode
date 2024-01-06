const videoPlayerWrapper = document.getElementById(
	"videoPlayerWrapper",
) as HTMLDivElement;
const videoPlayer = document.getElementById("videoPlayer") as HTMLVideoElement;
const playBtn = document.getElementById(
	"video_detail-playBtn",
) as HTMLButtonElement;
const videoCurrentTime = document.getElementById(
	"video_detail-currentTime",
) as HTMLSpanElement;
const videoDuration = document.getElementById(
	"video_detail-duration",
) as HTMLSpanElement;
const playRange = document.getElementById(
	"video_detail-playRange",
) as HTMLInputElement;
const muteBtn = document.getElementById(
	"video_detail-muteBtn",
) as HTMLButtonElement;
const soundRange = document.getElementById(
	"video_detail-soundRange",
) as HTMLInputElement;
const fullscreenBtn = document.getElementById(
	"video_detail-fullscreen",
) as HTMLButtonElement;

const defaultVolume = 0.3;
videoPlayer.volume = defaultVolume;

// play & pause
const handlePlay = () => {
	if (videoPlayer.paused) {
		videoPlayer.play();
	} else {
		videoPlayer.pause();
	}
};
const handlePlayTxt = () => {
	playBtn.innerText = "Pause";
};
const handlePauseTxt = () => {
	playBtn.innerText = "Play";
};

// contents timer
const timeFormat = (second: number) => {
	return new Date(second * 1000).toISOString().substring(11, 19);
};
const handleLoadData = () => {
	videoDuration.innerText = timeFormat(Math.floor(videoPlayer.duration)) + "";
	playRange.max = Math.floor(videoPlayer.duration) + "";
	playRange.min = videoPlayer.currentTime + "";
};
const handleTimeUpdate = () => {
	videoCurrentTime.innerText =
		timeFormat(Math.floor(videoPlayer.currentTime)) + "";
	playRange.value = Math.floor(videoPlayer.currentTime) + "";
};
const handleMoveCurrentTime = () => {
	videoPlayer.currentTime = +playRange.value;
};
// contents sound
const handleMute = () => {
	if (videoPlayer.volume === 0) {
		videoPlayer.volume = defaultVolume;
		muteBtn.innerText = "Mute";
	} else {
		videoPlayer.volume = 0;
		muteBtn.innerText = "Unmute";
	}
};
const handleSoundRange = () => {
	const inputValue = Number(soundRange.value) / 10;
	videoPlayer.volume = inputValue;
	if (inputValue === 0) {
		muteBtn.innerText = "Unmute";
	} else {
		muteBtn.innerText = "Mute";
	}
};
const handleFullScreen = () => {
	const fullscreen = document.fullscreenElement;
	if (fullscreen) {
		document.exitFullscreen();
		fullscreenBtn.innerText = "Fullscreen";
	} else {
		videoPlayerWrapper.requestFullscreen({ navigationUI: "hide" });
		fullscreenBtn.innerText = "Go Back";
	}
};

const handleViewCount = async () => {
	const { videoid } = videoPlayer.dataset;
	await fetch(`/api/video/${videoid}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
videoPlayer.addEventListener("play", handlePlayTxt);
videoPlayer.addEventListener("pause", handlePauseTxt);
videoPlayer.addEventListener("loadedmetadata", handleLoadData);
videoPlayer.addEventListener("timeupdate", handleTimeUpdate);
videoPlayer.addEventListener("ended", handleViewCount);
muteBtn.addEventListener("click", handleMute);
soundRange.addEventListener("change", handleSoundRange);
fullscreenBtn.addEventListener("click", handleFullScreen);
playRange.addEventListener("click", handleMoveCurrentTime);
