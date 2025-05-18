import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'

export default class SendVerificationEmail {
  async handle(user: User) {
    await mail.send(new VerifyEmailNotification(user))
  }
}
