import nodeMailer from "nodemailer";


// export const sendEmail= async (options) => { Transpoter() {is a service that sends the email}

export const sendEmail= async ({email, subject, message}) =>{
    const transporter = nodeMailer.createTransport({
        host:process.env.SMTP_HOST,
        service:process.env.SMTP_SERVICE,
        port:process.env.SMTP_PORT,

        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });

    // option
    const options ={
        from:process.env.SMTP_MAIL,
        to:email,
        subject: subject,
        text:vmessage,
    }

    // transporter
    await transporter.sendMail(options);
       

}


