/**
 * This script clicks the sign in button after creating an account 
 */

export default function () {
    let emailAddress = "brain.append@gmail.com";
    let password = "G8#rLp9@zQ2W";

    let emailUrl = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
    const senderFilter = "Workday"
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
                window.location.href = emailUrl;                    //goes to email page
                // verifyEmail();
            }
        }, 500);
    }

    // function verifyEmail() {
    //     window.location.href = emailUrl;                    //goes to email page
        
    //     //filter to find verification link
    //     const searchEmailInput = document.querySelector('input[aria-label="Search mail"][type="text"]');
    //     alert(searchEmailInput);
    //     searchEmailInput.value = senderFilter + " " + companyName;
    //     searchEmailInput.dispatchEvent(new Event('input', { bubbles: true }));
    //     searchEmailInput.dispatchEvent(new KeyboardEvent('keydown', {                                      //presses enter in emailFilter field
    //         key: 'Enter',
    //         code: 'Enter',
    //         keyCode: 13,
    //         which: 13,
    //         bubbles: true
    //     }));

    //     // const verificationLink = document.querySelector('a[href*="myworkdayjobs.com"][href*="/activate/"][href*="ApplyManually"]');
    // }
}