import Script from "next/script"

interface FAQItem {
  question: string
  answer: string
}

interface SchemaMarkupProps {
  type: "website" | "article" | "faq" | "webapp" | "howto"
  title?: string
  description?: string
  url?: string
  faqs?: FAQItem[]
  steps?: string[]
}

export function SchemaMarkup({ type, title, description, url, faqs, steps }: SchemaMarkupProps) {
  const getSchema = () => {
    const baseUrl = "https://ketocalculator.vercel.app"

    switch (type) {
      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Keto Calculator",
          description: "Free Keto Calculator to find your perfect macros for fat loss, maintenance, or muscle gain.",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
          publisher: {
            "@type": "Organization",
            name: "Keto Calculator",
            url: baseUrl,
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
        }

      case "webapp":
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Keto Macro Calculator",
          description:
            "Calculate your personalized ketogenic diet macronutrients based on your goals and activity level.",
          url: `${baseUrl}/#calculator`,
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Calculate daily calories using TDEE formula",
            "Determine optimal keto macro ratios",
            "Support for metric and imperial units",
            "Personalized results based on goals",
            "Interactive charts and visualizations",
          ],
        }

      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          url: url,
          author: {
            "@type": "Organization",
            name: "Keto Calculator",
          },
          publisher: {
            "@type": "Organization",
            name: "Keto Calculator",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs?.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }

      case "howto":
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: title,
          description: description,
          step: steps?.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text: step,
          })),
        }

      default:
        return null
    }
  }

  const schema = getSchema()

  if (!schema) return null

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
