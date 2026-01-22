import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPlans } from "@/components/pricing-plans"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Pricing - Nano Banana",
  description: "Choose a plan that fits your image editing workflow.",
}

export default function PricingPage() {
  // Allow either key; PAYPAL_PAYMENT_URL is preferred (server-only).
  const paypalUrl = process.env.PAYPAL_PAYMENT_URL ?? process.env.NEXT_PUBLIC_PAYPAL_PAYMENT_URL
  if (!paypalUrl) throw new Error("Missing required env var: PAYPAL_PAYMENT_URL (or NEXT_PUBLIC_PAYPAL_PAYMENT_URL)")

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden border-b bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-primary mb-2">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Choose Your Perfect Plan</h1>
            <p className="mt-4 text-muted-foreground">Pick a plan and upgrade instantly with PayPal.</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Pricing UI is inspired by imgeditor.co. This site is an independent clone/demo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <PricingPlans paypalUrl={paypalUrl} />
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center">FAQ</h2>
            <p className="mt-3 text-center text-muted-foreground">
              Common questions about plans and payments.
            </p>

            <div className="mt-10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What are credits?</AccordionTrigger>
                  <AccordionContent>
                    Credits are used to generate images. Each plan includes a monthly (or yearly) credit allocation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Why does PayPal open in a new tab?</AccordionTrigger>
                  <AccordionContent>
                    We use a PayPal payment link for checkout. It opens PayPal securely, then you can come back to the
                    app.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                  <AccordionContent>
                    Yes. If your PayPal checkout creates a recurring payment, you can manage it from your PayPal account.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                  <AccordionContent>
                    If something went wrong, contact support with your PayPal transaction ID and we&apos;ll help.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
