import { Injectable } from '@nestjs/common'
import { createTransport } from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'

const PATH = process.env.EMAIL_TEMPLATE_PATH

@Injectable()
export class EmailService {
  transporter: any
  constructor () {
    this.transporter = createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    })
  }

  async sendEmail (to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html,
    })
  }

  sendTenantVerificationEmail (email: string, verificationLink: string) {
    const template = this.getEmailTemplate('verification-email')
    const html = template({ verificationLink })
    return this.sendEmail(email, 'Verification Link', html)
  }

  sendUserMagicLinkEmail (email: string, magicLink: string) {
    const template = this.getEmailTemplate('magic-link')
    const html = template({ magicLink })
    return this.sendEmail(email, 'Magic Link', html)
  }

  sendNFTClaimEmail (email: string, product: any) {
    const claimUrl = `${process.env.PORTAL_DOMAIN}/profile/claims`
    const template = this.getEmailTemplate('claim-email')
    const html = template({ ...product, claimUrl })
    return this.sendEmail(email, 'NFT Claim', html)
  }

  getEmailTemplate (templateName: string) {
    const __dirname = path.resolve()
    const filePath = path.join(__dirname, `${PATH}/${templateName}.hbs`)
    const source = fs.readFileSync(filePath, 'utf-8')
    return handlebars.compile(source)
  }
}
