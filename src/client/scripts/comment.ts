const commentForm = document.getElementById(
	"video_detail-comment-form",
) as HTMLFormElement;

const addComment = (text: string) => {
	const commentsContainer = document.querySelector(
		".video_detail-comments ul",
	) as HTMLUListElement;
	const newComment = document.createElement("li");
	newComment.innerText = text;
	commentsContainer.prepend(newComment);
};
const handleComment: EventListener = async (event) => {
	const videoData = document.getElementById("videoPlayer") as HTMLVideoElement;
	const commentInput = document.getElementById(
		"video_detail-comment-input",
	) as HTMLInputElement;
	event.preventDefault();

	const text = commentInput.value;
	const { videoid } = videoData.dataset;
	if (text === "") {
		return;
	}
	const { status } = await fetch(`/api/video/${videoid}/comment`, {
		method: "POST",
		headers: { "Content-Type": "Application/json" },
		body: JSON.stringify({ text }),
	});
	if (status === 201) {
		addComment(text);
	}
	commentInput.value = "";
};

if (commentForm) {
	commentForm.addEventListener("submit", handleComment);
}
