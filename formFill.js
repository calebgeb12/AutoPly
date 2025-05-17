export default function () {
    
    //hashmap below contains answer to all questions (maybe?)
    let hashMap = {
        //container questions
        "How Did You Hear About Us?*": [chooseFromContainer, "Other"],

        //choose from list questions
        "State": [chooseFromList, "Georgia"],
        "State*": [chooseFromList, "Georgia"],

        //simple questions
        "First Name*": [enterAnswer, "Caleb"],
        "Last Name*": [enterAnswer, "Gebremeskel"],
        "Address Line 1": [enterAnswer, "1609 Virginia Pine Circle SW"],
        "Address Line 1*": [enterAnswer, "1609 Virginia Pine Circle SW"],
        "City": [enterAnswer, "Lilburn"],
        "City*": [enterAnswer, "Lilburn"],
        "Postal Code": [enterAnswer, "30047"],
        "Postal Code*": [enterAnswer, "30047"],
        "Zip Code": [enterAnswer, "30047"],
        "Zip Code*": [enterAnswer, "30047"],

        //yes or no question

        //do nothing questions
        "I have a preferred name": [doNothing, "useless"]
    };

    //fills the current page
    function fillPage() {
        //get list of all inputs, and associate them with their question
        let inputsArray = Array.from(document.querySelectorAll('input'));
        let questionsArray = new Array(inputsArray.length); 
        
        //detects dropdown box that have button with id instead of input with id
        for (let i = 0; i < inputsArray.length; i++) {
            let input = inputsArray[i];
            let btn = input.previousElementSibling?.tagName === 'BUTTON' ? input.previousElementSibling : input.nextElementSibling?.tagName === 'BUTTON' ? input.nextElementSibling : null;
            if (btn) { //is a dropdown
                inputsArray[i] = btn;
            }
        }
        
        for (let i = 0; i < inputsArray.length; i++) {
            let currInput = inputsArray[i];
            let inputId = currInput.id;
            let labelText = null;
            if (inputId) {
                let correspondingLabel = document.querySelector(`label[for="${inputId}"]`);
                labelText = correspondingLabel.textContent.trim();
            }
            
            questionsArray[i] = labelText;
            console.log(labelText);
        }

        // for (let i = 0; i < inputsArray.length; i++) {
        //     let currInput = inputsArray[i];
        //     let currQuestion = questionsArray[i];

        //     // //we have an answer
        //     // if (hashMap.hasOwnProperty(currQuestion)) {
        //     //     let currArray = hashMap[currQuestion];
        //     //     let functionToRun = currArray[0];
        //     //     let answer = currArray[1];
        //     //     functionToRun(currInput, answer);
        //     // }

        //     // //unique question
        //     // else {

        //     // }
        // }

        //only for testing
        let currInput = inputsArray[7];
        let currQuestion = questionsArray[7];
        let currArray = hashMap[currQuestion];
        let functionToRun = currArray[0];
        let answer = currArray[1];
        functionToRun(currInput, answer);
    }
    
    function enterAnswer(input, answer) {
        input.value = answer;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function chooseFromContainer(input, answer) {
        //step 1: clicks input field
        input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        input.focus();
        
        //step 2 to last: finds & toggle button --> inputs answer --> presses enter --> presses "Other"
        setTimeout(() => {
        let multiselectId = input.getAttribute('data-uxi-multiselect-id');
        const toggleBtn = document.querySelector(`span[data-uxi-multiselect-id="${multiselectId}"]`);
        if (toggleBtn) {
            toggleBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            toggleBtn.click();

            setTimeout(() => {
            input.value = answer;
            input.dispatchEvent(new InputEvent('input', { bubbles: true }));

            setTimeout(() => {
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

                setTimeout(() => {
                    // const options = Array.from(document.querySelectorAll('[data-uxi-widget-type="multiselectlistitem"]'));
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
    }

    function chooseFromList(btn, answer) {
        console.log("worked");
        //click button
        
        //choose from list

        setTimeout(() => {
            if (btn) {
                btn.click();

                setTimeout(() => {

                }, 500); 
            }
        }, 300); 

    }


    function yesOrNo() {

    }

    function doNothing() {

    }


    //calls 'fillPage()' until we are on the submit screen
    fillPage();
}



/**
    "how did you hear about us": multiselect container, other
    "Have you worked for..."






 */