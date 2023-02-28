const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const pB = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions 

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function changeButton() {
    const icon = this.paused ? 'Play' : 'Pause';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    console.log(video.currentTime);
    console.log(video.duration);

    const percent = (video.currentTime / video.duration) * 100;
    pB.style.flexBasis = `${percent}%`;

}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// eventListners

video.addEventListener('click', togglePlay);
video.addEventListener('pause', changeButton);
video.addEventListener('play', changeButton);
setInterval(handleProgress, 1000);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', () => {
// if (mousedown) {
// scrub();
// }
// });

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

