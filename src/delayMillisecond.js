function index () {
    var seconds=document.currentScript.getAttribute('seconds');
    function onTidioChatApiReady() {
        setTimeout(function () {
            window.tidioChatApi.open();
        }, seconds * 1000);
       
    }
    if (window.tidioChatApi) {
        window.tidioChatApi.on('ready', onTidioChatApiReady);
    } else {
        document.addEventListener('tidioChat-ready', onTidioChatApiReady);
    }
}