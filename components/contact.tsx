'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, CalendarDays, Check, Clock, Info, Mail, Send } from 'lucide-react'
import { track } from '@vercel/analytics'
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
import { CallBooking } from '@/components/call-booking'
import { PlanFinder, type RecommendedPlan } from '@/components/plan-finder'

const EMAIL = 'mrdgz14dev@gmail.com'

const PLANS = ['CLASSIC', 'GOLD', 'BLACK', 'Aún no lo sé']

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  )
  const [plan, setPlan] = useState<string>('')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const announced = useRef('')

  // Surface the server result as a toast and clear the form on success.
  useEffect(() => {
    if (!state.message || announced.current === state.message) return
    announced.current = state.message

    if (state.status === 'success') {
      track('contact_form_submit_success')
      toast.success(state.message)
      formRef.current?.reset()
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  function handlePlanComplete(result: {
    plan: RecommendedPlan
    summary: string
  }) {
    setPlan(result.plan)
    setMessage(result.summary)
  }

  function showCompletedForm() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    formCardRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
    window.setTimeout(() => document.querySelector<HTMLInputElement>('#name')?.focus(), 550)
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[3.5rem] bg-foreground py-16 text-background sm:rounded-t-[6rem] sm:py-24"
    >
      {/* Ambient glow anchoring the final call to action */}
      <div aria-hidden className="absolute top-0 right-0 h-4 w-1/3 bg-primary" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <PlanFinder
          onComplete={handlePlanComplete}
          onReset={() => {
            setPlan('')
            setMessage('')
          }}
          onViewForm={showCompletedForm}
        />

        <div className="mt-16 grid gap-11 sm:mt-20 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Left: pitch + direct channels */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Contacto"
              title="Contame sobre tu negocio."
              description="Enviame un breve mensaje sobre lo que necesitás y te voy a responder con una recomendación honesta, incluso si un plan más pequeño es suficiente."
              className="[&_h2]:text-background [&_p]:text-background/65 [&_span]:text-primary"
            />

            <Reveal variants={slideLeft} delay={0.1}>
              <div className="flex flex-col gap-3">
                <Button
                  className="group h-13 w-full justify-between rounded-none bg-primary px-5 text-base sm:w-auto sm:min-w-80"
                  nativeButton={false}
                  render={
                    <a
                      href="#call-booking"
                      onClick={() => track('booking_started', { source: 'contact_cta' })}
                    />
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <CalendarDays data-icon="inline-start" />
                    Proponer una llamada
                  </span>
                  <ArrowUpRight
                    data-icon="inline-end"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>

                <Button
                  variant="outline"
                  className="group h-13 w-full justify-between rounded-none border-background/40 bg-transparent px-5 text-base text-background hover:bg-background hover:text-foreground sm:w-auto sm:min-w-80"
                  nativeButton={false}
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
              ref={formCardRef}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="border border-background/50 bg-background p-5 text-foreground min-[380px]:p-6 sm:p-9"
            >
              <div className="mb-6 flex gap-3 rounded-[1.25rem_0.35rem_1.25rem_0.35rem] border border-foreground/20 bg-secondary/55 p-4 sm:p-5">
                <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <p className="text-sm font-medium leading-relaxed text-foreground/80">
                  Te respondo en menos de 24 horas. Primero conversamos sobre tu idea y después te envío una propuesta con alcance, plazo y presupuesto. No tenés que pagar nada para consultar.
                </p>
              </div>
              <form
                ref={formRef}
                action={formAction}
                onReset={() => {
                  setPlan('')
                  setMessage('')
                }}
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field data-invalid={!!state.errors.name || undefined}>
                      <FieldLabel htmlFor="name">Nombre</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Elena Moretti"
                        required
                        minLength={2}
                        maxLength={80}
                        className="h-11 rounded-xl"
                        aria-invalid={!!state.errors.name || undefined}
                        aria-describedby={
                          state.errors.name ? 'name-error' : undefined
                        }
                      />
                      {state.errors.name ? (
                        <FieldDescription id="name-error" role="alert">
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
                        required
                        maxLength={254}
                        className="h-11 rounded-xl"
                        aria-invalid={!!state.errors.email || undefined}
                        aria-describedby={
                          state.errors.email ? 'email-error' : undefined
                        }
                      />
                      {state.errors.email ? (
                        <FieldDescription id="email-error" role="alert">
                          {state.errors.email}
                        </FieldDescription>
                      ) : null}
                    </Field>
                  </div>

                  {/* Plan selector — plain buttons keep it a single native form value */}
                  <Field data-invalid={!!state.errors.plan || undefined}>
                    <FieldLabel htmlFor="plan-group">
                      ¿Qué plan te interesa?
                    </FieldLabel>
                    <input type="hidden" name="plan" value={plan} />
                    <div
                      id="plan-group"
                      role="group"
                      aria-label="Qué plan te interesa"
                      aria-describedby={state.errors.plan ? 'plan-error' : undefined}
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
                    {state.errors.plan ? (
                      <FieldDescription id="plan-error" role="alert">
                        {state.errors.plan}
                      </FieldDescription>
                    ) : null}
                  </Field>

                  <Field data-invalid={!!state.errors.message || undefined}>
                    <FieldLabel htmlFor="message">Detalles del proyecto</FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={5}
                      placeholder="¿A qué se dedica tu negocio, qué necesitás conseguir con el sitio web y tenés alguna fecha límite en mente?"
                      required
                      minLength={10}
                      maxLength={4000}
                      className="resize-none rounded-xl"
                      aria-invalid={!!state.errors.message || undefined}
                      aria-describedby={
                        state.errors.message ? 'message-error' : 'message-hint'
                      }
                    />
                    {state.errors.message ? (
                      <FieldDescription id="message-error" role="alert">
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

                  <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Al enviar el formulario aceptás el tratamiento de tus datos
                    según la <a href="/privacidad" className="underline underline-offset-2 hover:text-foreground">política de privacidad</a>.
                  </p>

                  <p aria-live="polite" className="sr-only">
                    {state.message}
                  </p>
                </FieldGroup>
              </form>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <CallBooking />
        </Reveal>
      </div>
    </section>
  )
}
