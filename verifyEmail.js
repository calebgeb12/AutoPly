export default function (companyName) {
    //filter by company name and sender
    const senderFilter = " Workday"
    const tempName = "badger meter";
    const searchEmailInput = document.querySelector('input[aria-label="Search mail"][type="text"]');
    searchEmailInput.value = senderFilter + " " + tempName;
    searchEmailInput.dispatchEvent(new Event('input', { bubbles: true }));
    setTimeout(() => {
        searchEmailInput.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        }));

        clickEmail();
    }, 500);

    //at this point, should have filtered and first email in list should be the email w/ verification link, so open it and click link
    function clickEmail() {
        setTimeout(() => {
            const firstEmail = document.querySelector('tr.zA');
            if (firstEmail) firstEmail.click();
            clickLink();
        }, 500); // wait 1 second for search results to load
    }

    function clickLink() {
        setTimeout(() => {
            const verificationLink = document.querySelector('div.ii a[href*="myworkdayjobs.com"]');
            if (verificationLink) {
                verificationLink.click();
            }
        }, 2000);   
    }
}