/**
 * This code identifies which stage the automation process is in and executes the code that corresponds to the current stage
 * 
 * 
 * 
 */

const checkDuration = 500;    // in milliseconds
const maxChecks = 10;
let currChecks = 0;

function onFullyLoaded(callback) {
  if (document.readyState === "complete") {
    callback(); // Run immediately
  } 
  
  else {
    window.addEventListener("load", callback); // Wait for full load
  }
}

function checkAndRunAutomation() {
  const url = window.location.href;
  const applyBtn1 = Array.from(document.querySelectorAll("button.bg-primary-300"));
  const applyBtn2 = document.querySelector('a[data-automation-id="adventureButton"]');
  const applyManuallyBtn = document.querySelector('a[data-automation-id="applyManually"]');
  const createAccountBtn = document.querySelector('button[data-automation-id="createAccountSubmitButton"]');

  if (applyBtn1.length && !url.includes("myworkdayjobs.com")) {
    import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
    return;
  } 

  else if (applyBtn2) {
    import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
    return;
  } 
  
  else if (createAccountBtn) {
    import(chrome.runtime.getURL("createAccount.js")).then(m => m.default());
    return;
  }

  if (currChecks < maxChecks) {
    currChecks++;
    setTimeout(checkAndRunAutomation, checkDuration);
  }
}

onFullyLoaded(checkAndRunAutomation);
