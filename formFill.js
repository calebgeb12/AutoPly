export default function () {
    
    //hashmap below contains answer to all questions (maybe?)
    let hashMap = {
        "How Did You Hear About Us?*": [chooseFromContainer, "Other"]
        // ""
    };

    //fills the current page
    function fillPage() {
        //get list of all inputs, and associate them with their parent
        let inputsArray = Array.from(document.querySelectorAll('input'));
        let questionsArray = new Array(inputsArray.length); 
        for (let i = 0; i < inputsArray.length; i++) {
            let currInput = inputsArray[i];
            let inputId = currInput.id;
            let labelText = null;
            if (inputId) {
                let correspondingLabel = document.querySelector(`label[for="${inputId}"]`);
                labelText = correspondingLabel.textContent.trim();
            }
            
            questionsArray[i] = labelText;
        }

        // for (let i = 0; i < inputsArray.length; i++) {
        //     let currInput = inputsArray[i];
        //     let currQuestion = questionsArray[i];
        //     alert(currQuestion);

        //     //we have an answer
        //     if (hashMap.hasOwnProperty(currQuestion)) {
        //         let currArray = hashMap[currQuestion];
        //         let functionToRun = currArray[0];
        //         let answer = currArray[1];
        //         functionToRun(currInput, answer);
        //     }

        //     //unique question
        //     else {
        //         alert("not in hashmap");
        //     }
        // }

        //only for testing
        let currInput = inputsArray[0];
        let currQuestion = questionsArray[0];
        // alert(currQuestion);
        let currArray = hashMap[currQuestion];
        let functionToRun = currArray[0];
        let answer = currArray[1];
        functionToRun(currInput, answer);

    }
    
    function chooseFromContainer(input, answer) {
        let multiselectId = input.getAttribute('data-uxi-multiselect-id');
        // alert(multiselectId);
        // let toggleBtn = document.querySelector(`[data-automation-id="promptSearchButton"][data-uxi-multiselect-id="${multiselectId}"]`);
        // let toggleBtn = document.querySelector(`[data-uxi-multiselect-id="${multiselectId}"]`);
        // if (toggleBtn === input) {
        //     alert("toggleBtn is the input itself");
        // } else {
        //     alert("toggleBtn is NOT the input");
        // }

        const allMatches = document.querySelectorAll(`[data-uxi-multiselect-id="${multiselectId}"]`);
        alert(allMatches.length);

        // alert(toggleBtn);
        // let candidates = document.querySelector(`[data-uxi-multiselect-id="${multiselectId}"]`);
        // alert(candidates.length);
        // for (let i = 0; i < candidates; i++) {
        //     alert(candidates);
        // }


        // const toggleBtn = document.querySelector('span[data-automation-id="promptSearchButton"]');

        // if (toggleBtn) {
        // toggleBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        // toggleBtn.click();

        // setTimeout(() => {
        //     const firstOption = document.querySelector('[role="option"]:not([aria-disabled="true"])');
        //     if (firstOption) {
        //     firstOption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        //     firstOption.click();
        //     } else {
        //     alert("No dropdown option found.");
        //     }
        // }, 500);
        // } else {
        // alert("Dropdown toggle not found.");
        // }
    }


    function yesOrNo() {

    }


    //calls 'fillPage()' until we are on the submit screen
    fillPage();
}



/**
    "how did you hear about us": multiselect container, other
    "Have you worked for..."






 */