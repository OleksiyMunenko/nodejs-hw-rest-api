const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
	const nodemailerConfig = {
		host: 'smtp.meta.ua',
		port: 465,
		secure: true,
		auth: {
		  user: 'oleksii.mynenko@meta.ua',
		  pass: META_PASSWORD,
		},
	};

  const transport = nodemailer.createTransport(nodemailerConfig);
  const email = {
    to: data.to,
    from: 'oleksii.mynenko@meta.ua',
    subject: 'Test email',
    html: data.html,
  };

  await transport.sendMail(email)
	.then(() => console.log("Email send success"))
	.catch(error => console.log(error.message));
};

module.exports = sendEmail;