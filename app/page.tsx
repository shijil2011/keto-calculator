import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Zap, Target, Users, BookOpen, List, Info } from "lucide-react"
import { KetoCalculator } from "@/components/keto-calculator"
import { SchemaMarkup } from "@/components/schema-markup"
import Link from "next/link"

export default function HomePage() {
  const faqs = [
    {
      question: "What are keto macros?",
      answer:
        "Keto macros refer to the specific ratio of macronutrients (fat, protein, and carbohydrates) that help maintain ketosis: typically 65-75% fat, 20-25% protein, and 5-10% net carbs.",
    },
    {
      question: "How accurate is this calculator?",
      answer:
        "Our calculator uses scientifically-proven TDEE formulas and standard ketogenic diet ratios. Results provide an excellent starting point, though individual needs may vary.",
    },
    {
      question: "Do I need to track everything I eat?",
      answer:
        "While not mandatory, tracking helps ensure you stay within your macro targets, especially when starting keto. Many find it becomes easier with practice.",
    },
    {
      question: "How many net carbs should I eat on keto?",
      answer:
        "Most people should aim for 20-50g of net carbs per day to maintain ketosis. Beginners often start with 20g or less for faster results.",
    },
    {
      question: "Can I use this calculator for weight loss?",
      answer:
        "Yes! Our calculator adjusts your calorie needs based on your goal, including weight loss, maintenance, or muscle gain.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup type="faq" faqs={faqs} />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="text-lg md:text-xl font-bold text-foreground">Keto Calculator</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Calculator
              </a>
              <div className="relative group">
                <span className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                  Guides
                </span>
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <Link
                      href="/keto-macro-guide"
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <BookOpen className="inline-block w-4 h-4 mr-2" />
                      Keto Macro Guide
                    </Link>
                    <Link
                      href="/keto-foods-list"
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <List className="inline-block w-4 h-4 mr-2" />
                      Keto Foods List
                    </Link>
                    <Link
                      href="/net-carbs-explained"
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      <Info className="inline-block w-4 h-4 mr-2" />
                      Net Carbs Explained
                    </Link>
                  </div>
                </div>
              </div>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                How It Works
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                FAQ
              </a>
            </nav>
          </div>
          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-4 mt-3 overflow-x-auto pb-1 -mx-4 px-4">
            <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
              Calculator
            </a>
            <Link href="/keto-macro-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
              Macro Guide
            </Link>
            <Link href="/keto-foods-list" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
              Foods List
            </Link>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance">Keto Calculator</h1>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl text-muted-foreground mb-3 md:mb-4 text-balance">
              Find Your Perfect Keto Macros
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Enter your details and instantly calculate calories, fat, protein, and carbs for your ketogenic lifestyle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6" asChild>
              <a href="#calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Macros
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-transparent" asChild>
              <a href="#how-it-works">Learn How It Works</a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="px-2 md:px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              Fast
            </Badge>
            <Badge variant="secondary" className="px-2 md:px-3 py-1">
              Free
            </Badge>
            <Badge variant="secondary" className="px-2 md:px-3 py-1">
              <Target className="mr-1 h-3 w-3" />
              Science-based
            </Badge>
            <Badge variant="secondary" className="px-2 md:px-3 py-1">
              <Users className="mr-1 h-3 w-3" />
              No signup
            </Badge>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-10 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <KetoCalculator />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="how-it-works" className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Why Use Our Keto Calculator?</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Get accurate, science-based macro calculations tailored to your specific goals and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Science-Backed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Based on proven TDEE calculations and ketogenic diet research for optimal macro ratios.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your personalized keto macros in seconds with our fast, accurate calculator.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Personalized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Customized for your age, weight, height, activity level, and specific keto goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Guides Preview */}
      <section id="guides" className="py-10 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Popular Keto Guides</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Learn everything you need to know about the ketogenic diet and macro tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Keto Macro Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete guide to understanding and calculating keto macronutrients.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Keto Foods List</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive list of keto-friendly foods and what to avoid.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Net Carbs Explained</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Understanding the difference between total carbs and net carbs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">7-Day Meal Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Sample meal plan to get started with your keto journey.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section id="faq" className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg text-muted-foreground">Common questions about keto macros and our calculator.</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground">Keto Calculator</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Free, science-based keto macro calculator for your ketogenic lifestyle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Calculator Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#calculator" className="hover:text-foreground transition-colors">
                    Keto Macro Calculator
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-foreground transition-colors">
                    Weight Loss Calculator
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-foreground transition-colors">
                    Maintenance Calculator
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-foreground transition-colors">
                    Muscle Gain Calculator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Keto Guides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/keto-macro-guide" className="hover:text-foreground transition-colors">
                    Keto Macro Guide
                  </Link>
                </li>
                <li>
                  <Link href="/keto-foods-list" className="hover:text-foreground transition-colors">
                    Keto Foods List
                  </Link>
                </li>
                <li>
                  <Link href="/net-carbs-explained" className="hover:text-foreground transition-colors">
                    Net Carbs Explained
                  </Link>
                </li>
                <li>
                  <a href="#guides" className="hover:text-foreground transition-colors">
                    Meal Plans
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Keto Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
