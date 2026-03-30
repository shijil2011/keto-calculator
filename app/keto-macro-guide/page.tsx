import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowLeft, BookOpen, Target, Zap } from "lucide-react"
import Link from "next/link"
import { SchemaMarkup } from "@/components/schema-markup"

export const metadata = {
  title: "How to Calculate Keto Macros — Complete Beginner's Guide | Keto Calculator",
  description:
    "Learn how to calculate keto macros with our comprehensive guide. Understand fat, protein, and carb ratios for optimal ketosis and weight loss.",
  keywords:
    "keto macros, how to calculate keto macros, ketogenic diet ratios, keto macro guide, keto fat protein carbs",
}

export default function KetoMacroGuidePage() {
  const howToSteps = [
    "Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation",
    "Multiply BMR by your activity level to get Total Daily Energy Expenditure (TDEE)",
    "Adjust calories based on your goal (deficit for weight loss, surplus for muscle gain)",
    "Calculate 70% of calories from fat (divide by 9 for grams)",
    "Calculate 25% of calories from protein (divide by 4 for grams)",
    "Calculate 5% of calories from net carbs (divide by 4 for grams)",
    "Track your macros using a food diary or app",
  ]

  const faqs = [
    {
      question: "What is the Mifflin-St Jeor equation?",
      answer:
        "The Mifflin-St Jeor equation is the most accurate formula for calculating Basal Metabolic Rate (BMR). For men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161.",
    },
    {
      question: "Should I adjust my macros over time?",
      answer:
        "Yes, you should recalculate your macros every 10-15 pounds of weight loss or if your activity level changes significantly. Your calorie needs decrease as you lose weight.",
    },
    {
      question: "What if I'm not losing weight on keto?",
      answer:
        "If weight loss stalls, try reducing calories by 100-200, increasing activity, or ensuring you're accurately tracking all food intake. Sometimes the body needs time to adjust.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup
        type="article"
        title="How to Calculate Keto Macros — Complete Beginner's Guide"
        description="Learn how to calculate keto macros with our comprehensive guide. Understand fat, protein, and carb ratios for optimal ketosis and weight loss."
        url="https://ketocalculator.vercel.app/keto-macro-guide"
      />
      <SchemaMarkup
        type="howto"
        title="How to Calculate Keto Macros"
        description="Step-by-step guide to calculating your ketogenic diet macronutrients"
        steps={howToSteps}
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
            <Link href="/keto-foods-list" className="text-muted-foreground hover:text-foreground transition-colors">
              Foods
            </Link>
            <Link href="/keto-meal-plan" className="text-muted-foreground hover:text-foreground transition-colors">
              Meal Plans
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Keto Macro Guide</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            How to Calculate Keto Macros — Complete Beginner's Guide
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Master the art of calculating your perfect ketogenic diet macronutrient ratios for optimal fat loss, muscle
            gain, or maintenance.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">
              <BookOpen className="mr-1 h-3 w-3" />
              15 min read
            </Badge>
            <Badge variant="secondary">Beginner Friendly</Badge>
            <Badge variant="secondary">Science-Based</Badge>
          </div>
        </div>

        {/* Quick CTA */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Skip the Math - Use Our Calculator</h3>
                <p className="text-muted-foreground">
                  Get your personalized keto macros instantly with our free calculator.
                </p>
              </div>
              <Button asChild>
                <Link href="/#calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Now
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#what-are-macros" className="text-primary hover:underline">
                  1. What Are Keto Macros?
                </a>
              </li>
              <li>
                <a href="#keto-ratios" className="text-primary hover:underline">
                  2. Standard Keto Macro Ratios
                </a>
              </li>
              <li>
                <a href="#calculate-calories" className="text-primary hover:underline">
                  3. How to Calculate Your Calories
                </a>
              </li>
              <li>
                <a href="#calculate-macros" className="text-primary hover:underline">
                  4. Converting Calories to Grams
                </a>
              </li>
              <li>
                <a href="#adjust-goals" className="text-primary hover:underline">
                  5. Adjusting for Your Goals
                </a>
              </li>
              <li>
                <a href="#tracking-tips" className="text-primary hover:underline">
                  6. Tips for Tracking Macros
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <section id="what-are-macros" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What Are Keto Macros?</h2>

            <p className="text-muted-foreground mb-6">
              Macronutrients, or "macros," are the three main nutrients your body needs in large amounts: fats,
              proteins, and carbohydrates. On a ketogenic diet, you dramatically shift these ratios to force your body
              into ketosis—a metabolic state where you burn fat for fuel instead of glucose.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  The Three Macronutrients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 bg-chart-1 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fats (9 calories per gram)</h4>
                    <p className="text-sm text-muted-foreground">
                      Your primary energy source on keto. Includes oils, butter, nuts, and fatty meats.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 bg-chart-2 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Proteins (4 calories per gram)</h4>
                    <p className="text-sm text-muted-foreground">
                      Essential for muscle maintenance and repair. Found in meat, fish, eggs, and dairy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 bg-chart-3 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Carbohydrates (4 calories per gram)</h4>
                    <p className="text-sm text-muted-foreground">
                      Severely limited on keto. Focus on net carbs (total carbs minus fiber).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="keto-ratios" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Standard Keto Macro Ratios</h2>

            <p className="text-muted-foreground mb-6">
              The standard ketogenic diet follows these macro ratios, which have been proven effective for achieving and
              maintaining ketosis:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-chart-1 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">70%</span>
                  </div>
                  <CardTitle>Fats</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    65-75% of your daily calories should come from healthy fats like avocados, olive oil, and nuts.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-chart-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">25%</span>
                  </div>
                  <CardTitle>Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    20-25% from protein sources to maintain muscle mass and support metabolic functions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-chart-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">5%</span>
                  </div>
                  <CardTitle>Net Carbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    5-10% or 20-50g of net carbs daily, primarily from low-carb vegetables and small amounts of berries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="calculate-calories" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Step 1: Calculate Your Daily Calories</h2>

            <p className="text-muted-foreground mb-6">
              Before determining your macro grams, you need to know your daily calorie needs. This involves calculating
              your Total Daily Energy Expenditure (TDEE).
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>The Calculation Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Calculate Basal Metabolic Rate (BMR)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    We use the Mifflin-St Jeor equation, which is considered the most accurate:
                  </p>
                  <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                    <p>
                      <strong>Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
                    </p>
                    <p>
                      <strong>Women:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Multiply by Activity Level</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Sedentary (1.2):</strong> Little to no exercise
                    </li>
                    <li>
                      • <strong>Light (1.375):</strong> Light exercise 1-3 days/week
                    </li>
                    <li>
                      • <strong>Moderate (1.55):</strong> Moderate exercise 3-5 days/week
                    </li>
                    <li>
                      • <strong>Active (1.725):</strong> Hard exercise 6-7 days/week
                    </li>
                    <li>
                      • <strong>Athlete (1.9):</strong> Very hard exercise, physical job
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Adjust for Your Goal</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Weight Loss:</strong> Subtract 20% (multiply by 0.8)
                    </li>
                    <li>
                      • <strong>Maintenance:</strong> No adjustment
                    </li>
                    <li>
                      • <strong>Muscle Gain:</strong> Add 10% (multiply by 1.1)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="calculate-macros" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Step 2: Convert Calories to Macro Grams</h2>

            <p className="text-muted-foreground mb-6">
              Once you have your daily calorie target, convert the percentages to actual grams using the calorie values
              for each macronutrient.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Example Calculation (2000 calories)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-chart-1/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-chart-1 mb-2">Fats (70% of calories)</h4>
                    <p className="text-sm text-muted-foreground">
                      2000 × 0.70 = 1400 calories from fat
                      <br />
                      1400 ÷ 9 calories per gram = <strong>156g fat daily</strong>
                    </p>
                  </div>

                  <div className="bg-chart-2/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-chart-2 mb-2">Protein (25% of calories)</h4>
                    <p className="text-sm text-muted-foreground">
                      2000 × 0.25 = 500 calories from protein
                      <br />
                      500 ÷ 4 calories per gram = <strong>125g protein daily</strong>
                    </p>
                  </div>

                  <div className="bg-chart-3/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-chart-3 mb-2">Net Carbs (5% of calories)</h4>
                    <p className="text-sm text-muted-foreground">
                      2000 × 0.05 = 100 calories from carbs
                      <br />
                      100 ÷ 4 calories per gram = <strong>25g net carbs daily</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="adjust-goals" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Step 3: Fine-Tune for Your Goals</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weight Loss Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Keep protein higher (1g per lb body weight)</li>
                    <li>• Reduce fat slightly if needed for calorie deficit</li>
                    <li>• Stay strict with carb limit (under 20g net carbs)</li>
                    <li>• Consider intermittent fasting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Muscle Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Increase protein (1.2-1.6g per lb body weight)</li>
                    <li>• Add more calories through healthy fats</li>
                    <li>• Time carbs around workouts if needed</li>
                    <li>• Focus on strength training</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="tracking-tips" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Tips for Tracking Your Macros</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Use a food tracking app like MyFitnessPal or Cronometer</li>
                    <li>• Weigh your food for accuracy, especially in the beginning</li>
                    <li>• Plan your meals in advance to hit your targets</li>
                    <li>• Focus on whole, unprocessed foods</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Mistakes to Avoid</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Don't forget to subtract fiber from total carbs</li>
                    <li>• Avoid "dirty keto" - quality matters</li>
                    <li>• Don't fear fat - it's your primary fuel source</li>
                    <li>• Stay hydrated and supplement electrolytes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Calculate Your Keto Macros?</h3>
            <p className="text-muted-foreground mb-6">
              Skip the manual calculations and get your personalized keto macros instantly with our free calculator.
            </p>
            <Button size="lg" asChild>
              <Link href="/#calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Use Our Free Calculator
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Related Guides</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Keto Foods List</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete list of keto-friendly foods and what to avoid on your ketogenic journey.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/keto-foods-list">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Net Carbs Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Understanding the difference between total carbs and net carbs for keto success.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/net-carbs-explained">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">7-Day Keto Meal Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Sample meal plan with recipes to help you get started with your keto lifestyle.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/keto-meal-plan">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
