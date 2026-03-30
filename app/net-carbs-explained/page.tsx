import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowLeft, Info, Minus } from "lucide-react"
import Link from "next/link"
import { SchemaMarkup } from "@/components/schema-markup"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata = {
  title: "Net Carbs vs Total Carbs Explained — Keto Guide | Keto Calculator",
  description:
    "Learn the difference between net carbs and total carbs for keto success. Understand how to calculate net carbs and why they matter.",
  keywords: "net carbs, total carbs, net carbs calculator, keto carbs, how to calculate net carbs",
}

export default function NetCarbsExplainedPage() {
  const faqs = [
    {
      question: "What's the difference between total carbs and net carbs?",
      answer:
        "Total carbs include all carbohydrates in food, while net carbs subtract fiber and certain sugar alcohols that don't significantly impact blood sugar or ketosis.",
    },
    {
      question: "Should I count all sugar alcohols the same way?",
      answer:
        "No, different sugar alcohols have different impacts. Erythritol can be fully subtracted, while xylitol should only be 50% subtracted, and maltitol should be counted fully.",
    },
    {
      question: "Do I need to track net carbs or total carbs on keto?",
      answer:
        "Track net carbs for keto. Net carbs give you a more accurate picture of how foods will affect your blood sugar and ketosis state.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup
        type="article"
        title="Net Carbs vs Total Carbs Explained — Keto Guide"
        description="Learn the difference between net carbs and total carbs for keto success. Understand how to calculate net carbs and why they matter."
        url="https://ketocalculator.vercel.app/net-carbs-explained"
      />
      <SchemaMarkup type="faq" faqs={faqs} />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Keto Calculator</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#calculator" className="text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </Link>
            <Link href="/keto-macro-guide" className="text-muted-foreground hover:text-foreground transition-colors">
              Macro Guide
            </Link>
            <Link href="/keto-foods-list" className="text-muted-foreground hover:text-foreground transition-colors">
              Foods
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs items={[{ label: "Net Carbs Explained" }]} />

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Net Carbs vs Total Carbs Explained</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Understanding the difference between net carbs and total carbs is crucial for keto success. Learn how to
            calculate net carbs and why they matter for ketosis.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary">Essential Knowledge</Badge>
            <Badge variant="secondary">Beginner Friendly</Badge>
            <Badge variant="secondary">Quick Read</Badge>
          </div>
        </div>

        {/* Quick Formula */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">The Net Carbs Formula</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4 text-lg font-semibold">
              <span className="bg-card px-4 py-2 rounded-lg">Total Carbs</span>
              <Minus className="h-6 w-6 text-muted-foreground" />
              <span className="bg-card px-4 py-2 rounded-lg">Fiber</span>
              <Minus className="h-6 w-6 text-muted-foreground" />
              <span className="bg-card px-4 py-2 rounded-lg">Sugar Alcohols*</span>
              <span className="text-2xl text-primary">=</span>
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Net Carbs</span>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              *Some sugar alcohols like erythritol can be fully subtracted, others only partially
            </p>
          </CardContent>
        </Card>

        {/* What Are Net Carbs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">What Are Net Carbs?</h2>

          <div className="space-y-6">
            <p className="text-muted-foreground text-lg">
              Net carbs represent the carbohydrates that your body can actually digest and use for energy. They're
              calculated by subtracting fiber and certain sugar alcohols from total carbohydrates because these
              components don't significantly impact blood sugar or ketosis.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Why Net Carbs Matter for Keto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>Blood Sugar Impact:</strong> Only net carbs significantly affect blood glucose levels
                  </li>
                  <li>
                    • <strong>Ketosis Maintenance:</strong> Net carbs determine whether you stay in ketosis
                  </li>
                  <li>
                    • <strong>More Food Choices:</strong> Allows you to eat more vegetables and fiber-rich foods
                  </li>
                  <li>
                    • <strong>Accurate Tracking:</strong> Provides a more precise measure of carb impact
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fiber Explanation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Understanding Fiber</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What is Fiber?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fiber is a type of carbohydrate that your body cannot digest. It passes through your digestive system
                  largely intact, providing no calories or blood sugar impact.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Soluble Fiber:</strong> Dissolves in water, helps lower cholesterol
                  </li>
                  <li>
                    • <strong>Insoluble Fiber:</strong> Doesn't dissolve, aids digestion
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of Fiber on Keto</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Supports digestive health</li>
                  <li>• Helps maintain regular bowel movements</li>
                  <li>• Promotes feelings of fullness</li>
                  <li>• Feeds beneficial gut bacteria</li>
                  <li>• May help lower cholesterol</li>
                  <li>• Doesn't kick you out of ketosis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sugar Alcohols */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Sugar Alcohols & Net Carbs</h2>

          <p className="text-muted-foreground mb-6">
            Sugar alcohols are sweeteners that have minimal impact on blood sugar, but the calculation varies by type.
            Here's how to handle different sugar alcohols:
          </p>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Fully Subtractable (100%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Erythritol</h4>
                    <p className="text-sm text-muted-foreground">Nearly zero calories, no blood sugar impact</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Monk Fruit</h4>
                    <p className="text-sm text-muted-foreground">Natural sweetener, zero glycemic impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-yellow-600">Partially Subtractable (50%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Xylitol</h4>
                    <p className="text-sm text-muted-foreground">Some blood sugar impact, subtract 50%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sorbitol</h4>
                    <p className="text-sm text-muted-foreground">Moderate glycemic impact, subtract 50%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Count Fully (0% Subtraction)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Maltitol</h4>
                    <p className="text-sm text-muted-foreground">High glycemic impact, count all carbs</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Isomalt</h4>
                    <p className="text-sm text-muted-foreground">Significant blood sugar impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practical Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Practical Examples</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Example 1: Broccoli (1 cup chopped)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Total Carbohydrates:</span>
                    <span className="font-semibold">6g</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Fiber:</span>
                    <span className="font-semibold">2g</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold text-primary">Net Carbs:</span>
                    <span className="font-bold text-primary">4g</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example 2: Keto Chocolate Bar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Total Carbohydrates:</span>
                    <span className="font-semibold">12g</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Fiber:</span>
                    <span className="font-semibold">3g</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Erythritol:</span>
                    <span className="font-semibold">7g</span>
                  </div>
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold text-primary">Net Carbs:</span>
                    <span className="font-bold text-primary">2g</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">12g - 3g fiber - 7g erythritol = 2g net carbs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Tips for Tracking Net Carbs</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Nutrition Labels</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Look for "Total Carbohydrates" first</li>
                  <li>• Find "Dietary Fiber" listed underneath</li>
                  <li>• Check for sugar alcohols in ingredients</li>
                  <li>• Some labels show "Net Carbs" directly</li>
                  <li>• When in doubt, use total carbs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Most apps calculate net carbs automatically</li>
                  <li>• Cronometer is very accurate for keto</li>
                  <li>• MyFitnessPal requires manual calculation</li>
                  <li>• Always double-check the math</li>
                  <li>• Create custom foods for accuracy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Calculate Your Keto Macros?</h3>
            <p className="text-muted-foreground mb-6">
              Now that you understand net carbs, use our calculator to determine your daily macro targets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/#calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate My Macros
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/keto-foods-list">View Keto Foods List</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
