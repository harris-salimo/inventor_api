import UserRegistered from '#events/auth/user_registered'
import emitter from '@adonisjs/core/services/emitter'

const SendVerificationEmail = () => import('#listeners/send_verification_email')

emitter.on(UserRegistered, [SendVerificationEmail])
