/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */


/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

 // Icons made by Freepik at http://www.freepik.com, from http://www.flaticon.com, is licensed by http://creativecommons.org/licenses/by/3.0/, Creative Commons BY 3.0, CC 3.0 BY

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "What is HIPAA?": [
            "The Health Insurance Portability and Accountability Act of nineteen ninty six",
            "The Health Insurance Probability and Accountability Act of nineteen ninty six",
            "The Health Insanity Portability and Accountability Act of nineteen ninty seven",
            "The Health Insurance Probability and Answerability Act of nineteen ninty six",
        ]
    },
    {
        "What is COBRA?": [
            "The Consolidated Omnibus Budget Reconciliation Act of nineteen eighty five",
            "The Consoltation Omnibus Balancing Reconciliation Act of nineteen eighty five",
            "The Consoltation Omnibus Balancing Reconciliation Act of nineteen eighty six",
            "The Consolidated Omnibus Budget Reconciliation Act of nineteen eighty six"
        ]
    },
    {
        "How is overtime compensation calculated?": [
            "The FLSA requires payment of an overtime premium for all hours worked over 40 in a workweek, except where the employee is exempt from overtime under one of the groups which qualify for an exemption",
            "The FLSA requires payment of an overtime premium for all hours worked over 40 in a workweek",
            "The FLSA requires payment of an overtime premium for all hours worked over 35 in a workweek",
            "The FLSA requires payment of an overtime premium for all hours worked over 40 in a workweek, including holidays and paid time off, except where the employee is exempt from overtime under one of the groups which qualify for an exemption"
        ]
    },
    {
        "How do employers verify employment authorization?": [
            "Every employer must verify that the person it intends to hire is authorized to work in the United States, regardless of their nationality or whether the person is a citizen or non-citizen",
            "Only factory employers must verify that the person it intends to hire is authorized to work in the United States, regardless of their nationality or whether the person is a citizen or non-citizen",
            "Only Union employers must verify that the person it intends to hire is authorized to work in the United States, regardless of their nationality or whether the person is a citizen or non-citizen",
            "Only when someone has an accent"
        ]
    },
    {
        "What is the E-Verify system?": [
            "E-Verify is a free, Internet-based system that allows employers to determine whether their employees are eligible to work in the United States",
            "E-Veriy is only for Government employees",
            "E-Veriy is only for Union employees",
            "E-Veriy is user in the United Kindom"
        ]
    },
    {
        "Must New York employers use E-Verify?": [
            "New York does not require private sector employers to verify their employees through the E-Verify system, but contractors doing business with Suffern Village, New York must use e-Verify for new employees hired after August 11th, two thousand eight.",
            "New York does not require private sector employers to verify their employees through the E-Verify system.",
            "New York requires all employers to verify their employees through the E-Verify system.",
            "New York does not require private sector employers to verify their employees through the E-Verify system within a year of employment.",
        ]
    },
    {
        "Employers must keep records of the hours worked, the rate or rates of pay and basis thereof, whether paid by the hour, shift, day, week, salary, piece,commission, or other gross wages deductions allowances, if any, claimed as part of the minimum wage net wages for each employee, for?": [
            "6 years",
            "4 years",
            "10 years",
            "1 year"
        ]
    },
    {
        "Employers must keep records of Form I-9 for?": [
            "Three years after the date of hire; or one year after date the employment is terminated, whichever is later",
            "Six years after the date of hire; or six months after date the employment is terminated, whichever is later",
            "One year after the date of hire",
            "Six years after the date of hire"
        ]
    },
    {
        "As a private sector employer, what threshold must you comply with Family and Medical Leave Act?": [
            "50 employees",
            "25 employees",
            "40 employees",
            "100 employees"
        ]
    },
    {
        "What threshold must you comply with Americans with Disabilities Act": [
            "15 employees",
            "1 employee",
            "25 employees",
            "50 employees"
        ]
    },
    {
        "Regarding all employers covered by the FLSA, how long do you have to keep supplementary basic records including worksheets showing daily starting and stopping time of employees, wage rate schedules, and work time schedules?": [
            "Two years",
            "One year",
            "Three years",
            "Four years"
        ]
    },
    {
        "Regarding all employers covered by the FLSA, how long do you have to keep sales and purchase records, by total dollar volume, weekly, month, or quarterly?": [
            "Three years",
            "Two years",
            "One year",
            "Four years"
        ]
    },
    {
        "When do you have to comply with Fair Labor Standards Act (FLSA) – including child labor?": [
            "One employee",
            "Two employees",
            "Five employees",
            "Ten employees"
        ]
    },
    {
        "Regarding all employers covered by the FLSA, how long do you have to keep any certificates of age?": [
            "Until termination of employment",
            "Two years",
            "One year",
            "Four years"
        ]
    },
    {
        "At what employee threshold must employers post the GINA poster, also known as Genetic Information and Nondiscrimination Act?": [
            "All private employers, state and local governments and education institutions that employ 15 or more employees.",
            "All private employers, state and local governments and education institutions that employ 1 or more employees.",
            "All private employers, state and local governments and education institutions that employ 50 or more employees.",
            "All private employers, state and local governments and education institutions that employ 5 or more employees."
        ]
    },
    {
        "At what employee threshold must employers post the FMLA poster, also known as Family Medical Leave Act?": [
            "Employers who employ 50 or more employees in 20 or more weeks",
            "Employers who employ 1 or more employees in 20 or more weeks.",
            "Employers who employ 25 or more employees in 20 or more weeks.",
            "Employers who employ 15 or more employees in 20 or more weeks."
        ]
    },
    {
        "What sector must post the Job Safety & Health Protection poster, also known as OSHA?": [
            "Private sector",
            "Federal sector",
            "State or political subdivisions of states sector",
            "All of the above"
        ]
    },
    {
        "What threshold must employers comply with New York City Human Rights Act?": [
            "4 or more employees",
            "5 or more employees",
            "10 or more employees",
            "1 or more employees"
        ]
    },
    {
        "Who is covered under the New York State Human Rights Law (NYSHRL)?": [
            "Fireball",
            "Clarice",
            "Jumper",
            "Vixen"
        ]
    },
    {
        "Can an employer deny an applicant employment because of a conviction record?": [
            "No, unless there is a direct relationship between the offense and the job or unless hiring would be an unreasonable risk",
            "Yes, an employer has the right to protect their employees from criminals",
            "Yes, but only if they have less than 10 employees",
            "Yes, but only if they have less than 50 employees"
        ]
    },
    {
        "What is the proper way to ask an interviewee about their arrest, conviction record?": [
            "Have you ever been convicted of a crime?",
            "Have you ever been arrested?",
            "Have you ever been locked up?",
            "Are you a criminal?"
        ]
    },
    {
        "Can employers as questions as to number of children, plans for future children, views on abortion or birth control?": [
            "It is not proper",
            "Yes, you can ask them if they are pregnant",
            "Yes, but you can only ask them if they have children",
            "Yes, but only if it refers to childcare arrangements from female applicants only."
        ]
    },
    {
        "During an interview, how should you ask someone about recreational activities?": [
            "It is recommended that this question not be asked about recreational activities because New York law prohibits an employer from refusing to hire because an individual based on the individual’s legal recreational activities outside working hours, off company premises",
            "Did you play college sports?",
            "How do you spend your leisure time?",
            "Are you an active person?"
        ]
    },
    {
        "Can you ask an interviewee about smoking?": [
            "No, it is recommended that this question not be asked because New York law prohibits an employer from refusing to hire because an individual uses consumable products before or after working hours, off company premises",
            "Yes",
            "Yes, you can inquire about addiction issues",
            "You can ask if an interviewee smokes or uses tobacco products"
        ]
    },
    {
        "What is the WARN Act?": [
            "Worker Adjustment and Retraining Notification Act",
            "Worker Adjustment and Reasonable Notification Act",
            "Worker Accommodation and Retraining Notification Act",
            "Worker Adaptation and Raise Notification Act"
        ]
    },
    {
        "What is the Davis-Bacon Act?": [
            "This Act covers mechanics and laborers engaged in federal public buildings and work projects with a value of $2,000 or more",
            "This Act covers mechanics and laborers engaged in federal public buildings and work projects with a value of $4,000 or more",
            "This Act covers unions and mechanics engaged in private buildings and work projects with a value of $2,000 or more",
            "This Act covers unions and mechanics engaged in private buildings and work projects with a value of $4,000 or more"
        ]
    },
    {
        "Under New York law, when must you deliver an employees last paycheck?": [
            "The next regular payday",
            "Within a month",
            "The day of termination",
            "Employees must be paid by first day of month for any work done in first half of prior month, and by the 15th of the month for work done in the second half of the prior month"
        ]
    },
    {
        "May an employer terminate an employee rather than deal with the inconvenience of a garnishment of that employees wages?": [
            "No. An employer may not discharge an employee because of a single garnishment. However, two or more successful garnishments are valid grounds for discharge under federal law",
            "No. An employer may not discharge an employee because of a single garnishment",
            "Yes.  An employer may discharge an employee because of a single garnishment",
            "Yes, but only if related to bad credit"
        ]
    },
    {
        "Regarding minimum wage, overtime, proper decutions and recordkeeping requirements under the FLSA, who is legally responsible for leased and temporary employees?": [
            "Both.  The staffing agency and you as the employer",
            "The staffing agency",
            "The leased employees",
            "The employer"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.bde074d5-9907-430f-8a49-c6b330e13dfe") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "H R simple"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to H R simple audit assist.  This audit regards New York Employers and Professionals. I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

