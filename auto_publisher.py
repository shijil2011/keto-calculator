#!/usr/bin/env python3
"""
Keto Calculator Auto-Publisher v4
- Generates articles on-demand using Ollama AI
- Dynamic internal links from previously published pages
- Auto-updates sitemap after every publication
- SEO meta title (<60 chars) and meta description (<160 chars)
- Runs via crontab: 8 AM and 5 PM daily
"""

import os, json, requests, subprocess
from datetime import datetime

SITE_DIR = "/root/.openclaw/workspace/keto-calculator"
LOG_FILE = f"{SITE_DIR}/publish_log.json"
TEMPLATE_FILE = f"{SITE_DIR}/page_template.txt"
OLLAMA_URL = "http://localhost:11434/api/generate"
BASE_URL = "https://keto-calculator.vercel.app"

CONTENT_PLAN = [
    ("keto-diet-for-beginners", "Keto Diet for Beginners: The Complete 2026 Guide", "keto diet for beginners", "Getting Started"),
    ("how-to-start-keto", "How to Start Keto: A Step-by-Step Beginners Guide", "how to start keto", "Getting Started"),
    ("keto-macros-calculator", "Keto Macros Calculator: Find Your Perfect Ratio", "keto macros calculator", "Calculators & Basics"),
    ("net-carbs-ultimate-guide", "Understanding Net Carbs: The Ultimate Guide", "net carbs guide", "Calculators & Basics"),
    ("keto-weight-loss-guide", "Keto Weight Loss: How It Works and What to Expect", "keto weight loss", "Weight Loss"),
    ("keto-safety-myths-facts", "Is Keto Safe? Common Myths and Facts Debunked", "keto safety myths", "Weight Loss"),
    ("7-day-keto-meal-plan", "7-Day Keto Meal Plan for Beginners", "7 day keto meal plan", "Meal Plans"),
    ("14-day-keto-diet-plan", "14-Day Keto Diet Plan: Full Two-Week Menu", "14 day keto diet plan", "Meal Plans"),
    ("best-keto-snacks", "Best Keto Snacks: 20 Low-Carb Options", "best keto snacks", "Food & Snacks"),
    ("keto-fast-food-india", "Keto-Friendly Fast Food Options in India", "keto fast food india", "Food & Snacks"),
    ("keto-flu-symptoms-remedies", "Keto Flu: Symptoms, Duration, and Remedies", "keto flu remedies", "Health & Science"),
    ("electrolytes-keto-guide", "Electrolytes on Keto: Why They Matter", "electrolytes keto", "Health & Science"),
    ("keto-breakfast-ideas", "Keto Breakfast Ideas: 25 Quick and Delicious Recipes", "keto breakfast ideas", "Recipes"),
    ("keto-lunch-ideas", "Keto Lunch Ideas: 20 Work-From-Home Meals", "keto lunch ideas", "Recipes"),
    ("keto-dinner-recipes", "Keto Dinner Recipes: 20 Healthy Indian-Inspired Dishes", "keto dinner recipes", "Recipes"),
    ("keto-desserts-recipes", "Keto Desserts: 15 Guilt-Free Sweet Treats", "keto desserts", "Recipes"),
    ("keto-and-exercise", "Keto and Exercise: The Truth About Working Out", "keto exercise guide", "Fitness"),
    ("keto-athletes-performance", "Can Athletes Do Keto? Performance Guide", "keto athletes", "Fitness"),
    ("keto-women-over-40", "Keto for Women Over 40: Hormones and Health", "keto women over 40", "Special Groups"),
    ("pcos-keto-diet", "PCOS and Keto: A Scientific Perspective", "pcos keto diet", "Special Groups"),
    ("keto-diabetes-blood-sugar", "Keto and Diabetes: Blood Sugar Management", "keto diabetes guide", "Medical"),
    ("keto-cholesterol-truth", "Keto and Cholesterol: What the Science Says", "keto cholesterol", "Medical"),
    ("intermittent-fasting-keto", "Intermittent Fasting on Keto: The Perfect Combination", "intermittent fasting keto", "Advanced"),
    ("omad-keto-explained", "OMAD Keto: One Meal a Day Explained", "omad keto explained", "Advanced"),
    ("keto-hair-loss-causes", "Keto Hair Loss: Causes and Prevention", "keto hair loss", "Side Effects"),
    ("keto-constipation-remedies", "Keto Constipation: Natural Remedies", "keto constipation", "Side Effects"),
    ("keto-supplements-guide", "Keto Supplements: What Works and What Doesn't", "keto supplements", "Supplements"),
    ("mct-oil-keto-benefits", "MCT Oil Benefits for Keto Dieters", "mct oil benefits keto", "Supplements"),
    ("keto-on-budget", "Keto on a Budget: Affordable Meal Planning", "keto on a budget", "Lifestyle"),
    ("eating-out-keto-guide", "Eating Out on Keto: Complete Guide", "eating out keto", "Lifestyle"),
    ("keto-thyroid-hypothyroidism", "Keto and Thyroid: Hypothyroidism Considerations", "keto thyroid", "Medical"),
    ("keto-heart-health-facts", "Keto and Heart Health: Separating Fact from Fiction", "keto heart health", "Medical"),
    ("keto-alcohol-guide", "Keto Alcohol: What Drinks Are Low-Carb?", "keto alcohol guide", "Lifestyle"),
    ("social-events-keto", "Social Events on Keto: Survival Guide", "social events keto", "Lifestyle"),
    ("vegetarian-keto-india", "Vegetarian Keto: Complete Indian Guide", "vegetarian keto india", "Diets"),
    ("vegan-keto-plant-based", "Vegan Keto: Plant-Based Alternatives", "vegan keto guide", "Diets"),
    ("keto-food-list-guide", "Keto Food List: The Ultimate Grocery Guide", "keto food list guide", "Preparation"),
    ("keto-pantry-essentials", "Keto Pantry Essentials: Stocking Your Kitchen", "keto pantry essentials", "Preparation"),
    ("dirty-keto-vs-clean-keto", "Dirty Keto vs Clean Keto: Which Is Better?", "dirty keto vs clean keto", "Science"),
    ("keto-breakeven-point", "Keto Breakeven Point: When Does It Work?", "keto breakeven point", "Science"),
    ("keto-and-sleep", "Keto and Sleep: Improving Your Rest", "keto sleep improvement", "Wellness"),
    ("stress-cortisol-keto", "Stress and Keto: Managing Cortisol Levels", "stress keto management", "Wellness"),
    ("keto-skin-health", "Keto and Skin Health: The Gut-Skin Connection", "keto skin health", "Wellness"),
    ("keto-anti-aging-benefits", "Keto and Aging: Anti-Aging Benefits", "keto anti aging", "Wellness"),
    ("keto-rash-treatment", "Keto Rash: Causes and Natural Treatments", "keto rash treatment", "Side Effects"),
    ("keto-brain-fog-solutions", "Keto Brain Fog: Causes and Solutions", "keto brain fog", "Side Effects"),
    ("how-long-stay-on-keto", "How Long Should You Stay on Keto?", "how long stay on keto", "Advanced"),
    ("keto-maintenance-guide", "Keto Maintenance: Transitioning Off Safely", "keto maintenance", "Advanced"),
    ("keto-cancer-research", "Keto and Cancer: What Research Says", "keto cancer research", "Medical"),
    ("keto-chronic-inflammation", "Keto and Inflammation: Reducing Chronic Pain", "keto inflammation", "Medical"),
    ("keto-fat-bombs-recipes", "Fat Bombs on Keto: 15 High-Fat Snack Recipes", "keto fat bombs", "Recipes"),
    ("keto-sauces-dressings", "Keto Sauces and Dressings: Flavor Boosters", "keto sauces dressings", "Recipes"),
    ("keto-mental-health-mood", "Keto and Mental Health: Mood Benefits", "keto mental health", "Wellness"),
    ("keto-energy-levels", "Keto and Energy Levels: All-Day Stable Power", "keto energy levels", "Wellness"),
    ("keto-inflammation-science", "Keto and Inflammation: The Science", "keto inflammation science", "Science"),
    ("common-keto-mistakes", "Common Keto Mistakes and How to Avoid Them", "common keto mistakes", "Mistakes"),
    ("tracking-keto-progress", "Tracking Your Progress on Keto", "tracking keto progress", "Monitoring"),
    ("keto-water-fasting", "Keto and Water Fasting: Enhanced Benefits", "keto water fasting", "Monitoring"),
    ("keto-success-stories", "Keto Success Stories: Real People, Real Results", "keto success stories", "Motivation"),
    ("30-day-keto-transformation", "Your 30-Day Keto Transformation Starts Here", "30 day keto transformation", "Motivation"),
]


def load_log():
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE) as f:
            return json.load(f)
    return {"published": [], "slot_index": 0}

def save_log(log):
    with open(LOG_FILE, 'w') as f:
        json.dump(log, f, indent=2)

def get_published_links():
    log = load_log()
    return [{"slug": p["slug"], "url": f"{BASE_URL}/{p['slug']}", "title": p["title"]} for p in log.get("published", [])]

def load_template():
    with open(TEMPLATE_FILE) as f:
        return f.read()

def generate_article_ai(slug, title, keyword, category):
    # Step 1: Generate SEO meta title & description
    meta_prompt = f'Generate SEO meta title (max 60 chars) and meta description (max 160 chars) for: "{keyword}". Format exactly as: TITLE: [title]|DESC: [desc]'
    meta_title, meta_desc = title[:60], f"Expert guide to {keyword}. Meal plans, tips, and science-backed advice for ketogenic diet success."
    try:
        r = requests.post(OLLAMA_URL, json={
            "model": "minimax-m2.7:cloud",
            "prompt": meta_prompt,
            "stream": False,
            "options": {"temperature": 0.5, "num_predict": 80}
        }, timeout=60)
        if r.status_code == 200:
            raw = r.json().get("response", "")
            for line in raw.split("\n"):
                if line.startswith("TITLE:") or "TITLE:" in line:
                    t = line.split("TITLE:")[-1].strip()
                    if 10 < len(t) <= 60:
                        meta_title = t
                if line.startswith("DESC:") or "DESC:" in line:
                    d = line.split("DESC:")[-1].strip()
                    if 50 < len(d) <= 160:
                        meta_desc = d
    except Exception as e:
        print(f"Meta gen error: {e}")

    # Step 2: Generate article content
    content_prompt = f'''Write a 2000+ word SEO article for keyword: "{keyword}". Title: "{title}".

Requirements:
1. First sentence MUST contain the keyword "{keyword}"
2. Use H2 and H3 subheadings naturally
3. Include 5+ FAQ entries at the end
4. Expert authoritative tone
5. Minimum 2000 words
6. Include internal links to related topics naturally

Start directly with content.'''
    content = None
    try:
        r = requests.post(OLLAMA_URL, json={
            "model": "minimax-m2.7:cloud",
            "prompt": content_prompt,
            "stream": False,
            "options": {"temperature": 0.7, "num_predict": 2500}
        }, timeout=120)
        if r.status_code == 200:
            content = r.json().get("response", "")
    except Exception as e:
        print(f"Content gen error: {e}")

    return meta_title[:60], meta_desc[:160], content

def create_page(slug, title, keyword, category, content, meta_title, meta_desc, internal_links):
    page_path = f"{SITE_DIR}/app/{slug}/page.tsx"
    os.makedirs(f"{SITE_DIR}/app/{slug}", exist_ok=True)

    tmpl = load_template()

    # Build function name
    fn_name = slug.replace("-", "").title().replace("", "")

    # Meta keywords
    meta_kw = f"{keyword}, ketogenic diet, keto guide, low carb"

    # Internal links section
    if internal_links:
        links_html = '          <Card className="mt-8 mb-8 border-orange-200 bg-orange-50">\n'
        links_html += '            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-4 h-4 text-orange-600" /> Continue Reading</CardTitle></CardHeader>\n'
        links_html += '            <CardContent><div className="grid md:grid-cols-2 gap-3">\n'
        for link in internal_links[:4]:
            links_html += f'              <Link href="/{link["slug"]}" className="text-orange-600 hover:underline flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> {link["title"]}</Link>\n'
        links_html += '            </div></CardContent>\n'
        links_html += '          </Card>\n'
    else:
        links_html = ""

    # Page content - escape for JSX
    safe_content = (content or "Content coming soon.")[:3000]
    safe_content = safe_content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    # Replace placeholders in template
    page_code = tmpl
    page_code = page_code.replace("PAGE_IMPORTS",
        'import Link from "next/link"\n'
        'import { Calculator, ArrowLeft, CheckCircle, AlertCircle, Clock, Users, Flame, TrendingDown, BookOpen } from "lucide-react"\n'
        'import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"\n'
        'import { Badge } from "@/components/ui/badge"\n'
        'import { Button } from "@/components/ui/button"\n'
        'import { SchemaMarkup } from "@/components/schema-markup"\n'
        'import { Breadcrumbs } from "@/components/breadcrumbs"'
    )
    page_code = page_code.replace("META_TITLE", meta_title[:60].replace('"', "'"))
    page_code = page_code.replace("META_DESC", meta_desc[:160].replace('"', "'"))
    page_code = page_code.replace("META_KEYWORDS", meta_kw)
    page_code = page_code.replace("PAGE_FUNCTIONNAME", fn_name + "Page")
    page_code = page_code.replace("PAGE_TITLE", title)
    page_code = page_code.replace("PAGE_KEYWORD", keyword)
    page_code = page_code.replace("PAGE_CATEGORY", category)
    page_code = page_code.replace("PAGE_CAT_SLUG", category.lower().replace(" & ", "-").replace(" ", "-"))
    page_code = page_code.replace("PAGE_CONTENT", safe_content)
    page_code = page_code.replace("PAGE_INTERNAL_LINKS", links_html)

    with open(page_path, 'w') as f:
        f.write(page_code)
    return page_path

def update_sitemap():
    log = load_log()
    lines = [
        "import { MetadataRoute } from 'next'\n",
        "export default function sitemap(): MetadataRoute.Sitemap {",
        "  const routes: MetadataRoute.Sitemap = [",
        f'    {{ url: "{BASE_URL}", lastModified: new Date(), changeFrequency: "daily", priority: 1 }},',
    ]
    for p in log.get("published", []):
        lines.append(f'    {{ url: "{BASE_URL}/{p["slug"]}", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 }},')
    lines.extend(["  ]", "  return routes", "}"])
    with open(f"{SITE_DIR}/app/sitemap.ts", 'w') as f:
        f.write('\n'.join(lines))

def git_push(msg):
    subprocess.run(["git", "add", "."], cwd=SITE_DIR, capture_output=True)
    r = subprocess.run(["git", "commit", "-m", msg], cwd=SITE_DIR, capture_output=True)
    if r.returncode != 0:
        return False
    pr = subprocess.run(["git", "push", "origin", "main"], cwd=SITE_DIR, capture_output=True)
    return pr.returncode == 0

def run():
    log = load_log()
    now = datetime.now()
    idx = log.get("slot_index", 0)
    if idx >= len(CONTENT_PLAN):
        print(f"[{now}] All 60 articles published!")
        return
    slug, title, keyword, category = CONTENT_PLAN[idx]
    if slug in [p["slug"] for p in log.get("published", [])]:
        log["slot_index"] = idx + 1
        save_log(log)
        return
    print(f"\n[{now}] Generating: {title}")
    print(f"  Keyword: {keyword}")
    print(f"  Category: {category}")
    mt, md, content = generate_article_ai(slug, title, keyword, category)
    if not content:
        print("  FAILED: No content from AI")
        return
    print(f"  Content: {len(content)} chars | Meta: {mt[:50]}")
    il = get_published_links()
    create_page(slug, title, keyword, category, content, mt, md, il)
    update_sitemap()
    if git_push(f"Published: {title} | {keyword}"):
        log["published"].append({
            "slug": slug, "title": title, "keyword": keyword,
            "category": category, "meta_title": mt, "meta_desc": md,
            "url": f"{BASE_URL}/{slug}", "published_at": now.isoformat()
        })
        log["slot_index"] = idx + 1
        save_log(log)
        print(f"  LIVE: {BASE_URL}/{slug}")
    else:
        print("  FAILED: Git push error")

if __name__ == "__main__":
    run()
