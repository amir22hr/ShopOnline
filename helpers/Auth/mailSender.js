const nodemailer = require('nodemailer');

const mailSender = async (email, subject, html) => {
    //send Mail Validation
    var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        },
    });

    //form mail
    const mailOptions = {
        from: process.env.GMAIL, // sender address
        to: email, // list of receivers
        subject, // Subject line
        html // plain text body
    };
    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = mailSender