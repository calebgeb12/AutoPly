/**
 * This script clicks the second apply button 
 */

export default function () {
  let retries = 10;

  chrome.storage.local.get("autoApplyEnabled", (data) => {
    if (!data.autoApplyEnabled) {
      console.log("AutoPly: Auto apply is OFF");
      return;
    }

    clickButton();
  });

  function clickButton() {
    const btn = document.querySelector('a[data-automation-id="adventureButton"]');

    if (btn) {
        btn.click();

        // waits 2 seconds before trying to click
        setTimeout(() => {
          const resumeBtn = document.querySelector('a[data-automation-id="applyManually"]');
          if (resumeBtn) resumeBtn.click();
        }, 500);

    } else if (retries > 0) {
      console.log("Button not found, retrying...");
      retries--;
      setTimeout(clickButton, 500);
    } else {
      alert("button not found after retries");
    }
  }
}
