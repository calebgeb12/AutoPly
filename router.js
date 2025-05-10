/**
 * This code identifies which stage the automation process is in and executes the code that corresponds to the current stage
 * 
 * 
 * 
 */

delay = 1000;
function onFullyLoaded(callback) {
  if (document.readyState === "complete") {
    setTimeout(callback, delay); // Already loaded → just wait
  } else {
    window.addEventListener("load", () => {
      setTimeout(callback, delay); // Wait after 'load' fires
    });
  }
}


onFullyLoaded(() => {
  const url = window.location.href;
  const applyBtn1 = Array.from(document.querySelectorAll("button.bg-primary-300"));
  const applyBtn2 = document.querySelector('a[data-automation-id="adventureButton"]');
  const fillWithResumeBtn = document.querySelector('a[data-automation-id="autofillWithResume"]');

//   alert(applyBtn2);

  // runs apply1
  if (applyBtn1 && !url.includes("myworkdayjobs.com")) {
    // alert("apply1 chosen");
    import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
  }
  // runs apply2
  else if (applyBtn2) {
    import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
  }
  // runs fill with resume
  else if (fillWithResumeBtn) {
    // empty for now
  }
});
