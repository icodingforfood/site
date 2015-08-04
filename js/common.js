var isFirstToggleMusic = true;
function toggleMusicPanel() {
    $('#music-control').toggleClass('on');
    if (isFirstToggleMusic) {
        _gaq.push(['_trackEvent', 'ToggleMusic', 'InRecent', window.location.pathname]);
        isFirstToggleMusic = false;
    }
}