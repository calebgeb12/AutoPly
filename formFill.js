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
        //step 1: clicks input field
        input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        input.focus();
        
        //step 2 to last: finds & toggle button --> inputs "Other" --> presses enter --> presses "Other"
        setTimeout(() => {
        let multiselectId = input.getAttribute('data-uxi-multiselect-id');
        const toggleBtn = document.querySelector(`span[data-uxi-multiselect-id="${multiselectId}"]`);
        if (toggleBtn) {
            toggleBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            toggleBtn.click();

            setTimeout(() => {
            input.value = "Other";
            input.dispatchEvent(new InputEvent('input', { bubbles: true }));

            setTimeout(() => {
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

                setTimeout(() => {
                    // const options = Array.from(document.querySelectorAll('[data-uxi-widget-type="multiselectlistitem"]'));
                    // alert(options.length);
                    const firstOption = document.querySelector('[data-uxi-widget-type="multiselectlistitem"]');
                    if (firstOption) {
                        firstOption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                        firstOption.click();
                    }
                    
                }, 300);
            }, 300);
            }, 200);
        }
        }, 200);



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