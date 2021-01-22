require('colors');
const inquirer = require('inquirer');
const suggestEmails = require('./suggest-emails');

console.log('== EMAIL SUGGESTER =='.green.bold);

const questions = {
    type: 'input',
    name: 'email',
    message: 'Insira um email:'
};

inquirer
    .prompt(questions)
    .then(answer => {
        const result = suggestEmails(answer.email, 0.7, 3);

        if (result.looksRight) {
            console.log('O email parece estar correto'.green);
            return;
        }

        if (!result.suggestions.length) {
            console.log('Não conseguimos sugerir nenhuma correção :('.yellow);
            return;
        }

        console.log('Sugestões de correção: '.bold);

        result.suggestions.forEach(item => console.log(item.green));
    })