/**
 * This script clicks the creates an account using user data 
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
        const createAccountBtn = document.querySelector('button[data-automation-id="createAccountSubmitButton"]');

        if (createAccountBtn) {
            const emailInput = document.querySelector('input[data-automation-id="email"]');
            const passwordInput = document.querySelector('input[data-automation-id="password"]');
            const verifyPasswordInput = document.querySelector('input[data-automation-id="verifyPassword"]');
            const checkbox = document.querySelector('input[data-automation-id="createAccountCheckbox"]');
            
            if (!(emailInput && passwordInput && verifyPasswordInput && checkbox)) {
                alert("one or more of the create account fields is not obtained");
            }
            
            //fill in input fields and click checkbox
            emailInput.value = emailAddress;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            verifyPasswordInput.value = password;
            verifyPasswordInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            if (checkbox && !checkbox.checked) {
                checkbox.click();
            }

            //click the create account button
            const visibleCreateBtn = document.querySelector('div[data-automation-id="click_filter"]');
            if (visibleCreateBtn) {
                setTimeout(() => {
                    visibleCreateBtn.click();
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