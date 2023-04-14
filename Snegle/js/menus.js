function toggleSettingsMenu() {
    const visibility = settingsMenu.style.visibility;

    if (visibility === 'visible') {
        settingsMenu.style.animation = `moveOut ${settingsOpenDuration}s`;
        
        setTimeout(() => {
            settingsMenu.style.visibility = 'hidden';
        }, settingsOpenDuration * 1000)
    }
    else {
        settingsMenu.style.visibility = 'visible';
        settingsMenu.style.animation = `moveIn ${settingsOpenDuration}s`;
    }
}