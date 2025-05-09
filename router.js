/**
 * This code identifies which stage the automation process is in and executes the code that corresponds to the current stage
 * 
 * 
 * 
 */

const url = window.location.href;

//runs apply1
if (url.includes("simplify.jobs")) {
    import(chrome.runtime.getURL("apply1.js")).then(m => m.default());
}

//runs apply2
else if (url.includes("myworkdayjobs.com")) {
    // alert("workdays found");
    import(chrome.runtime.getURL("apply2.js")).then(m => m.default());
}

else {
    alert("none found");
}