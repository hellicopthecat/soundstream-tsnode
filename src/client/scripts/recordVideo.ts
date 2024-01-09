import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const videoPreview = document.getElementById("preview") as HTMLVideoElement;
const recordBtn = document.getElementById("recordBtn") as HTMLButtonElement;

let stream: MediaStream;
let recoder: MediaRecorder;
let videoFile: string;

const constraints = {
	audio: false,
	video: true,
};
const video = {
	input: "MyRecording.webm",
	output: "output.mp4",
	type: "video/mp4",
};

const handleDownload = async () => {
	// const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";
	// const ffmpeg = new FFmpeg();
	// // 무슨일이 벌어지고 있는지 콘솔에서 확인
	// ffmpeg.on("log", ({ type, message }) => {
	// 	console.log(type);
	// 	console.log(message);
	// });
	// ffmpeg.on("progress", ({ progress, time }) => {
	// 	console.log(progress);
	// 	console.log(time);
	// });
	// // 사용자가 소프트웨어를 javascript코드가 아닌 코드를 사용하기 때문에 load를 해주며 async await를 해주어야한다.
	// await ffmpeg.load({
	// 	coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
	// 	wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
	// 	workerURL: await toBlobURL(
	// 		`${baseURL}/ffmpeg-core.worker.js`,
	// 		"text/javascript",
	// 	),
	// });
	// // 가상의 공간에 ffmpeg에 파일 만들기 백엔드에서의 multer처럼 프론트에서도 파일 생성을 도와줌
	// await ffmpeg.writeFile(video.input, await fetchFile(videoFile));
	// // 실행시키는 코드 https://ffmpeg.org/ffmpeg.html#Main-options 전송할 코드를 입력해야한다. 전송될 코드의 input 되는 파일이름 output 되는 파일이름및확장자
	// // 아래 코드는 초당 60프레임으로 인코딩 해주는 명령어
	// await ffmpeg.exec(["-i", video.input, video.output]);
	// const mp4File = await ffmpeg.readFile(video.output);

	// const mp4Blob = new Blob([mp4File], { type: video.type });

	// const mp4Url = URL.createObjectURL(mp4Blob);

	const a = document.createElement("a");

	// a.href = mp4Url;
	a.href = video.input;

	a.download = video.output;
	document.body.appendChild(a);
	a.click();

	recordBtn.removeEventListener("click", handleDownload);
	recordBtn.addEventListener("click", handleRecord);
	videoPreview.srcObject = stream;
	videoPreview.src = "";
	videoPreview.play();
	videoPreview.loop = false;
	recordBtn.innerText = "녹화하기";
};

const handleStop = () => {
	recordBtn.innerText = "녹화다운로드하기";
	recordBtn.removeEventListener("click", handleStop);
	recordBtn.addEventListener("click", handleDownload);
	recoder.stop();
};
const handleRecord = () => {
	recordBtn.innerText = "녹화종료";
	recordBtn.removeEventListener("click", handleRecord);
	recordBtn.addEventListener("click", handleStop);
	recoder = new MediaRecorder(stream, { mimeType: "video/webm" });
	recoder.ondataavailable = (event) => {
		videoFile = URL.createObjectURL(event.data);
		videoPreview.srcObject = null;
		videoPreview.src = videoFile;
		videoPreview.loop = true;
		videoPreview.play();
	};
	recoder.start();
};

const videoStart = async () => {
	stream = await navigator.mediaDevices.getUserMedia(constraints);
	videoPreview.srcObject = stream;
	videoPreview.play();
};

videoStart();

recordBtn.addEventListener("click", handleRecord);
