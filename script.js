
document.addEventListener("DOMContentLoaded", function () {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        question.addEventListener("click", function () {
            if (answer.style.display === "block") {
                answer.style.display = "none";
                icon.textContent = "+";
            } else {
                document.querySelectorAll(".faq-answer").forEach((ans) => {
                    ans.style.display = "none";
                });
                document.querySelectorAll(".faq-icon").forEach((icn) => {
                    icn.textContent = "+";
                });

                answer.style.display = "block";
                icon.textContent = "−";
            }
        });
    });

    // Smooth Scrolling for Navbar Links
    const navbarLinks = document.querySelectorAll("a[href^='#']");

    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust offset for navbar height
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio-player");
    const playBtn = document.getElementById("play-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const playIcon = document.getElementById("play-icon"); // PNG Image for Play/Pause
    const prevIcon = document.getElementById("prev-icon"); // PNG for Previous
    const nextIcon = document.getElementById("next-icon"); // PNG for Next
    const trackTitle = document.getElementById("track-title");
    const trackList = document.querySelectorAll(".mp3-track");
    const trackVideo = document.getElementById("track-video");

    let currentTrackIndex = 0;
    let isPlaying = false;

    function loadTrack(index) {
        trackList.forEach(track => track.classList.remove("active"));
        trackList[index].classList.add("active");
        audioPlayer.src = trackList[index].getAttribute("data-src");
        trackTitle.innerText = trackList[index].innerText;

        // Update Video Source
        const newVideo = trackList[index].getAttribute("data-video");
        if (newVideo && trackVideo.querySelector("source").src !== newVideo) {
            trackVideo.querySelector("source").src = newVideo;
            trackVideo.load(); // Ensure the new video is loaded
        }

        if (isPlaying) {
            audioPlayer.play();
            trackVideo.play(); // Play the video when music plays
        }
    }

    // Play/Pause Button (Uses PNG Swap)
    playBtn.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.src = "images/pause.png"; // Change to Pause PNG
            isPlaying = true;
            trackVideo.play(); // Play the video when music plays
        } else {
            audioPlayer.pause();
            playIcon.src = "images/play.png"; // Change back to Play PNG
            isPlaying = false;
            trackVideo.pause(); // Pause the video when music pauses
        }
    });

    // Previous Track Button (Uses PNG)
    prevBtn.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playIcon.src = "images/pause.png"; // Change to Pause PNG when playing
        isPlaying = true;
        trackVideo.play();
    });

    // Next Track Button (Uses PNG)
    nextBtn.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playIcon.src = "images/pause.png"; // Change to Pause PNG when playing
        isPlaying = true;
        trackVideo.play();
    });

    // Track Selection (Click to Play)
    trackList.forEach((track, index) => {
        track.addEventListener("click", function () {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            audioPlayer.play();
            playIcon.src = "images/pause.png"; // Change to Pause PNG
            isPlaying = true;
            trackVideo.play(); // Start the video when the track is selected
        });
    });

    // Reset Play Button When Track Ends
    audioPlayer.addEventListener("ended", function () {
        playIcon.src = "images/play.png"; // Reset to Play PNG when music ends
        isPlaying = false;
        trackVideo.pause(); // Pause the video but don’t hide it
    });
});
