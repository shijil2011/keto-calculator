#!/usr/bin/env python3
"""
Keto Calculator Auto-Publisher v2
- Generates articles on-demand at publish time using Ollama AI
- Dynamically inserts internal links from previously published pages
- Automatically updates sitemap after every new publication
- Runs via crontab: 9 AM and 6 PM daily
"""

import os
import json
import re
import requests
import subprocess
from datetime import datetime
from pathlib import Path

SITE_DIR = "/root/.openclaw/workspace/keto-calculator"
LOG_FILE = f"{SITE_DIR}/publish_log.json"
PLAN_FILE = f"{SITE_DIR}/30_day_content_plan.md"
OLLAMA_URL = "http://localhost:11434/api/generate"

# Content Plan - 60 topics (will be loaded from file or hardcoded)
CONTENT_PLAN = [
    # Day 1
    ("keto-diet-for-beginners", "Keto Diet for Beginners: The Complete 2026 Guide", "keto diet for beginners", "Getting Started"),
    ("how-to-start-keto", "How to Start Keto: A Step-by-Step Beginners Guide", "how to start keto", "Getting Started"),
    # Day 2
    ("keto-macros-calculator", "Keto Macros Calculator: Find Your Perfect Ratio", "keto macros calculator", "Calculators & Basics"),
    ("net-carbs-ultimate-guide", "Understanding Net Carbs: The Ultimate Guide", "net carbs guide", "Calculators & Basics"),
    # Day 3
    ("keto-weight-loss-guide", "Keto Weight Loss: How It Works and What to Expect", "keto weight loss", "Weight Loss"),
    ("keto-safety-myths-facts", "Is Keto Safe? Common Myths and Facts Debunked", "keto safety myths", "Weight Loss"),
    # Day 4
    ("7-day-keto-meal-plan", "7-Day Keto Meal Plan for Beginners", "7 day keto meal plan", "Meal Plans"),
    ("14-day-keto-diet-plan", "14-Day Keto Diet Plan: Full Two-Week Menu", "14 day keto diet plan", "Meal Plans"),
    # Day 5
    ("best-keto-snacks", "Best Keto Snacks: 20 Low-Carb Options", "best keto snacks", "Food & Snacks"),
    ("keto-fast-food-india", "Keto-Friendly Fast Food Options in India", "keto fast food india", "Food & Snacks"),
    # Day 6
    ("keto-flu-symptoms-remedies", "Keto Flu: Symptoms, Duration, and Remedies", "keto flu remedies", "Health & Science"),
    ("electrolytes-keto-guide", "Electrolytes on Keto: Why They Matter", "electrolytes keto", "Health & Science"),
    # Day 7
    ("keto-breakfast-ideas", "Keto Breakfast Ideas: 25 Quick and Delicious Recipes", "keto breakfast ideas", "Recipes"),
    ("keto-lunch-ideas", "Keto Lunch Ideas: 20 Work-From-Home Meals", "keto lunch ideas", "Recipes"),
    # Day 8
    ("keto-dinner-recipes", "Keto Dinner Recipes: 20 Healthy Indian-Inspired Dishes", "keto dinner recipes", "Recipes"),
    ("keto-desserts-recipes", "Keto Desserts: 15 Guilt-Free Sweet Treats", "keto desserts", "Recipes"),
    # Day 9
    ("keto-and-exercise", "Keto and Exercise: The Truth About Working Out", "keto exercise guide", "Fitness"),
    ("keto-athletes-performance", "Can Athletes Do Keto? Performance Guide", "keto athletes", "Fitness"),
    # Day 10
    ("keto-women-over-40", "Keto for Women Over 40: Hormones and Health", "keto women over 40", "Special Groups"),
    ("pcos-keto-diet", "PCOS and Keto: A Scientific Perspective", "pcos keto diet", "Special Groups"),
    # Day 11
    ("keto-diabetes-blood-sugar", "Keto and Diabetes: Blood Sugar Management", "keto diabetes guide", "Medical"),
    ("keto-cholesterol-truth", "Keto and Cholesterol: What the Science Says", "keto cholesterol", "Medical"),
    # Day 12
    ("intermittent-fasting-keto", "Intermittent Fasting on Keto: The Perfect Combination", "intermittent fasting keto", "Advanced"),
    ("omad-keto-explained", "OMAD Keto: One Meal a Day Explained", "omad keto explained", "Advanced"),
    # Day 13
    ("keto-hair-loss-causes", "Keto Hair Loss: Causes and Prevention", "keto hair loss", "Side Effects"),
    ("keto-constipation-remedies", "Keto Constipation: Natural Remedies", "keto constipation", "Side Effects"),
    # Day 14
    ("keto-supplements-guide", "Keto Supplements: What Works and What Doesn't", "keto supplements", "Supplements"),
    ("mct-oil-keto-benefits", "MCT Oil Benefits for Keto Dieters", "mct oil benefits keto", "Supplements"),
    # Day 15
    ("keto-on-budget", "Keto on a Budget: Affordable Meal Planning", "keto on a budget", "Lifestyle"),
    ("eating-out-keto-guide", "Eating Out on Keto: Complete Guide", "eating out keto", "Lifestyle"),
    # Day 16
    ("keto-thyroid-hypothyroidism", "Keto and Thyroid: Hypothyroidism Considerations", "keto thyroid", "Medical"),
    ("keto-heart-health-facts", "Keto and Heart Health: Separating Fact from Fiction", "keto heart health", "Medical"),
    # Day 17
    ("keto-alcohol-guide", "Keto Alcohol: What Drinks Are Low-Carb?", "keto alcohol guide", "Lifestyle"),
    ("social-events-keto", "Social Events on Keto: Survival Guide", "social events keto", "Lifestyle"),
    # Day 18
    ("vegetarian-keto-india", "Vegetarian Keto: Complete Indian Guide", "vegetarian keto india", "Diets"),
    ("vegan-keto-plant-based", "Vegan Keto: Plant-Based Alternatives", "vegan keto guide", "Diets"),
    # Day 19
    ("keto-food-list-guide", "Keto Food List: The Ultimate Grocery Guide", "keto food list guide", "Preparation"),
    ("keto-pantry-essentials", "Keto Pantry Essentials: Stocking Your Kitchen", "keto pantry essentials", "Preparation"),
    # Day 20
    ("dirty-keto-vs-clean-keto", "Dirty Keto vs Clean Keto: Which Is Better?", "dirty keto vs clean keto", "Science"),
    ("keto-breakeven-point", "Keto Breakeven Point: When Does It Work?", "keto breakeven point", "Science"),
    # Day 21
    ("keto-and-sleep", "Keto and Sleep: Improving Your Rest", "keto sleep improvement", "Wellness"),
    ("stress-cortisol-keto", "Stress and Keto: Managing Cortisol Levels", "stress keto management", "Wellness"),
    # Day 22
    ("keto-skin-health", "Keto and Skin Health: The Gut-Skin Connection", "keto skin health", "Wellness"),
    ("keto-anti-aging-benefits", "Keto and Aging: Anti-Aging Benefits", "keto anti aging", "Wellness"),
    # Day 23
    ("keto-rash-treatment", "Keto Rash: Causes and Natural Treatments", "keto rash treatment", "Side Effects"),
    ("keto-brain-fog-solutions", "Keto Brain Fog: Causes and Solutions", "keto brain fog", "Side Effects"),
    # Day 24
    ("how-long-stay-on-keto", "How Long Should You Stay on Keto?", "how long stay on keto", "Advanced"),
    ("keto-maintenance-guide", "Keto Maintenance: Transitioning Off Safely", "keto maintenance", "Advanced"),
    # Day 25
    ("keto-cancer-research", "Keto and Cancer: What Research Says", "keto cancer research", "Medical"),
    ("keto-chronic-inflammation", "Keto and Inflammation: Reducing Chronic Pain", "keto inflammation", "Medical"),
    # Day 26
    ("keto-fat-bombs-recipes", "Fat Bombs on Keto: 15 High-Fat Snack Recipes", "keto fat bombs", "Recipes"),
    ("keto-sauces-dressings", "Keto Sauces and Dressings: Flavor Boosters", "keto sauces dressings", "Recipes"),
    # Day 27
    ("keto-mental-health-mood", "Keto and Mental Health: Mood Benefits", "keto mental health", "Wellness"),
    ("keto-energy-levels", "Keto and Energy Levels: All-Day Stable Power", "keto energy levels", "Wellness"),
    # Day 28
    ("keto-inflammation-science", "Keto and Inflammation: The Science", "keto inflammation science", "Science"),
    ("common-keto-mistakes", "Common Keto Mistakes and How to Avoid Them", "common keto mistakes", "Mistakes"),
    # Day 29
    ("tracking-keto-progress", "Tracking Your Progress on Keto", "tracking keto progress", "Monitoring"),
    ("keto-water-fasting", "Keto and Water Fasting: Enhanced Benefits", "keto water fasting", "Monitoring"),
    # Day 30
    ("keto-success-stories", "Keto Success Stories: Real People, Real Results", "keto success stories", "Motivation"),
    ("30-day-keto-transformation", "Your 30-Day Keto Transformation Starts Here", "30 day keto transformation", "Motivation"),
]


def load_log():
    """Load the publish log to track what's been published."""
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE) as f:
            return json.load(f)
    return {"published": [], "day_index": 0, "slot_index": 0}


def save_log(log):
    """Save the updated publish log."""
    with open(LOG_FILE, 'w') as f:
        json.dump(log, f, indent=2)


def get_published_links():
    """Get list of already published page URLs for internal linking."""
    log = load_log()
    base_url = "https://keto-calculator.vercel.app"
    links = []
    for p in log.get("published", []):
        slug = p["slug"]
        links.append({
            "slug": slug,
            "url": f"{base_url}/{slug}",
            "title": p["title"]
        })
    return links


def generate_article_ollama(slug, title, keyword, category):
    """Generate SEO article using Ollama API with minimax-m2.7:cloud."""
    
    prompt = f"""You are an expert SEO content writer specializing in ketogenic diets. Write a comprehensive 2000+ word blog post for the keyword: '{keyword}'.

STYLE REQUIREMENTS:
- Primary keyword MUST appear in the first sentence
- H1 = exact match of the primary keyword
- No "Introduction" heading — go straight into the content
- Use H2 and H3 subheadings that include related LSI keywords
- Include 5+ FAQ questions at the end with detailed answers
- Add a CTA section linking to the keto calculator
- Tone: authoritative, trustworthy, expert consultant voice
- Word count: minimum 2000 words
- Include internal links to previously published related pages when contextually relevant

STRUCTURE:
1. Hook opening with the primary keyword in first sentence
2. What is [keyword]? (explain the concept deeply)
3. The Science Behind [keyword] (backed by research)
4. How to [do the main action] (step by step)
5. Common Mistakes to Avoid
6. Benefits of [keyword]
7. FAQ Section (minimum 5 questions)
8. CTA to use the calculator

Write the full article now. Start directly with the content."""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "minimax-m2.7:cloud",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "num_predict": 2500
                }
            },
            timeout=120
        )
        if response.status_code == 200:
            return response.json().get("response", "")
        else:
            print(f"Ollama API error: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error generating article: {e}")
        return None


def create_page_file(slug, title, keyword, category, content, internal_links):
    """Create the Next.js page file with proper SEO structure and internal links."""
    
    # Build internal links HTML
    links_html = ""
    for link in internal_links[:4]:  # Max 4 internal links
        links_html += f'<Link href="/{link["slug"]}" className="text-orange-600 hover:underline">→ {link["title"]}</Link>\n                '
    
    page_path = f"{SITE_DIR}/app/{slug}/page.tsx"
    os.makedirs(f"{SITE_DIR}/app/{slug}", exist_ok=True)
    
    # Convert markdown-ish content to JSX-safe format
    # This is a simplified version - in production you'd want a proper MD converter
    content_html = content.replace('"', '\\"').replace('\n', '\\n')
    
    page_content = f'''import Link from "next/link"
import {{ Calculator, ArrowLeft, CheckCircle, AlertCircle, Clock, Users, Flame, TrendingDown }} from "lucide-react"
import {{ Card, CardContent, CardDescription, CardHeader, CardTitle }} from "@/components/ui/card"
import {{ Badge }} from "@/components/ui/badge"
import {{ Button }} from "@/components/ui/button"
import {{ SchemaMarkup }} from "@/components/schema-markup"
import {{ Breadcrumbs }} from "@/components/breadcrumbs"

export const metadata = {{
  title: "{title}",
  description: "Learn everything about {keyword} with our comprehensive 2026 guide. Expert-backed advice, meal plans, and tips for success on the ketogenic diet.",
  keywords: "{keyword}, ketogenic diet, keto guide, low carb, {keyword} keto, keto {keyword.replace(" ", " ")}",
}}

export default function {slug.replace("-", "").title().replace("", "").replace("Keto", "K").replace("Guide", "G").replace("Diet", "D")}Page() {{
  return (
    <>
      <SchemaMarkup
        type="Article"
        title="{{title}}"
        description="Learn everything about {keyword} with our comprehensive guide."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs items={[
            {{ label: "Home", href: "/" }},
            {{ label: "Guides", href: "/guides" }},
            {{ label: "{category}", href: "/guides/{category.lower().replace(" ", "-")}" }},
          ]}} />
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">
              {`{content[:2000]}`}
            </div>
          </div>
          
          <Card className="mt-8 mb-8 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Continue Reading</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {links_html}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-8">
            <CardContent className="pt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Calculate Your Keto Macros?</h3>
              <p className="mb-6 opacity-90">Use our free keto calculator to find your personalized targets.</p>
              <Link href="/">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  <Calculator className="w-5 h-5 mr-2" /> Try Our Free Calculator
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}}
'''
    
    with open(page_path, 'w') as f:
        f.write(page_content)
    
    return page_path


def update_sitemap():
    """Update the sitemap.ts file with all published pages."""
    log = load_log()
    base_url = "https://keto-calculator.vercel.app"
    
    sitemap_lines = [
        "import { MetadataRoute } from 'next'",
        "",
        "export default function sitemap(): MetadataRoute.Sitemap {",
        "  const routes: MetadataRoute.Sitemap = [",
        "    {",
        f'      url: "{base_url}",',
        "      lastModified: new Date(),",
        "      changeFrequency: 'daily',",
        "      priority: 1,",
        "    },",
    ]
    
    for p in log.get("published", []):
        slug = p["slug"]
        routes_line = f"""    {{
      url: "{base_url}/{slug}",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }},"""
        sitemap_lines.append(routes_line)
    
    sitemap_lines.extend([
        "  ]",
        "",
        "  return routes",
        "}",
    ])
    
    sitemap_path = f"{SITE_DIR}/app/sitemap.ts"
    with open(sitemap_path, 'w') as f:
        f.write('\n'.join(sitemap_lines))
    
    return sitemap_path


def git_commit_push(message):
    """Commit changes and push to GitHub."""
    subprocess.run(["git", "add", "."], cwd=SITE_DIR, capture_output=True)
    subprocess.run(["git", "commit", "-m", message], cwd=SITE_DIR, capture_output=True)
    result = subprocess.run(
        ["git", "push", "origin", "main"],
        cwd=SITE_DIR,
        capture_output=True,
        text=True
    )
    return result.returncode == 0


def run():
    """Main execution: generate next article and publish."""
    log = load_log()
    now = datetime.now()
    print(f"\n[{now.strftime('%Y-%m-%d %H:%M:%S')}] Auto-publisher running...")
    
    # Find next unpublished article
    total_slots = len(CONTENT_PLAN)
    current_index = log.get("slot_index", 0)
    
    if current_index >= total_slots:
        print("All articles have been published!")
        return
    
    slug, title, keyword, category = CONTENT_PLAN[current_index]
    
    # Skip if already published
    published_slugs = [p["slug"] for p in log.get("published", [])]
    if slug in published_slugs:
        print(f"Article {slug} already published, skipping.")
        log["slot_index"] = current_index + 1
        save_log(log)
        return
    
    print(f"Generating article: {title}")
    
    # Generate content using AI
    content = generate_article_ollama(slug, title, keyword, category)
    
    if not content:
        print("Failed to generate article content, will retry next run.")
        return
    
    # Get internal links from previously published pages
    internal_links = get_published_links()
    
    # Create the page file
    page_path = create_page_file(slug, title, keyword, category, content, internal_links)
    print(f"Created page: {page_path}")
    
    # Update sitemap
    sitemap_path = update_sitemap()
    print(f"Updated sitemap: {sitemap_path}")
    
    # Commit and push
    commit_msg = f"Published: {title} | SEO Article | {keyword}"
    if git_commit_push(commit_msg):
        # Update log only after successful push
        log["published"].append({
            "slug": slug,
            "title": title,
            "keyword": keyword,
            "category": category,
            "published_at": now.isoformat()
        })
        log["slot_index"] = current_index + 1
        save_log(log)
        print(f"✅ Successfully published: {title}")
    else:
        print("⚠️ Git push failed, will retry next run.")


if __name__ == "__main__":
    run()
