export default function () {
    
    //hashmap below contains answer to all questions (maybe?)
    let hashMap = {
    //manual typing container questions (single)
        "How Did You Hear About Us?*": [chooseFromContainer, "Other"],
        // "Country Phone Code*": [chooseFromContainer, "United States of America (+1)"],
        "Country Phone Code*": [doNothing, "United States of America (+1)"],

    //manual typing container questions (multiple) 
        "Type to Add Skills": [chooseMultipleFromContainer, ["Java", "Python", "C#", "JavaScript", "HTML/CSS", "Unity"]],

    //choose from list questions (no typing)
        "State": [chooseFromList, "Georgia"],
        "State*": [chooseFromList, "Georgia"],
        "Phone Device Type*": [chooseFromList, "Mobile"],
        "Country*": [chooseFromList, "United States of America"],
        "Country": [chooseFromList, "United States of America"],

    //simple questions
        "First Name*": [enterAnswer, "Caleb"],
        "First Name": [enterAnswer, "Caleb"],

        "Last Name*": [enterAnswer, "Gebremeskel"],
        "Last Name": [enterAnswer, "Gebremeskel"],

        "Address Line 1": [enterAnswer, "1609 Virginia Pine Circle SW"],
        "Address Line 1*": [enterAnswer, "1609 Virginia Pine Circle SW"],

        "City": [enterAnswer, "Lilburn"],
        "City*": [enterAnswer, "Lilburn"],

        "Postal Code": [enterAnswer, "30047"],
        "Postal Code*": [enterAnswer, "30047"],

        "Zip Code": [enterAnswer, "30047"],
        "Zip Code*": [enterAnswer, "30047"],

        "Phone Number": [enterAnswer, "4047296027"],
        "Phone Number*": [enterAnswer, "4047296027"],

        "LinkedIn": [enterAnswer, "www.linkedin.com/in/caleb-gebremeskel-7a626a324"],

    //upload questions
        "Resume/CV": [upload, "files/resume.pdf"],

    //work experience questions
        "Work Experience": [doNothing /**enterWorkExperience**/,[
            {
                "Job Title*": "IT Business Solutions Intern",
                "Company*": "Gwinnett County Government",
                "Location": "Lawrenceville, GA",
                "I currently work here": false,
                "From*": ["06", "2023"],
                "To*": ["06", "2023"],
                "Role Description": ["bullet point1", "bullet point 2", "bullet point 3"]
            },

            {
                "Job Title*": "second job",
                "Company*": "seocnd company",
                "Location": "random place, GA",
                "I currently work here": false,
                "From*": ["01", "2022"],
                "To*": ["06", "2024"],
                "Role Description": ["b point1", "b point 2", "b point 3"]
            }]
        ],



    //education questions



    //yes or no question

    //do nothing questions
        "null": [doNothing, "useless"],
        "I have a preferred name": [doNothing, "useless"],
        "Phone Extension": [doNothing, "useless"],
        "Facebook": [doNothing, "useless"],
        "Twitter": [doNothing, "useless"]
    };

    //fills the current page
    function fillPage() {
        //get list of all inputs, and associate them with their question (some fields such as those for filling work experience or education sections are special cases)
        let inputsArray = Array.from(document.querySelectorAll('input'));
        let questionsArray = new Array(inputsArray.length); 
        
        //detects dropdown box that have button with id instead of input with id (useful for questions where you choose from a list since they don't have visible input fields)
        for (let i = 0; i < inputsArray.length; i++) {
            let input = inputsArray[i];
            let btn = input.previousElementSibling?.tagName === 'BUTTON' ? input.previousElementSibling : input.nextElementSibling?.tagName === 'BUTTON' ? input.nextElementSibling : null;
            if (btn) { //is a dropdown
                inputsArray[i] = btn;
            }

        }
        
        //associate input field with its question
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

        //find work experience, education, resume sections and add them to inputsArray (if they exist)
        let uniqueQuestions = Array.from(document.querySelectorAll('h3#Work-Experience-section, h3#Education-section, h3#Resume\\/CV-section'));
        for (let i = 0; i < uniqueQuestions.length; i++) {
            let currQuestion = uniqueQuestions[i];
            let neighborDiv = currQuestion.nextElementSibling?.tagName === 'DIV' ? currQuestion.nextElementSibling : null;
            let currBtn = neighborDiv.querySelector('button');
            inputsArray.push(currQuestion);
            questionsArray.push(currQuestion.textContent.trim());
        }

        //handle answering each question
        let questions_answered = 0;
        for (let i = 0; i < inputsArray.length; i++) {
            let currInput = inputsArray[i];
            let currQuestion = questionsArray[i];

            //we have an answer
            if (hashMap.hasOwnProperty(currQuestion)) {
                let currArray = hashMap[currQuestion];
                let functionToRun = currArray[0];
                let answer = currArray[1];
                console.log("existing question: " + currQuestion)
                functionToRun(currInput, answer);
                questions_answered++;
            }

            //unique question
            else {
                console.log("unique question: " + currQuestion);
            }
        }

        //goes to the next page if all questions have been answered
        let nextButton = document.querySelector('[data-automation-id="pageFooterNextButton"]');
        setTimeout(() => {
            //can go to next page
            if (nextButton && questions_answered === questionsArray.length) {
                nextButton.click();
                console.log("All questions answered, going to next page...");
                console.log("---------------------------");
                
                setTimeout(() => {
                    fillPage();
                }, 2000) //how quickly you start filling out form after clicking next button
            }

            //cannot go to next page 
            else {
                if (nextButton) {
                    console.log("Not all questions have been answered");
                }

                else if (questions_answered === questionsArray.length) {
                    console.log("next button not found");
                }

                else {
                    console.log("next button not found AND not all questions have been answered");
                }
            }
        }, 5000) //how quickly you go to the next page 

        //only for testing
        // let currInput = inputsArray[9];
        // let currQuestion = questionsArray[9];
        // let currArray = hashMap[currQuestion];
        // let functionToRun = currArray[0];
        // let answer = currArray[1];
        // functionToRun(currInput, answer);
    }
    
    function enterWorkExperience(input, experiences) {
        //click button until no more experiences left
        // let parentSection = //get parent containing all questions as children
        for (let i = 0; i < experiences.length; i++) {

        }

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

    function chooseMultipleFromContainer(input, answers) {
        for (let i = 0; i < answers.length; i++) {
            setTimeout(() => {
                input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                input.focus();

                setTimeout(() => {
                    input.value = answers[i];
                    console.log(answers[i]);
                    input.dispatchEvent(new InputEvent('input', { bubbles: true }));

                    setTimeout(() => {
                        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                        input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
                        input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
                    }, 100); //waits some time before pressing enter
                }, 200); //waits some time before inputting answer
            }, i * 500);  //waits some time before advancing to next thing
        }
    }

    //clicks the list button, then finds desired option and clicks it
    function chooseFromList(listButton, answer) {
        setTimeout(() => {
            if (listButton) {
                listButton.click();
                setTimeout(() => {
                    let currId = listButton.getAttribute("aria-controls");
                    let ul_element = document.querySelector(`ul#${currId}`);
                    let target_option = Array.from(ul_element.querySelectorAll('li[role="option"]')).find(li => li.querySelector('div')?.textContent.trim() === answer);
                    target_option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    target_option.click();
                }, 500); 
            }
        }, 300); 
    }


    function yesOrNo() {

    }

    function upload(input, filePath) {
        input.click();
        
    }

    function doNothing() {

    }


    //calls 'fillPage()' until we are on the submit screen
    fillPage();
}