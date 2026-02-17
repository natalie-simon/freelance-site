import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validation serveur
    const { name, email, message } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Le nom doit contenir au moins 2 caractères.',
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Veuillez fournir un email valide.',
        })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Le message doit contenir au moins 10 caractères.',
        })
    }

    // Envoi via Resend
    const config = useRuntimeConfig()
    const resend = new Resend(config.resendApiKey)

    try {
        await resend.emails.send({
            from: 'Site nataliesimon.fr <onboarding@resend.dev>',
            to: ['natalie.simon2201@gmail.com'],
            replyTo: email.trim(),
            subject: `[nataliesimon.fr] Nouveau message de ${name.trim()}`,
            html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${name.trim()}</p>
        <p><strong>Email :</strong> ${email.trim()}</p>
        <p><strong>Message :</strong></p>
        <p>${message.trim().replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Envoyé depuis le formulaire de contact — ${new Date().toLocaleString('fr-FR')}
        </p>
      `,
        })
    } catch (error) {
        console.error('❌ Erreur Resend:', error)
        throw createError({
            statusCode: 500,
            statusMessage: "L'envoi du message a échoué. Veuillez réessayer.",
        })
    }

    return {
        success: true,
        message: 'Message envoyé avec succès.',
    }
})
