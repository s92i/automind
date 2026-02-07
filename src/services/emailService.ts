import ejs from "ejs";
import path from "path";
import nodemailer, { TransportOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  family: 4,
  tls: {
    rejectUnauthorized: false,
  },
} as TransportOptions);

export interface EmailData {
  to: string;
  name: string;
  url?: string;
  dashboardUrl?: string;
  [key: string]: any;
}

export class EmailService {
  private static async renderTemplate(
    templateName: string,
    data: EmailData,
  ): Promise<string> {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "emails",
      `${templateName}.ejs`,
    );

    return new Promise((resolve, reject) => {
      ejs.renderFile(templatePath, data, (err: any, html: string) => {
        if (err) {
          console.log("Error rendering email template", err);
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  private static async sendEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.log("Error sending email", error);
      return false;
    }
  }

  static async sendVerificationEmail(data: EmailData): Promise<boolean> {
    try {
      const html = await this.renderTemplate("email-verification", data);
      return await this.sendEmail(
        data.to,
        "Verify your email address - Automind",
        html,
      );
    } catch (error) {
      console.error("Error sending verification email", error);
      return false;
    }
  }
}
