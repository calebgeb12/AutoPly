/**
 * This code identifies which stage the automation process is in and executes the code that corresponds to the current stage
 * 
 * 
 * 
 */

function onFullyLoaded(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
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
    alert("apply2 chosen");
    import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
  }
  // runs fill with resume
  else if (fillWithResumeBtn) {
    alert("fill with resume chosen");
    // empty for now
  }
});




// const url = window.location.href;
// const applyBtn1 = Array.from(document.querySelectorAll("button.bg-primary-300"));
// const applyBtn2 = document.querySelector('a[data-automation-id="adventureButton"]');
// const fillWithResumeBtn = document.querySelector('a[data-automation-id="autofillWithResume"]');

// alert(applyBtn2);

// //runs apply1
// if (applyBtn1 && !url.includes("myworkdayjobs.com")) {
//     alert("apply1 chosen");
//     import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
// }

// //runs apply2
// else if (applyBtn2) {
//     alert("apply2 chosen");
//     import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
// }

// else if (fillWithResumeBtn) {
//     alert("fill with resume chosen");
//     //empty
// }

// //runs apply1
// if (url.includes("simplify.jobs")) {
//     import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
// }

// //runs apply2
// else if (url.includes("myworkdayjobs.com")) {
//     // alert("workdays found");
//     import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
// }

