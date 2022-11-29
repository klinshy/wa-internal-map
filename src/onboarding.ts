/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

console.log('Onboarding Script started successfully');

WA.onInit().then(() => {
    if(!WA.player.state.tutorialDone){
        openTutorial();
    }
    else if(canRegister()){
        console.info('Open the funnel');
        //TODO change for new funnel PROD
        //openFunnel(0);
    }
    WA.player.state.onVariableChange('tutorialDone').subscribe((tutorialDone) => {
        console.info('Tutorial is done, open the funnel');
        if(!canRegister(tutorialDone as boolean)) return;
        //TODO change for new funnel PROD
        //openFunnel();
    });
}).catch((err) => {
    console.error('Onboarding Script initialisation error => ', err);
})

const canRegister = (tutorialDone = false) => {
    return (!WA.player.state.tutorialDone || tutorialDone) && !WA.player.isLogged && !WA.player.state.isRegistered;
}

const openTutorial = () => {
    console.info('Open the tutorial');
    // @ts-ignore
    WA.ui.modal.openModal({
        src: 'https://workadventure.github.io/scripting-api-extra/tutorialv1.html',
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
    });
}

export const openFunnel = (TIME_TO_OPEN_FUNNEL = 20000) => {

    setTimeout(() => {
        console.info("Funnel script initialized!");
        if(WA.room.id.indexOf('https://play.workadventu.re') !== -1 || WA.room.id.indexOf('https://play.staging.workadventu.re') !== -1){
            WA.nav.openTab('https://workadventu.re/getting-started');
            return;
        }
        try{
            WA.ui.modal.closeModal();
            WA.ui.modal.openModal({
                src: `https://workadventu.re/funnel/connection?roomUrl=${encodeURI(WA.room.id)}`,
                allow: "fullscreen",
                tiltle: "Subscription",
                allowApi: true,
                position: "center"
            });
        }catch(err){
            console.error(err);
        }
    }, TIME_TO_OPEN_FUNNEL);
}

export {}
