/**
 * This script clicks the sign in button after creating an account 
 */

export default function () {
    let emailAddress = "brain.append@gmail.com";
    let password = "G8#rLp9@zQ2W";
    chrome.storage.local.get("autoApplyEnabled", (data) => {
        if (!data.autoApplyEnabled) {
            console.log("AutoPly: Auto apply is OFF");
            return;
        }

    const tryClick = () => {
        const signInBtn = document.querySelector('button[data-automation-id="signInSubmitButton"]');

        if (signInBtn) {
            const emailInput = document.querySelector('input[data-automation-id="email"]');
            const passwordInput = document.querySelector('input[data-automation-id="password"]');
            
            if (!(emailInput && passwordInput)) {
                alert("one or more of the sign in fields is not obtained");
            }
            
            //fill in input fields
            emailInput.value = emailAddress;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

            //click the sign in button
            const visibleSignInBtn = document.querySelector('div[data-automation-id="click_filter"]');
            if (visibleSignInBtn) {
                setTimeout(() => {
                    visibleSignInBtn.click();
                }, 500); 
            }
        } 
        
        else {
            alert("AutoPly: Apply button not found");
        }
    };

    setTimeout(tryClick, 100);
  });
}