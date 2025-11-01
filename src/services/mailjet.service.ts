import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const MJ_API_KEY: string = process.env.MJ_API_KEY as string;
const MJ_API_SECRET: string = process.env.MJ_API_SECRET as string;
const MJ_SENDER: string = process.env.MJ_SENDER as string;

class MailjetService {
  private readonly mailjetClient: Mailjet;

  constructor() {
    this.mailjetClient = new Mailjet({
      apiKey: MJ_API_KEY,
      apiSecret: MJ_API_SECRET
    });
  }

  public async sendEmail(to: string, subject: string, htmlBody: string): Promise<void> {
    try {
      await this.mailjetClient.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: MJ_SENDER,
              Name: "Commumeet"
            },
            To: [
              {
                Email: to,
              }
            ],
            Subject: subject,
            HTMLPart: htmlBody
          }
        ]
      });
    }
    catch (error) {
      throw new Error("EMAIL_SENDING_FAILED");
    }
  }
}

export default MailjetService;
