'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Clock, Mail, MessageCircle, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { submitContact } from '@/app/actions/contact'
import { initialContactState } from '@/lib/contact-schema'
import { scaleIn, slideLeft } from '@/lib/motion'
import { cn } from '@/lib/utils'

const EMAIL = 'hola@mateoravel.dev'
const WHATSAPP_URL = 'https://wa.me/34600000000'

const PLANS = ['Plan Presencia Web', 'Plan Empresa', 'Plan Premium', 'Aún no lo sé']

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  )
  const [plan, setPlan] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)
  const announced = useRef('')

  // Surface the server result as a toast and clear the form on success.
  useEffect(() => {
    if (!state.message || announced.current === state.message) return
    announced.current = state.message

    if (state.status === 'success') {
      toast.success(state.message)
      formRef.current?.reset()
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[3.5rem] bg-foreground py-20 text-background sm:rounded-t-[6rem] sm:py-28"
    >
      {/* Ambient glow anchoring the final call to action */}
      <div aria-hidden className="absolute top-0 right-0 h-4 w-1/3 bg-primary" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-11 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Left: pitch + direct channels */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Contacto"
              title="Cuéntame sobre tu negocio."
              description="Envíame un breve mensaje sobre lo que necesitas y te responderé con una recomendación honesta, incluso si eso significa decirte que un plan más pequeño es suficiente."
              className="[&_h2]:text-background [&_p]:text-background/65 [&_span]:text-primary"
            />

            <Reveal variants={slideLeft} delay={0.1}>
              <div className="flex flex-col gap-3">
                <Button
                  className="group h-13 w-full justify-between rounded-none bg-primary px-5 text-base sm:w-auto sm:min-w-80"
                  render={
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <MessageCircle data-icon="inline-start" />
                    Escríbeme por WhatsApp
                  </span>
                  <ArrowUpRight
                    data-icon="inline-end"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>

                <Button
                  variant="outline"
                  className="group h-13 w-full justify-between rounded-none border-background/40 bg-transparent px-5 text-base text-background hover:bg-background hover:text-foreground sm:w-auto sm:min-w-80"
                  render={<a href={`mailto:${EMAIL}`} />}
                >
                  <span className="flex items-center gap-2.5">
                    <Mail data-icon="inline-start" />
                    {EMAIL}
                  </span>
                  <ArrowUpRight
                    data-icon="inline-end"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="flex flex-col gap-3 border-t border-background/30 pt-6 text-background/75">
                {[
                  { icon: Clock, text: 'Respuesta en menos de 24 horas, de lunes a viernes' },
                  { icon: Check, text: 'Primera llamada gratuita, sin compromiso ni guiones' },
                  { icon: Check, text: 'Alcance y plazos definidos antes de comenzar' },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-sm"
                  >
                    <item.icon className="text-primary size-4 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: form card */}
          <Reveal variants={scaleIn} delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="border border-background/50 bg-background p-5 text-foreground min-[380px]:p-6 sm:p-9"
            >
              <form
                ref={formRef}
                action={formAction}
                onReset={() => setPlan('')}
                noValidate
              >
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field data-invalid={!!state.errors.name || undefined}>
                      <FieldLabel htmlFor="name">Nombre</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Elena Moretti"
                        className="h-11 rounded-xl"
                        aria-invalid={!!state.errors.name || undefined}
                        aria-describedby={
                          state.errors.name ? 'name-error' : undefined
                        }
                      />
                      {state.errors.name ? (
                        <FieldDescription id="name-error">
                          {state.errors.name}
                        </FieldDescription>
                      ) : null}
                    </Field>

                    <Field data-invalid={!!state.errors.email || undefined}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@negocio.com"
                        className="h-11 rounded-xl"
                        aria-invalid={!!state.errors.email || undefined}
                        aria-describedby={
                          state.errors.email ? 'email-error' : undefined
                        }
                      />
                      {state.errors.email ? (
                        <FieldDescription id="email-error">
                          {state.errors.email}
                        </FieldDescription>
                      ) : null}
                    </Field>
                  </div>

                  {/* Plan selector — plain buttons keep it a single native form value */}
                  <Field>
                    <FieldLabel htmlFor="plan-group">
                      ¿Qué plan te interesa?
                    </FieldLabel>
                    <input type="hidden" name="plan" value={plan} />
                    <div
                      id="plan-group"
                      role="group"
                      aria-label="Qué plan te interesa"
                      className="flex flex-wrap gap-2"
                    >
                      {PLANS.map((option) => {
                        const active = plan === option
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setPlan(active ? '' : option)}
                            className={cn(
                              'min-h-12 border px-4 py-2 text-sm transition-all duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring',
                              active
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                            )}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </Field>

                  <Field data-invalid={!!state.errors.message || undefined}>
                    <FieldLabel htmlFor="message">Detalles del proyecto</FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="¿A qué se dedica tu negocio, qué necesitas conseguir con el sitio web y tienes alguna fecha límite en mente?"
                      className="resize-none rounded-xl"
                      aria-invalid={!!state.errors.message || undefined}
                      aria-describedby={
                        state.errors.message ? 'message-error' : 'message-hint'
                      }
                    />
                    {state.errors.message ? (
                      <FieldDescription id="message-error">
                        {state.errors.message}
                      </FieldDescription>
                    ) : (
                      <FieldDescription id="message-hint">
                        Cuanto más contexto me des, más útil será mi primera
                        respuesta.
                      </FieldDescription>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    disabled={pending}
                    className="group h-13 w-full rounded-none text-base font-medium"
                  >
                    {pending ? (
                      <>
                        <span
                          aria-hidden
                          className="border-primary-foreground/30 border-t-primary-foreground size-4 animate-spin rounded-full border-2"
                          data-icon="inline-start"
                        />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Solicitar información
                        <Send
                          data-icon="inline-end"
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {state.message}
                  </p>
                </FieldGroup>
              </form>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
