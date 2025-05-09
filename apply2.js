/**
 * This script clicks the second apply button 
 * 
 * 
 * 
 */

export default function () {
    let retries = 10;

    function onFullyLoaded(callback) {
        if (document.readyState === "complete") {
            callback(); // Page already fully loaded
        } 
        else {
            window.addEventListener("load", callback); // Wait for load event
        }
    }

    chrome.storage.local.get("autoApplyEnabled", (data) => {
        if (!data.autoApplyEnabled) {
            console.log("AutoPly: Auto apply is OFF");
            return;
        }

        onFullyLoaded(() => {
            clickButton();
        });
    });

    function clickButton() {
        const btn = document.querySelector('a[data-automation-id="adventureButton"]');
        
        if (btn) {
            // alert("working");
            btn.click();
        } 
        
        else if (retries > 0) {
            console.log("Button not found, retrying...");
            retries--;
            setTimeout(() => clickButton(), 500);
        } 
        
        else {
            alert("button not found after retries");
        }
    }
}
