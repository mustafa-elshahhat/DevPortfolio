import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle, Send, Mail } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../../lib/motion'
import { socialLinks } from '../../data/social'
import IconLink from '../ui/IconLink'
import { cn } from '../../lib/utils'

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>
type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'mailto'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined

function FloatingInput({
  id, label, type = 'text', error, disabled, registration,
}: {
  id: string
  label: string
  type?: string
  error?: string
  disabled?: boolean
  registration: UseFormRegisterReturn
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'peer w-full bg-surface-container-lowest rounded-xl',
          'px-4 pt-6 pb-2 text-on-surface',
          'font-body text-base',
          'transition-all duration-300',
          'border-2',
          'focus:outline-none',
          'disabled:opacity-50',
          'input-premium',
          error
            ? 'border-error/60 focus:border-error/80'
            : focused
              ? 'border-primary/60'
              : 'border-outline-variant/30 hover:border-outline-variant/40',
        )}
        {...registration}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
          registration.onBlur(e)
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0)
          registration.onChange(e)
        }}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 transition-all duration-200 pointer-events-none',
          'font-label tracking-widest uppercase',
          focused || hasValue
            ? 'top-2 text-[10px] text-primary'
            : 'top-1/2 -translate-y-1/2 text-xs text-on-surface-variant/70',
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-error text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function FloatingTextarea({
  id, label, error, disabled, registration,
}: {
  id: string
  label: string
  error?: string
  disabled?: boolean
  registration: UseFormRegisterReturn
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={4}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'peer w-full bg-surface-container-lowest rounded-xl',
          'px-4 pt-6 pb-3 text-on-surface resize-none',
          'font-body text-base',
          'transition-all duration-300',
          'border-2',
          'focus:outline-none',
          'disabled:opacity-50',
          'input-premium',
          error
            ? 'border-error/60 focus:border-error/80'
            : focused
              ? 'border-primary/60'
              : 'border-outline-variant/30 hover:border-outline-variant/40',
        )}
        {...registration}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
          registration.onBlur(e)
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0)
          registration.onChange(e)
        }}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 transition-all duration-200 pointer-events-none',
          'font-label tracking-widest uppercase',
          focused || hasValue
            ? 'top-2 text-[10px] text-primary'
            : 'top-5 text-xs text-on-surface-variant/70',
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-error text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const animProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    if (!FORMSPREE_ENDPOINT) {
      // No backend configured: hand the message off to the user's email client.
      // We cannot confirm delivery, so we show a neutral status rather than a
      // misleading "sent successfully" message, and we keep the form filled in
      // case the mail client never opens.
      window.open(`mailto:mustafaelshahhat@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message)}`, '_blank')
      setSubmitState('mailto')
      return
    }

    setSubmitState('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitState('success')
        reset()
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="w-full bg-surface relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(75,77,216,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer}
          {...animProps}
          className="glass-panel-strong p-6 md:p-8 rounded-3xl relative overflow-hidden gradient-border"
        >
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(192,193,255,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <motion.div variants={fadeInUp} className="space-y-2 mb-6">
            <p className="font-label text-xs uppercase tracking-[0.15em] text-primary">
              04 / Contact
            </p>
            <h2 id="contact-heading" className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
              Get In Touch
            </h2>
            <p className="text-on-surface-variant">
              Looking for an internship, a junior developer opportunity, or want to discuss
              a project? I&apos;d love to hear from you.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
            {socialLinks.map((link) => (
              <IconLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
                external={!link.href.startsWith('mailto')}
              />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {submitState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center gap-5 py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)',
                    border: '2px solid rgba(34,197,94,0.3)',
                    boxShadow: '0 0 40px rgba(34,197,94,0.15)',
                  }}
                >
                  <CheckCircle size={36} className="text-success" aria-hidden="true" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-headline text-2xl font-bold text-on-surface"
                >
                  Message Sent Successfully!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-on-surface-variant max-w-sm"
                >
                  Thank you for reaching out. I&apos;ll review your message and get back to you within 24 hours.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setSubmitState('idle')}
                  className="mt-2 text-primary font-headline font-semibold underline underline-offset-4 hover:text-primary-container transition-colors"
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                variants={fadeInUp}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    id="name"
                    label="Your Name"
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    registration={register('name')}
                  />
                  <FloatingInput
                    id="email"
                    label="Email Address"
                    type="email"
                    error={errors.email?.message}
                    disabled={isSubmitting}
                    registration={register('email')}
                  />
                </div>

                <FloatingTextarea
                  id="message"
                  label="Your Message"
                  error={errors.message?.message}
                  disabled={isSubmitting}
                  registration={register('message')}
                />

                {submitState === 'mailto' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="flex items-center gap-2 text-primary text-sm p-3 bg-primary/10 border border-primary/20 rounded-xl"
                  >
                    <Mail size={16} aria-hidden="true" />
                    Opening your email client… If nothing happens, email me directly at mustafaelshahhat@gmail.com.
                  </motion.div>
                )}

                {submitState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-center gap-2 text-error text-sm p-3 bg-error/10 border border-error/20 rounded-xl"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    Something went wrong. Please try again or contact me directly.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={cn(
                    'w-full gradient-primary text-on-primary font-headline font-bold',
                    'py-4 rounded-xl text-lg',
                    'glow-hover transition-all duration-200',
                    'flex items-center justify-center gap-2',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                    'active:scale-[0.99]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
