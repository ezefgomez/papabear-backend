import * as dotenv from 'dotenv'
dotenv.config()

export const urlMongo = process.env.URL_MONGO
export const secretSessionMongo = process.env.SECRET_SESSION_MONGO
export const port = process.env.PORT
export const  userMailAdmin = process.env.USER_MAILADMIN
export const passMailAdmin = process.env.PASS_MAILADMIN
export const twilioSID = process.env.TWILIO_ACCOUNT_SID
export const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
export const twilioToken = process.env.TWILIO_AUTH_TOKEN
export const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
export const twilioWhastsAppPhoneNumber = process.env.TWILIO_WHATSAPP_PHONE_NUMBER
export const adminWhatsAppPhoneNumber = process.env.ADMIN_WHATSAPP_PHONE_NUMBER
export const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER