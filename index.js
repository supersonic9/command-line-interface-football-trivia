#!/usr/bin/env node 

import chalk from "chalk"
import inquirer from "inquirer"
import gradient from "gradient-string"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"
import { createSpinner } from "nanospinner"

let playerName

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
    'Ready to test your football knowledge? \n'
    );
    
    await sleep()
    rainbowTitle.stop()

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any questions wrong, I will be ${chalk.bgRed('killed')}
        So best get all the questions correct.....
    `)

}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        }
    })
    playerName = answers.player_name
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Which English team is known as the Red Devils?\n",
        choices: [
            'Arsenal',
            'Liverpool',
            'Sunderland',
            'Manchester United'
        ]
    })
    return handleAnswer(answers.question_1 === 'Manchester United')
}
async function question2() {
    const answers = await inquirer.prompt({
        name: "question_2",
        type: "list",
        message: "England have won the World Cup once. But in which year did they lift the trophy?\n",
        choices: [
            '1966',
            '2000',
            '1994',
            '1982'
        ]
    })
    return handleAnswer(answers.question_2 === '1966')
}

async function question3() {
    const answers = await inquirer.prompt({
        name: "question_3",
        type: "list",
        message: "What kind of animal is featured on Leicester City's badge?\n",
        choices: [
            'Cat',
            'Dog',
            'Fox',
            'Wolf'
        ]
    })
    return handleAnswer(answers.question_3 === 'Fox')
}

async function question4() {
    const answers = await inquirer.prompt({
        name: "question_4",
        type: "list",
        message: "How many times have Brazil won the World Cup?\n",
        choices: [
            '0',
            '2',
            '7',
            '5'
        ]
    })
    return handleAnswer(answers.question_4 === '5')
}

async function question5() {
    const answers = await inquirer.prompt({
        name: "question_5",
        type: "list",
        message: "Which team are nicknamed The Canaries?\n",
        choices: [
            'Liverpool',
            'Norwich City',
            'Brighton and Hove Albion',
            'Celtic'
        ]
    })
    return handleAnswer(answers.question_5 === 'Norwich City')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer....').start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}.` })
    } else {
        spinner.error({ text: `💀 💀 💀 💀 💀 💀  Game over, you lose ${playerName}!` })
        process.exit(1)
    }
}

function winner() {
    console.clear()
    const msg = `Congrats, ${playerName}! \n You're a football genius!`

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}


await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await question5()
winner()