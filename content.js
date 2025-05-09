// Wait for the entire page to load before attempting any interaction
window.addEventListener("load", () => {
  
  // Function that will attempt to find and click the "Apply" button
  const tryClick = () => {
    // Use a CSS selector to find the apply button on the page
    // Replace '.apply-button' with the actual class, ID, or attribute used on the target site
    const btn = Array.from(document.querySelectorAll("button.bg-primary-300")).find(el => el.textContent.trim().toLowerCase().includes("apply"));

    // If the button is found on the page
    if (btn) {
      console.log("AutoPly: Clicking apply button");

      // Simulate a click on the apply button
      btn.click();
    } else {
      // Button not found, optionally log or retry
      console.log("AutoPly: Apply button not found");
    }
  };

  // Delay execution to allow dynamic content to finish loading (like buttons rendered by JavaScript)
  setTimeout(tryClick, 2000); // 2000ms = 2 seconds
});
