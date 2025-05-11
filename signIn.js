/**
 * This script clicks the sign in button after creating an account 
 */

export default function () {
    let emailAddress = "brain.append@gmail.com";
    let password = "G8#rLp9@zQ2W";
    let emailUrl = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";

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
                    //click sign in and test verificaiton after 500ms
                    setTimeout(() => {
                        visibleSignInBtn.click();
                        testVerify();
                    }, 500); 
                    
                    ;
                }
            } 
            
            else {
                alert("AutoPly: Apply button not found");
            }
        };

        setTimeout(tryClick, 100);
  });

    //check if account verification is required and act accordingly
    function testVerify() {
        setTimeout(() => {
            const verifyText = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('Verify your account before you sign in'));
            if (verifyText) {
                window.open(emailUrl, "_blank");
            }
        }, 500);
    }
}