import nodemailer from 'nodemailer'
import supabase from '@/libs/supabaseClient'
export async function Email(email: string, condition: boolean, name: string, date: string, time: string) {
    let confirmStatus = 'initiate';
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_GMAIL_USER,
            pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    try {
        if (condition) {
            await transporter.sendMail({
                from: '"Namaste Bites"',
                to: email,
                subject: "Table Confirmed! | Namaste Bites",
                text: "Your Table is Confirmed! | Namaste Bites",
                html: `<h2 style='color: skyblue;'>CONFIRMED</h2>
                <p>
                Hello ${name},
            <br>
            Your table is confirmed for <b>${date}</b> at <b>${time}</b>. We look forward to serving you at Namaste Bites!
            </p>`,
            });
            await supabase.from('bookings').update({ status: 'confirmed' }).eq('email', email).eq('date', date).eq('time', time)
            confirmStatus = 'confirmation_sent';
        }
        else if (!condition) {
            await transporter.sendMail({
                from: '"Namaste Bites" <kishordebnath123123@gmail.com>',
                to: email,
                subject: "Booking Failed | Namaste Bites",
                text: "Table Declined | Namaste Bites",
                html: `<h2 style='color: red;'>DECLINED</h2>
                <p>
                Hello ${name},
            <br>
            It is with great regret that your table for <b>${date}</b> at <b>${time}</b> has been declined due to some reason from the manager's side.<br>
            Please contact us for more information.
            <br>
            <a href='tel:+918167353739'>+91 8167353739</a>
            </p>`,
            });
            await supabase.from('bookings').update({ status: 'rejected' }).eq('email', email).eq('date', date).eq('time', time)
            confirmStatus = 'rejection_sent';
        }
    }
    catch (error) {
        confirmStatus = 'error' + error;
    }
    finally {
        return confirmStatus;
    }
}