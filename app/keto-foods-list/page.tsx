import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { SchemaMarkup } from "@/components/schema-markup"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata = {
  title: "Complete Keto Foods List — What to Eat & Avoid | Keto Calculator",
  description:
    "Comprehensive keto foods list with carb counts. Learn which foods are keto-friendly and which to avoid for optimal ketosis.",
  keywords: "keto foods list, ketogenic diet foods, keto friendly foods, what to eat on keto, keto food guide",
}

export default function KetoFoodsListPage() {
  const ketoFoods = [
    {
      category: "Fats & Oils",
      icon: "🥑",
      foods: [
        { name: "Avocado", carbs: "2g net carbs per 100g", status: "excellent" },
        { name: "Olive Oil", carbs: "0g net carbs", status: "excellent" },
        { name: "Coconut Oil", carbs: "0g net carbs", status: "excellent" },
        { name: "Butter", carbs: "0.1g net carbs per tbsp", status: "excellent" },
        { name: "MCT Oil", carbs: "0g net carbs", status: "excellent" },
        { name: "Nuts & Seeds", carbs: "2-6g net carbs per oz", status: "good" },
      ],
    },
    {
      category: "Proteins",
      icon: "🥩",
      foods: [
        { name: "Beef", carbs: "0g net carbs", status: "excellent" },
        { name: "Chicken", carbs: "0g net carbs", status: "excellent" },
        { name: "Fish & Seafood", carbs: "0-2g net carbs", status: "excellent" },
        { name: "Eggs", carbs: "0.6g net carbs per egg", status: "excellent" },
        { name: "Pork", carbs: "0g net carbs", status: "excellent" },
        { name: "Lamb", carbs: "0g net carbs", status: "excellent" },
      ],
    },
    {
      category: "Low-Carb Vegetables",
      icon: "🥬",
      foods: [
        { name: "Spinach", carbs: "1.4g net carbs per cup", status: "excellent" },
        { name: "Broccoli", carbs: "4g net carbs per cup", status: "good" },
        { name: "Cauliflower", carbs: "2g net carbs per cup", status: "excellent" },
        { name: "Zucchini", carbs: "2g net carbs per cup", status: "excellent" },
        { name: "Bell Peppers", carbs: "4-7g net carbs per cup", status: "good" },
        { name: "Asparagus", carbs: "2g net carbs per cup", status: "excellent" },
      ],
    },
    {
      category: "Dairy",
      icon: "🧀",
      foods: [
        { name: "Cheese (hard)", carbs: "0.5-1g net carbs per oz", status: "excellent" },
        { name: "Heavy Cream", carbs: "0.4g net carbs per tbsp", status: "excellent" },
        { name: "Greek Yogurt (plain)", carbs: "6g net carbs per cup", status: "moderate" },
        { name: "Cream Cheese", carbs: "1g net carbs per oz", status: "good" },
        { name: "Sour Cream", carbs: "1g net carbs per tbsp", status: "good" },
      ],
    },
  ]

  const avoidFoods = [
    {
      category: "High-Carb Foods to Avoid",
      foods: [
        { name: "Bread & Grains", carbs: "15-30g per slice/serving", reason: "Very high in carbs" },
        { name: "Rice & Pasta", carbs: "20-45g per cup", reason: "Extremely high in carbs" },
        { name: "Potatoes", carbs: "15-30g per medium potato", reason: "Starchy vegetable" },
        { name: "Sugar & Sweets", carbs: "25-50g per serving", reason: "Pure carbohydrates" },
        { name: "Most Fruits", carbs: "10-25g per serving", reason: "High in natural sugars" },
        { name: "Legumes & Beans", carbs: "15-30g per cup", reason: "High starch content" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup
        type="article"
        title="Complete Keto Foods List — What to Eat & Avoid"
        description="Comprehensive keto foods list with carb counts. Learn which foods are keto-friendly and which to avoid for optimal ketosis."
        url="https://ketocalculator.vercel.app/keto-foods-list"
      />

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
            <Link href="/keto-meal-plan" className="text-muted-foreground hover:text-foreground transition-colors">
              Meal Plans
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Breadcrumbs items={[{ label: "Keto Foods List" }]} />

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Complete Keto Foods List</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Your comprehensive guide to keto-friendly foods with net carb counts. Know exactly what to eat and what to
            avoid for optimal ketosis.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary">Comprehensive List</Badge>
            <Badge variant="secondary">Net Carb Counts</Badge>
            <Badge variant="secondary">Beginner Friendly</Badge>
          </div>
        </div>

        {/* Quick CTA */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Calculate Your Daily Macros</h3>
                <p className="text-muted-foreground">
                  Get personalized macro targets to plan your keto meals effectively.
                </p>
              </div>
              <Button asChild>
                <Link href="/#calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Macros
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Food Rating Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Excellent (0-2g net carbs)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Good (2-5g net carbs)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Moderate (5-10g net carbs)</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm">Avoid (10+ net carbs)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keto-Friendly Foods */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Keto-Friendly Foods</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {ketoFoods.map((category, index) => (
              <Card key={index} className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {food.status === "excellent" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {food.status === "good" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          {food.status === "moderate" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          <span className="font-medium text-foreground">{food.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{food.carbs}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Foods to Avoid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Foods to Avoid on Keto</h2>

          {avoidFoods.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl text-red-600">{category.category}</CardTitle>
                <CardDescription>These foods are too high in carbohydrates to maintain ketosis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.foods.map((food, foodIndex) => (
                    <div
                      key={foodIndex}
                      className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                    >
                      <div className="flex items-center gap-3">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <div>
                          <span className="font-medium text-foreground">{food.name}</span>
                          <p className="text-xs text-muted-foreground">{food.reason}</p>
                        </div>
                      </div>
                      <span className="text-sm text-red-600 font-medium">{food.carbs}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Shop the perimeter of the grocery store</li>
                <li>• Read nutrition labels carefully</li>
                <li>• Focus on whole, unprocessed foods</li>
                <li>• Buy organic when possible</li>
                <li>• Stock up on keto staples</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meal Planning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Plan your meals around protein</li>
                <li>• Add healthy fats to every meal</li>
                <li>• Prep vegetables in advance</li>
                <li>• Keep keto snacks on hand</li>
                <li>• Track your macros consistently</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Plan Your Keto Meals?</h3>
            <p className="text-muted-foreground mb-6">
              Use our calculator to determine your daily macro targets, then build your meals using this food list.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/#calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate My Macros
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/keto-meal-plan">View Sample Meal Plan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
