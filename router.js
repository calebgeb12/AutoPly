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
  const signInBtn = document.querySelector('button[data-automation-id="signInSubmitButton"]');
  const isEmailInbox = url.includes("mail.google.com") && window.location.href.includes("inbox");
  const isEmailFilter = url.includes("mail.google.com") && window.location.href.includes("search");
  const simplifyAutoFillBtn = [...document.querySelectorAll('*')]
  .map(e => e.shadowRoot)
  .filter(Boolean)
  .flatMap(r => [...r.querySelectorAll('button, span')])
  .find(el => el.textContent.includes("Autofill this page"));

  //stage 1: click first apply button
  if (applyBtn1.length && !url.includes("myworkdayjobs.com")) {
    import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
    return;
  } 

  //stage 2: click second apply button
  else if (applyBtn2) {
    import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
    return;
  } 
  
  //stage 3: create an account
  else if (createAccountBtn) {
    import(chrome.runtime.getURL("createAccount.js")).then(m => m.default());
    return;
  }

  //stage 4: sign after creating account 
  else if (signInBtn) {
    const pageUrl = window.location.href;
    const name = pageUrl.match(/^https:\/\/([^\.]+)\.wd5\.myworkdayjobs\.com/)?.[1];
    chrome.storage.local.set({companyName: name});
    import(chrome.runtime.getURL("signIn.js")).then(m => m.default());
    return;
  }

  //stage 5: verify email 
  else if (isEmailInbox) {
    let name = "wrong company name";
    chrome.storage.local.get("companyName", (result) => {
        name = result.companyName;
        import(chrome.runtime.getURL("verifyEmail.js")).then(m => m.default(name));
    });

    return;
  }

  //stage 6: start filling form
  else if (simplifyAutoFillBtn) {
    setTimeout(() => {
      import(chrome.runtime.getURL("formFill.js")).then(m => m.default());
    }, 3500);
    return;
  }

  if (currChecks < maxChecks) {
    currChecks++;
    setTimeout(checkAndRunAutomation, checkDuration);
  }
}


onFullyLoaded(checkAndRunAutomation);