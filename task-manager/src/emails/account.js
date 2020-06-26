const sgMail = require('@sendgrid/mail');
const { getMaxListeners } = require('../models/task');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  //this method does return a promise
  sgMail.send({
    to: email,
    from: 'kfredincali@gmail.com', //until I get a proper domain this will go to spam
    subject: 'Thanks for signing up!',
    text: `Welcome to the Task Manager app, ${name}.  Let me know how you get along with the app.`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'kfredincali@gmail.com',
    subject: 'Account cancellation confirmation from Task Manager',
    text: `Sorry to see you go, ${name}.  What can we do to improve our service?`
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
