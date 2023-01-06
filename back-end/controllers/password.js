
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports.forgot = (req, res, next) => {

    const { email } = req.body;

    const msg = {
        to: email, // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    User.findOne({ where: { email } }).then(user => {
        if (user) {
            console.log(user.email);
            res.send("e-mail send to you mail id");
            return sgMail
                .send(msg)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)

                })
                .catch((error) => {
                    console.error(error);
                    console.log(error.response.body.errors);
                })

        }else return res.status(404).send("email not found")

    })

    
    
}