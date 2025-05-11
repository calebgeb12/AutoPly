/**
 * This script clicks the creates an account using user data 
 */

export default function () {
  chrome.storage.local.get("autoApplyEnabled", (data) => {
    if (!data.autoApplyEnabled) {
        console.log("AutoPly: Auto apply is OFF");
        return;
    }

    const tryClick = () => {
        const btn = document.querySelector('button[data-automation-id="createAccountSubmitButton"]');

        if (btn) {
            alert("AutoPly: creating account works!");
            // btn.click();
        } else {
            alert("AutoPly: Apply button not found");
        }
        };

        setTimeout(tryClick, 100);
  });
}