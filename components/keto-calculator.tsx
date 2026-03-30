"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Calculator, Download, Share2, RotateCcw, BookmarkPlus, Check, Target } from "lucide-react"

interface CalculatorInputs {
  gender: string
  age: string
  height: string
  weight: string
  activityLevel: string
  goal: string
  units: "metric" | "imperial"
  bodyFat?: string
}

interface MacroResults {
  calories: number
  fat: { grams: number; percentage: number }
  protein: { grams: number; percentage: number }
  netCarbs: { grams: number; percentage: number }
  inputs: CalculatorInputs
  calculatedAt: string
}

export function KetoCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    gender: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    units: "metric",
    bodyFat: "",
  })

  const [results, setResults] = useState<MacroResults | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedInputs = localStorage.getItem("keto-calculator-inputs")
    if (savedInputs) {
      try {
        const parsed = JSON.parse(savedInputs)
        setInputs(parsed)
      } catch (error) {
        console.error("Failed to load saved inputs:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (inputs.gender || inputs.age || inputs.height || inputs.weight) {
      localStorage.setItem("keto-calculator-inputs", JSON.stringify(inputs))
    }
  }, [inputs])

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    athlete: 1.9,
  }

  const goalAdjustments = {
    "lose-weight": -0.2,
    maintain: 0,
    "gain-muscle": 0.1,
  }

  const calculateMacros = () => {
    if (!inputs.gender || !inputs.age || !inputs.height || !inputs.weight || !inputs.activityLevel || !inputs.goal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to calculate your macros.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      // Convert to metric if needed
      let weightKg = Number.parseFloat(inputs.weight)
      let heightCm = Number.parseFloat(inputs.height)

      if (inputs.units === "imperial") {
        weightKg = weightKg * 0.453592 // lbs to kg
        heightCm = heightCm * 2.54 // inches to cm
      }

      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr: number
      if (inputs.gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * Number.parseFloat(inputs.age) + 5
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * Number.parseFloat(inputs.age) - 161
      }

      // Calculate TDEE
      const activityMultiplier = activityMultipliers[inputs.activityLevel as keyof typeof activityMultipliers]
      const tdee = bmr * activityMultiplier

      // Adjust for goal
      const goalAdjustment = goalAdjustments[inputs.goal as keyof typeof goalAdjustments]
      const targetCalories = Math.round(tdee * (1 + goalAdjustment))

      // Calculate keto macros
      const fatPercentage = 70 // 70% fat
      const proteinPercentage = 25 // 25% protein
      const carbPercentage = 5 // 5% net carbs

      const fatCalories = targetCalories * (fatPercentage / 100)
      const proteinCalories = targetCalories * (proteinPercentage / 100)
      const carbCalories = targetCalories * (carbPercentage / 100)

      const fatGrams = Math.round(fatCalories / 9) // 9 calories per gram of fat
      const proteinGrams = Math.round(proteinCalories / 4) // 4 calories per gram of protein
      const carbGrams = Math.round(carbCalories / 4) // 4 calories per gram of carbs

      const newResults: MacroResults = {
        calories: targetCalories,
        fat: { grams: fatGrams, percentage: fatPercentage },
        protein: { grams: proteinGrams, percentage: proteinPercentage },
        netCarbs: { grams: carbGrams, percentage: carbPercentage },
        inputs: { ...inputs },
        calculatedAt: new Date().toISOString(),
      }

      setResults(newResults)

      localStorage.setItem("keto-calculator-results", JSON.stringify(newResults))

      setIsLoading(false)

      toast({
        title: "Macros Calculated!",
        description: "Your personalized keto macros are ready. Results have been saved automatically.",
      })

      setTimeout(() => {
        const resultsElement = document.getElementById("results-section")
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }, 1000)
  }

  const resetCalculator = () => {
    setInputs({
      gender: "",
      age: "",
      height: "",
      weight: "",
      activityLevel: "",
      goal: "",
      units: "metric",
      bodyFat: "",
    })
    setResults(null)
    localStorage.removeItem("keto-calculator-inputs")
    localStorage.removeItem("keto-calculator-results")

    toast({
      title: "Calculator Reset",
      description: "All data has been cleared.",
    })
  }

  const exportToPDF = () => {
    if (!results) return

    const printContent = `
      <html>
        <head>
          <title>Keto Macro Results</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { color: #059669; font-size: 24px; font-weight: bold; }
            .title { font-size: 28px; margin: 10px 0; }
            .subtitle { color: #666; margin-bottom: 30px; }
            .calories { text-align: center; font-size: 36px; color: #059669; margin: 20px 0; }
            .macros { display: flex; justify-content: space-around; margin: 30px 0; }
            .macro { text-align: center; }
            .macro-value { font-size: 24px; font-weight: bold; }
            .macro-label { color: #666; font-size: 14px; }
            .fat { color: #059669; }
            .protein { color: #f97316; }
            .carbs { color: #475569; }
            .details { margin-top: 30px; }
            .detail-row { margin: 10px 0; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🥑 Keto Calculator</div>
            <h1 class="title">Your Personalized Keto Macros</h1>
            <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="calories">${results.calories.toLocaleString()} calories/day</div>
          
          <div class="macros">
            <div class="macro">
              <div class="macro-value fat">${results.fat.grams}g</div>
              <div class="macro-label">Fat (${results.fat.percentage}%)</div>
            </div>
            <div class="macro">
              <div class="macro-value protein">${results.protein.grams}g</div>
              <div class="macro-label">Protein (${results.protein.percentage}%)</div>
            </div>
            <div class="macro">
              <div class="macro-value carbs">${results.netCarbs.grams}g</div>
              <div class="macro-label">Net Carbs (${results.netCarbs.percentage}%)</div>
            </div>
          </div>
          
          <div class="details">
            <h3>Your Details:</h3>
            <div class="detail-row"><strong>Gender:</strong> ${results.inputs.gender}</div>
            <div class="detail-row"><strong>Age:</strong> ${results.inputs.age} years</div>
            <div class="detail-row"><strong>Height:</strong> ${results.inputs.height} ${results.inputs.units === "metric" ? "cm" : "inches"}</div>
            <div class="detail-row"><strong>Weight:</strong> ${results.inputs.weight} ${results.inputs.units === "metric" ? "kg" : "lbs"}</div>
            <div class="detail-row"><strong>Activity Level:</strong> ${results.inputs.activityLevel}</div>
            <div class="detail-row"><strong>Goal:</strong> ${results.inputs.goal.replace("-", " ")}</div>
          </div>
          
          <div class="footer">
            <p>Generated by Keto Calculator - https://keto-calculator.vercel.app</p>
            <p>Consult with a healthcare professional before starting any new diet.</p>
          </div>
        </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }

    toast({
      title: "PDF Export",
      description: "Your macro results have been prepared for printing/saving as PDF.",
    })
  }

  const shareResults = async () => {
    if (!results) return

    const shareText = `🥑 My Keto Macros:
📊 ${results.calories} calories/day
🟢 Fat: ${results.fat.grams}g (${results.fat.percentage}%)
🟠 Protein: ${results.protein.grams}g (${results.protein.percentage}%)
🔵 Net Carbs: ${results.netCarbs.grams}g (${results.netCarbs.percentage}%)

Calculate yours at: https://keto-calculator.vercel.app`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Keto Macro Results",
          text: shareText,
          url: "https://keto-calculator.vercel.app",
        })
        toast({
          title: "Shared Successfully",
          description: "Your macro results have been shared!",
        })
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied to Clipboard",
        description: "Your macro results have been copied to clipboard!",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const saveResults = () => {
    if (!results) return

    const savedResults = localStorage.getItem("keto-saved-results")
    const existingSaved = savedResults ? JSON.parse(savedResults) : []

    const newSave = {
      ...results,
      savedAt: new Date().toISOString(),
      id: Date.now(),
    }

    existingSaved.unshift(newSave)
    // Keep only last 5 saves
    const limitedSaves = existingSaved.slice(0, 5)

    localStorage.setItem("keto-saved-results", JSON.stringify(limitedSaves))

    toast({
      title: "Results Saved",
      description: "Your macro results have been saved for future reference.",
    })
  }

  const pieData = results
    ? [
        { name: "Fat", value: results.fat.percentage, grams: results.fat.grams, color: "#059669" },
        { name: "Protein", value: results.protein.percentage, grams: results.protein.grams, color: "#f97316" },
        { name: "Net Carbs", value: results.netCarbs.percentage, grams: results.netCarbs.grams, color: "#475569" },
      ]
    : []

  const barData = results
    ? [
        { name: "Fat", grams: results.fat.grams, color: "#059669" },
        { name: "Protein", grams: results.protein.grams, color: "#f97316" },
        { name: "Net Carbs", grams: results.netCarbs.grams, color: "#475569" },
      ]
    : []

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-4 md:pb-6 px-4 md:px-6">
          <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2 md:gap-3 mb-2">
            <Calculator className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Keto Macro Calculator
          </CardTitle>
          <CardDescription className="text-base md:text-lg">
            Enter your details below to calculate your personalized ketogenic diet macros
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 md:space-y-8 px-4 md:px-6">
          {/* Units Toggle */}
          <div className="flex justify-center">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={inputs.units === "metric" ? "default" : "ghost"}
                size="sm"
                onClick={() => setInputs((prev) => ({ ...prev, units: "metric" }))}
              >
                Metric
              </Button>
              <Button
                variant={inputs.units === "imperial" ? "default" : "ghost"}
                size="sm"
                onClick={() => setInputs((prev) => ({ ...prev, units: "imperial" }))}
              >
                Imperial
              </Button>
            </div>
          </div>

          {/* Basic Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm md:text-base font-medium">
                  Gender *
                </Label>
                <Select
                  value={inputs.gender}
                  onValueChange={(value) => setInputs((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm md:text-base font-medium">
                  Age (years) *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  className="h-11 md:h-12 text-base"
                  value={inputs.age}
                  onChange={(e) => setInputs((prev) => ({ ...prev, age: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm md:text-base font-medium">
                  Height ({inputs.units === "metric" ? "cm" : "inches"}) *
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder={inputs.units === "metric" ? "170" : "67"}
                  className="h-11 md:h-12 text-base"
                  value={inputs.height}
                  onChange={(e) => setInputs((prev) => ({ ...prev, height: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm md:text-base font-medium">
                  Weight ({inputs.units === "metric" ? "kg" : "lbs"}) *
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={inputs.units === "metric" ? "70" : "154"}
                  className="h-11 md:h-12 text-base"
                  value={inputs.weight}
                  onChange={(e) => setInputs((prev) => ({ ...prev, weight: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity" className="text-sm md:text-base font-medium">
                  Activity Level *
                </Label>
                <Select
                  value={inputs.activityLevel}
                  onValueChange={(value) => setInputs((prev) => ({ ...prev, activityLevel: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="athlete">Athlete (very hard exercise, physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm md:text-base font-medium">
                  Goal *
                </Label>
                <Select value={inputs.goal} onValueChange={(value) => setInputs((prev) => ({ ...prev, goal: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-weight">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="pt-2 md:pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm md:text-base text-muted-foreground hover:text-foreground"
            >
              {showAdvanced ? "Hide" : "Show"} Advanced Options
            </Button>

            {showAdvanced && (
              <div className="mt-4 md:mt-6 p-4 md:p-6 bg-muted/50 rounded-lg">
                <div className="max-w-md space-y-2">
                  <Label htmlFor="bodyFat" className="text-sm md:text-base font-medium">
                    Body Fat Percentage (optional)
                  </Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    placeholder="15"
                    className="h-11 md:h-12 text-base"
                    value={inputs.bodyFat}
                    onChange={(e) => setInputs((prev) => ({ ...prev, bodyFat: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    If known, this can provide more accurate protein calculations
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4">
            <Button onClick={calculateMacros} size="lg" className="px-6 md:px-10 py-5 md:py-6 text-base md:text-lg" disabled={isLoading}>
              <Calculator className="mr-2 md:mr-3 h-5 w-5" />
              {isLoading ? "Calculating..." : "Calculate My Macros"}
            </Button>
            <Button onClick={resetCalculator} variant="outline" size="lg" className="px-6 md:px-8 py-5 md:py-6 text-base md:text-lg bg-transparent">
              <RotateCcw className="mr-2 md:mr-3 h-5 w-5" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Affiliate Box - Keto Quiz */}
      {results && (
        <Card className="relative overflow-hidden border-2 border-primary/50 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 animate-pulse" />
          <CardContent className="relative p-4 md:p-8">
            <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg">
                  <Target className="h-7 w-7 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <Badge className="mb-2 md:mb-3 bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs md:text-sm">
                  FREE PERSONALIZED PLAN
                </Badge>
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2">
                  TAKE A 1-MINUTE QUIZ TO CREATE YOUR CUSTOM KETO DIET
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                  Get a personalized keto meal plan tailored to your body type, lifestyle, and goals. Join over 1 million people who have transformed their health!
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center text-xs md:text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 md:h-4 md:w-4 text-primary" /> Personalized meals</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 md:h-4 md:w-4 text-primary" /> Shopping lists</span>
                  <span className="flex items-center gap-1"><Check className="h-3 w-3 md:h-4 md:w-4 text-primary" /> Expert guidance</span>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <a
                  href="https://a77304t-1cg9rpc6fku-48jh83.hop.clickbank.net/?cbpage=rec&traffic_source=Vercel&traffic_type=organic&campaign=ketoquiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Start Free Quiz
                    <span className="ml-2">&#8594;</span>
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <Card className="shadow-lg" id="results-section">
          <CardHeader className="text-center pb-4 md:pb-6 px-4 md:px-6">
            <CardTitle className="text-2xl md:text-3xl text-primary mb-2">Your Keto Macros</CardTitle>
            <CardDescription className="text-base md:text-lg">Daily macronutrient targets for your ketogenic diet</CardDescription>
            <div className="flex justify-center mt-3 md:mt-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">
                Calculated Successfully
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-10 px-4 md:px-6">
            {/* Daily Calories */}
            <div className="text-center py-4 md:py-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 md:mb-3">{results.calories.toLocaleString()}</div>
              <p className="text-lg md:text-xl text-muted-foreground">calories per day</p>
            </div>

            <Separator />

            {/* Macro Breakdown */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 py-2 md:py-4">
              <div className="text-center space-y-2 md:space-y-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-chart-1 rounded-full mx-auto"></div>
                <div className="text-xl md:text-3xl font-bold text-chart-1">{results.fat.grams}g</div>
                <div className="text-xs md:text-base text-muted-foreground">Fat ({results.fat.percentage}%)</div>
              </div>
              <div className="text-center space-y-2 md:space-y-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-chart-2 rounded-full mx-auto"></div>
                <div className="text-xl md:text-3xl font-bold text-chart-2">{results.protein.grams}g</div>
                <div className="text-xs md:text-base text-muted-foreground">Protein ({results.protein.percentage}%)</div>
              </div>
              <div className="text-center space-y-2 md:space-y-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-chart-3 rounded-full mx-auto"></div>
                <div className="text-xl md:text-3xl font-bold text-chart-3">{results.netCarbs.grams}g</div>
                <div className="text-xs md:text-base text-muted-foreground">Net Carbs ({results.netCarbs.percentage}%)</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-2 md:py-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6">Macro Ratio</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6">Daily Grams</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => [`${value}g`, "Grams"]} />
                    <Bar dataKey="grams" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center py-2 md:py-4">
              <Button onClick={exportToPDF} variant="outline" size="default" className="px-4 md:px-6 py-2 md:py-3 bg-transparent text-sm md:text-base">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={shareResults} variant="outline" size="default" className="px-4 md:px-6 py-2 md:py-3 bg-transparent text-sm md:text-base">
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                {copied ? "Copied!" : "Share Results"}
              </Button>
              <Button onClick={saveResults} variant="outline" size="default" className="px-4 md:px-6 py-2 md:py-3 bg-transparent text-sm md:text-base">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Save Results
              </Button>
            </div>

            {/* Sample Meal Plan Preview */}
            <div className="bg-muted/50 rounded-lg p-4 md:p-8 mt-4 md:mt-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Sample Meal Plan Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-medium text-primary text-base md:text-lg">Breakfast</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Scrambled eggs with avocado and spinach cooked in butter</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-medium text-primary text-base md:text-lg">Lunch</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Grilled chicken salad with olive oil dressing and cheese</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-medium text-primary text-base md:text-lg">Dinner</h4>
                  <p className="text-sm md:text-base text-muted-foreground">Salmon with broccoli and cauliflower mash with butter</p>
                </div>
              </div>
            </div>

            {/* Methodology */}
            <div className="bg-card border rounded-lg p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">How We Calculate Your Macros</h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">1. BMR Calculation:</strong> We use the Mifflin-St Jeor equation
                  to calculate your Basal Metabolic Rate.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">2. TDEE Adjustment:</strong> Your BMR is multiplied by your
                  activity level to get Total Daily Energy Expenditure.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">3. Goal Adjustment:</strong> Calories are adjusted based on your
                  goal (deficit for weight loss, surplus for muscle gain).
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">4. Keto Ratios:</strong> Macros are distributed as 70% fat, 25%
                  protein, and 5% net carbs for optimal ketosis.
                </p>
              </div>
            </div>

            <div className="text-center text-xs md:text-sm text-muted-foreground pt-2 md:pt-4">
              Calculated on {new Date(results.calculatedAt).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
