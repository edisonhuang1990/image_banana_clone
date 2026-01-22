"use client"

import { useMemo, useState } from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"
type Category = "subscriptions" | "team" | "credits"

type Plan = {
  name: string
  description: string
  highlight?: string
  priceMonthly: number
  priceYearly: number
  priceYearlyOriginal?: number
  yearlyDiscountLabel?: string
  creditsPerYear: number
  imagesPerMonth: number
  hasQuantity?: boolean
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
  features: string[]
}

export function PricingPlans({
  paypalUrl,
}: {
  paypalUrl: string
}) {
  const [category, setCategory] = useState<Category>("subscriptions")
  const [billing, setBilling] = useState<Billing>("monthly")
  const [currency, setCurrency] = useState("USD")
  const [proQty, setProQty] = useState("1")
  const [maxQty, setMaxQty] = useState("1")

  const plans = useMemo<Plan[]>(
    () => [
      {
        name: "Basic",
        description: "Perfect for individuals and light users",
        priceMonthly: 12,
        priceYearly: 144,
        priceYearlyOriginal: 180,
        creditsPerYear: 2400,
        imagesPerMonth: 100,
        ctaLabel: "Get Basic",
        ctaHref: paypalUrl,
        ctaExternal: true,
        features: [
          "100 high-quality images/month",
          "All style templates included",
          "Standard generation speed",
          "Basic customer support",
          "JPG/PNG format downloads",
          "Commercial Use License",
        ],
      },
      {
        name: "Pro",
        description: "For professional creators and teams",
        highlight: "Most Popular",
        priceMonthly: 19.5,
        priceYearly: 234,
        priceYearlyOriginal: 468,
        yearlyDiscountLabel: "SAVE 50%",
        creditsPerYear: 9600,
        imagesPerMonth: 400,
        hasQuantity: true,
        ctaLabel: "Get Pro",
        ctaHref: paypalUrl,
        ctaExternal: true,
        features: [
          "400 high-quality images/month",
          "Support Seedream-4 Model",
          "Support Nanobanana-Pro Model",
          "All style templates included",
          "Priority generation queue",
          "Priority customer support",
          "JPG/PNG/WebP format downloads",
          "Batch generation feature",
          "Image editing tools (Coming in October)",
          "Commercial Use License",
        ],
      },
      {
        name: "Max",
        description: "Designed for large enterprises and professional studios",
        priceMonthly: 80,
        priceYearly: 960,
        priceYearlyOriginal: 1920,
        yearlyDiscountLabel: "SAVE 50%",
        creditsPerYear: 43200,
        imagesPerMonth: 1800,
        hasQuantity: true,
        ctaLabel: "Get Max",
        ctaHref: paypalUrl,
        ctaExternal: true,
        features: [
          "1800 high-quality images/month",
          "Support Seedream-4 Model",
          "Support Nanobanana-Pro Model",
          "All style templates included",
          "Fastest generation speed",
          "Dedicated account manager",
          "All format downloads",
          "Batch generation feature",
          "Professional editing suite (Coming in October)",
          "Commercial Use License",
        ],
      },
    ],
    [paypalUrl]
  )

  const currencyLabel = useMemo(() => {
    const map: Record<string, string> = {
      USD: "$ USD - US Dollar",
      CNY: "¥ CNY - Chinese Yuan",
      EUR: "€ EUR - Euro",
      GBP: "£ GBP - British Pound",
      JPY: "¥ JPY - Japanese Yen",
    }
    return map[currency] ?? "$ USD - US Dollar"
  }, [currency])

  function formatPrice(value: number) {
    // Display only; actual billing should be handled by your payment provider.
    return `$${value.toFixed(2)}`
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-primary">Limited Time</span>: Save with annual billing
        </p>

        <div className="w-full max-w-xs">
          <p className="mb-2 text-sm font-medium">Select Currency</p>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">$ USD - US Dollar</SelectItem>
              <SelectItem value="CNY">¥ CNY - Chinese Yuan</SelectItem>
              <SelectItem value="EUR">€ EUR - Euro</SelectItem>
              <SelectItem value="JPY">¥ JPY - Japanese Yen</SelectItem>
              <SelectItem value="GBP">£ GBP - British Pound</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2 text-xs text-muted-foreground">{currencyLabel}</p>
        </div>

        <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
          <TabsList>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="team">Team Plans</TabsTrigger>
            <TabsTrigger value="credits">Credit Packs</TabsTrigger>
          </TabsList>
          <TabsContent value="subscriptions" className="mt-6">
            <div className="flex items-center justify-center">
              <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => {
                const isHighlighted = Boolean(plan.highlight)
                const qty =
                  plan.name === "Pro" ? Number(proQty) : plan.name === "Max" ? Number(maxQty) : 1
                const creditsPerYear = plan.creditsPerYear * qty
                const imagesPerMonth = plan.imagesPerMonth * qty

                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "relative overflow-hidden",
                      isHighlighted ? "border-primary/50 shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]" : undefined
                    )}
                  >
                    {plan.highlight ? (
                      <div className="absolute right-4 top-4">
                        <Badge variant="secondary">{plan.highlight}</Badge>
                      </div>
                    ) : null}

                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="pb-6">
                      {billing === "monthly" ? (
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-bold">{formatPrice(plan.priceMonthly)}</span>
                          <span className="pb-1 text-sm text-muted-foreground">/mo</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            {plan.priceYearlyOriginal ? (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(plan.priceYearlyOriginal)}
                              </span>
                            ) : null}
                            <span className="text-4xl font-bold">{formatPrice(plan.priceYearly)}</span>
                            <span className="pb-1 text-sm text-muted-foreground">/year</span>
                            {plan.yearlyDiscountLabel ? (
                              <Badge className="ml-1" variant="secondary">
                                {plan.yearlyDiscountLabel}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="text-sm text-muted-foreground">{creditsPerYear} credits/year</p>
                        </div>
                      )}

                      {billing === "monthly" ? (
                        <p className="mt-2 text-sm text-muted-foreground">{imagesPerMonth} high-quality images/month</p>
                      ) : null}

                      {plan.hasQuantity ? (
                        <div className="mt-6">
                          <p className="mb-2 text-sm font-medium">Quantity Adjustment</p>
                          <Select
                            value={plan.name === "Pro" ? proQty : maxQty}
                            onValueChange={(v) => (plan.name === "Pro" ? setProQty(v) : setMaxQty(v))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x</SelectItem>
                              <SelectItem value="10">10x (up to 60% bonus)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : null}

                      <div className="mt-6 space-y-3">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{f}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full" variant={isHighlighted ? "default" : "secondary"}>
                        <a href={plan.ctaHref} target="_blank" rel="noreferrer">
                          {plan.ctaLabel}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              This is a PayPal payment link checkout. If you need different amounts per plan, we can switch to PayPal
              APIs later.
            </p>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <div className="mx-auto max-w-2xl rounded-lg border bg-background p-8 text-center">
              <p className="text-lg font-semibold">Team Plans</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Coming soon. For now, you can purchase via the PayPal link and we can manually help you set up seats.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <a href={paypalUrl} target="_blank" rel="noreferrer">
                    Pay with PayPal
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="credits" className="mt-6">
            <div className="mx-auto max-w-2xl rounded-lg border bg-background p-8 text-center">
              <p className="text-lg font-semibold">Credit Packs</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Coming soon. For now, use subscriptions to get recurring credits.
              </p>
              <div className="mt-6">
                <Button asChild variant="secondary">
                  <a href="/#editor">Try the editor</a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
