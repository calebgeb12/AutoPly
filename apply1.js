/**
 * This script clicks the first apply button 
 * 
 * 
 * 
 */

export default function () {
    chrome.storage.local.get("autoApplyEnabled", (data) => {
    if (!data.autoApplyEnabled) {
      console.log("AutoPly: Auto apply is OFF");
      return;
    }
    
    alert("working?");
    window.addEventListener("load", () => {
      const tryClick = () => {
        const btn = Array.from(document.querySelectorAll("button.bg-primary-300"))
          .find(el => el.textContent.trim().toLowerCase().includes("apply"));

        if (btn) {
          console.log("AutoPly: Clicking apply button");
          btn.click();
        } else {
          console.log("AutoPly: Apply button not found");
        }
      };

      setTimeout(tryClick, 100);
    });
  });
}
