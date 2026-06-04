# Being Instruments India Website Structure Outline

This document summarizes the current website structure, content flow, functional modules, data sources, and reusable prompt requirements for rebuilding or modifying the site.

## 1. Project Overview

- Website name: Being Instruments India / Being India
- Purpose: Corporate and product website for laboratory instruments, scientific equipment, service requests, price enquiries, and customer engagement.
- Framework: Next.js App Router
- UI stack: React 19, Next.js 16, Tailwind CSS, React Icons, Lucide, GSAP
- Backend/API layer: Next.js API routes
- Data/storage integrations: MongoDB, Nodemailer email delivery, OTP verification for some enquiry flows
- Main audience:
  - Pharmaceutical and biotechnology labs
  - Life sciences and clinical research labs
  - Hospitals and diagnostics
  - Universities and academic research institutes
  - Food, agriculture, chemical, petrochemical, materials, electronics, automotive, aerospace, and quality testing labs
  - Dealers and channel partners

## 2. Global Website Layout

Every main page is wrapped by `src/app/layout.js`.

Global elements:

- Fixed header navigation
- Footer with contact details, quick links, product links, social links, privacy policy, and terms links
- Product context provider
- Scroll-to-top behavior
- Chat modal launcher
- Last viewed product reminder
- Google Tag Manager

Global SEO metadata:

- Default title: Being Instruments India | Laboratory Equipment Supplier | Hyderabad
- Default description: Authorized distributor of BEING laboratory equipment, including CO2 incubators, vacuum ovens, ULT freezers, BSCs, rotary evaporators, and more.
- Keywords focus on laboratory equipment supplier in Hyderabad/India, scientific instruments, CO2 incubators, ovens, ULT freezers, biosafety cabinets, rotary evaporators, and distributor terms.

## 3. Navigation Structure

Header menu:

- Home: `/`
- About Us: `/about-us`
- Products: `/products`
- Events: `/events`
- Contact Us: `/contact-us`

Footer quick links:

- Home
- Contact Us
- About Us
- Products
- Events
- Blogs

Footer product links:

- Ovens: `/products/laboratory-ovens`
- Incubators: `/products/incubators`
- Chillers: `/products/chillers`
- Rotary Evaporators: `/products/rotary-evaporators`
- Water Baths: `/products/water-baths`
- Pumps: `/products/pumps`
- Safety Cabinets: `/products/biological-safety-cabinets`
- Freezers: `/products/freezers`
- Muffle Furnace: `/products/muffle-furnace`

Footer legal links:

- Privacy Policy: `/privacy-policy`
- Terms and Conditions: `/terms-and-conditions`

Social links:

- LinkedIn
- Instagram
- Facebook
- X/Twitter

## 4. Route Map

Public pages:

- `/` - Home page
- `/about-us` - About page
- `/products` - Product catalogue landing page
- `/products/[category]` - Product category page
- `/products/[category]/[subcategory]` - Subcategory-level product browsing
- `/products/[category]/[subcategory]/[model]` - Product detail page
- `/events` - Events page
- `/blogs` - Blogs page, currently using placeholder/sample blog content
- `/customers` - Customer listing page
- `/contact-us` - Contact page
- `/thank-you` - Thank-you page after successful submissions
- `/privacy-policy` - Privacy policy page
- `/terms-and-conditions` - Terms and conditions page
- `/sitemap.xml` - Sitemap route

API routes:

- `/api/products` - Builds a searchable flat product catalogue from category API files
- `/api/products/[category]` - Category-specific product data
- `/api/products/related` - Related product suggestions
- `/api/contact` - Contact form submission
- `/api/enquiry` - Product enquiry submission
- `/api/priceEnquiry` - Price enquiry submission
- `/api/service` - Service request submission
- `/api/serviceRenewal` - Service/AMC renewal submission
- `/api/exclusivePatner` - Exclusive partner request submission
- `/api/chat` - Chat modal enquiry submission
- `/api/subscribe` - Subscription endpoint
- `/api/subscription` - Subscription endpoint
- `/api/send-otp` - OTP send endpoint
- `/api/verify-otp` - OTP verification endpoint
- `/api/mail-health` - Email health check
- `/api/db-check` - MongoDB/OTP collection health check

## 5. Home Page Structure

File: `src/app/page.js`

Home sections, in order:

1. Hero section
   - Component: `HeroOne`
   - Message: Being India, Scientific Solutions
   - Includes animated typing, logo/product imagery, and search entry point.

2. Category tabs
   - Component: `Categories`
   - Highlights product categories and lets users enter product families quickly.

3. Picks for you
   - Component: `PicksForYou`
   - Fetches `/api/products`
   - Shows curated product cards with tags, rating-style display, pagination, and category/tag filters.

4. Quick links
   - Component: `QuickLinks`
   - Three main quick actions:
     - Exclusive Partner
     - Buy AMC
     - Service
   - Opens modal forms for partnership/service/AMC requests.

5. About preview
   - Component: `About`
   - Uses statistics and feature highlights to introduce Being India.

6. Customers preview
   - Component: `Customers`
   - Shows customer trust/social proof.

7. Testimonials
   - Component: `Testimonials`
   - Rotating testimonial cards.

8. Blogs/events preview
   - Component: `Blogs`
   - Shows blog/event style promotional content and CTAs.

Home visual style:

- Blue gradient background
- Product-focused imagery
- Rounded cards, animated elements, and bold headings
- Search and quick-action CTAs are central to conversion

## 6. About Page Structure

Route: `/about-us`

Page components:

- `AboutHero`
- `AboutPage`

Content sections:

1. Story in one line
   - Global engineering with local Indian support.

2. Where we come from
   - BEING Technology background
   - Shanghai headquarters
   - 20+ years of product and manufacturing experience
   - 30,000 sq. metre manufacturing facility
   - 100+ product lines
   - 200+ patents
   - ISO 9001, ISO 13485, CE, and selected UL certifications

3. Facility overview
   - Headquarters image
   - Manufacturing floor image
   - Quality, testing, and R&D image

4. Why Being India exists
   - Faster quotations
   - Better application advice
   - Installation support
   - Training
   - AMC support
   - Local spare availability

5. Backed by Inkarp
   - Being India is positioned as an Inkarp Group company
   - Inkarp network, application team, service strength, and national relationships are part of the value proposition.

6. India footprint
   - 742 customer accounts
   - 1,789 instruments installed
   - 25 states and union territories
   - India map visual

7. What we offer
   - Sample Preparation and Processing
   - Material Characterization and Testing
   - Cell and Microbiology Research
   - Cleanroom and Contamination Control
   - Cold Storage and Sample Preservation

8. Industries served
   - Pharma, biotech, life sciences, hospitals, academia, food, chemicals, electronics, automotive, aerospace, materials testing, environmental, quality, packaging labs

9. Why labs choose us
   - Trusted Indian footprint
   - Engineering background
   - Certifications
   - Total solution support
   - Installation, validation, training, AMC/CMC, spares
   - Honest pricing and timelines

10. Promise
   - Not just equipment sales, but long-term support.

## 7. Product Catalogue Structure

Main products page:

- Route: `/products`
- Component: `src/app/products/Products.jsx`
- Data source: `/api/products`

Products page behavior:

- Fetches all products from `/api/products`
- Groups them by category and subcategory
- Left sidebar category filter
- Search input for products/models
- Product family cards showing:
  - Subcategory name
  - Parent category
  - Model count
  - Model labels
  - Link to first available product/detail path

Dynamic product route:

- Route pattern: `/products/[...slug]`
- Category route: `/products/[category]`
- Product route: `/products/[category]/[subcategory]/[model]`
- Product pages generate SEO metadata dynamically
- Product detail pages include JSON-LD product schema

Product data architecture:

- Category slugs are defined in `src/lib/productCategories.js`
- Product category loaders are mapped in `src/app/products/[...slug]/productData.js`
- Category aliases handle common spelling/path mistakes:
  - `cabinet`, `cabinets`, `safety-cabinets` map to `biological-safety-cabinets`
  - `biological-saftey-cabinets` maps to `biological-safety-cabinets`
  - `muffle-furnance` maps to `muffle-furnace`

## 8. Product Categories and Subcategories

1. Laboratory Ovens
   - Slug: `laboratory-ovens`
   - Subcategories:
     - Laboratory Drying Oven, LCD, up to 250 C
     - Laboratory Drying Oven, Touch, up to 300 C
     - Vacuum Oven, LED display
     - Vacuum Oven, Touch Control

2. Incubators
   - Slug: `incubators`
   - Subcategories:
     - Shaking Incubators
     - CO2 Incubator, Moist Heat, 90 C
     - CO2 Incubator, Dry Heat, 180 C
     - CO2 Incubator, UV Sterilization
     - Cooling Incubator, Peltier
     - Cooling Incubator
     - Shaking Incubator, Floor, Chest type
     - Large Shaking Incubator, Vertical Floor
     - Heating Incubators
     - Stackable Incubated Refrigerated Shaker with CO2
     - CO2 Incubator, Tri-Gas

3. Biological Safety Cabinets
   - Slug: `biological-safety-cabinets`
   - Subcategories:
     - Biological Safety Cabinet Class II A2
     - Vertical Laminar Airflow Cabinet

4. Pumps
   - Slug: `pumps`
   - Subcategories:
     - Vacuum Pump, Oil-sealed
     - Diaphragm Pump

5. Rotary Evaporators
   - Slug: `rotary-evaporators`
   - Subcategories:
     - Rotary Evaporator, up to 185 C Bath
     - Rotary Evaporator Controller

6. Water Baths
   - Slug: `water-baths`
   - Subcategories:
     - Digital Water Baths

7. Freezers
   - Slug: `freezers`
   - Subcategories:
     - Combined Refrigerator and Deep Freezer
     - Laboratory Refrigerator, 2-8 C
     - Deep Freezer, -25 C
     - Deep Freezer, -40 C
     - Ultra-Low Temperature Freezer, -86 C

8. Chillers
   - Slug: `chillers`
   - Subcategories:
     - High Temperature Chiller, -10 C/-40 C to +150 C
     - Recirculating Chiller, -10 C to +100 C
     - Recirculating Chiller, -20 C to +20 C

9. Muffle Furnace
   - Slug: `muffle-furnace`
   - Subcategories:
     - High-Temperature Muffle Furnace

## 9. Product Detail Page Requirements

A complete product detail page should contain:

- Product name/title
- Product category and subcategory breadcrumb
- Product image/thumbnail
- Model number
- Short overview
- Key features
- Safety features
- Application/use cases
- Technical specifications table
- Installation and service information
- Related model suggestions
- Model comparison option
- Price enquiry CTA
- General enquiry CTA
- Service/AMC CTA where relevant
- SEO metadata:
  - title
  - description
  - keywords
  - canonical URL
  - Open Graph image/title/description
  - JSON-LD Product schema

Existing product components:

- `ModelClient` - product detail rendering
- `CategoryClient` - category/subcategory rendering
- `ProductTabContent` - tabbed product content
- `ProductsTab` - tab navigation
- `ProductActionSection` - CTA/action area
- `ProductComparisonModal` - compare two products/models
- `RelatedModels` - related product cards
- `PriceEnquiryForm` - quote/price modal
- `EnquiryModal` - product enquiry modal with OTP support

## 10. Contact Page Structure

Route: `/contact-us`

Page components:

- `ContactBanner`
- `ContactDetails`
- `Form`

Contact banner:

- Heading: Contact Us
- Supporting text: Connect with Being for product enquiries, service support, and guidance.

Contact details:

- Office hours: Mon-Fri, 09:30AM-05:30PM
- Main phone: +91 9966634008
- Main email: info@beinglab.co.in
- Location: Nacharam, Habsiguda, Hyderabad, Telangana, 500076

Reach Us cards:

- Service and Support: +91 7330731315
- Dispatch Support: +91 9515365959
- Application Support: +91 9100712689

Contact form:

- Collects user/company/contact/location/message details
- Sends to `/api/contact`
- Captures tracking data such as page URL, referrer, traffic source, device type, and IP where available

## 11. Events Page Structure

Route: `/events`

Page components:

- `Banner`
- `Events`

Current event:

- Title: Mumbai Analytica
- Date: April 22, 2026
- Location: Mumbai
- Description: Being connected with researchers, laboratory professionals, and industry experts, showcased scientific instruments, discussed laboratory needs, and presented solutions for research, QC, and analytical workflows.
- Assets:
  - Main event image
  - Event collage image

Recommended future event structure:

- Event title
- Date
- Location
- Description
- Main image
- Gallery/collage
- CTA if registration is open
- Post-event summary after completion

## 12. Blogs Page Structure

Route: `/blogs`

Current state:

- Page includes `Banner` and `Blog`
- Blog content is currently placeholder/sample style content
- A more complete blog grid component exists but is commented/not active in the page.

Recommended blog structure:

- Blog landing banner
- Category filter
- Search/filter by topic
- Blog cards with image, date, title, excerpt, and read-more link
- Individual blog detail pages if content expands
- Topics:
  - Product buying guides
  - Application notes
  - Lab maintenance
  - CO2 incubator selection
  - Vacuum oven selection
  - ULT freezer best practices
  - Biosafety cabinet safety
  - Rotary evaporator workflow guides

## 13. Customers Page Structure

Route: `/customers`

Component: `CustomersList`

Customer categories:

- Academia-Government
- Academia-Private
- Government
- Private
- Dealer

Behavior:

- Desktop category tabs
- Mobile category dropdown
- Customer grid
- Hover tooltip shows products purchased

Current customer examples:

- Asian Paints Limited
- Bangalore University
- Aurobindo Pharma Limited
- Aviral Power Solutions
- Indian Institute of Science, Bengaluru
- Hindustan Petroleum Corporation Limited
- BITS Pilani Hyderabad
- ICAR - IVRI
- Indian Scientific Company
- Biocon Limited

## 14. Forms and Conversion Flows

Primary user conversion actions:

- Product search
- Price enquiry
- Product enquiry
- Contact form
- Chat enquiry
- Service request
- AMC / one-year service request
- Exclusive partner request
- Newsletter/subscription request

Important forms:

- Contact form: `/api/contact`
- Price enquiry form: `/api/priceEnquiry`
- Product enquiry modal: `/api/enquiry`, with OTP send/verify support
- Service form: `/api/service`
- Service renewal form: `/api/serviceRenewal`
- Exclusive partner form: `/api/exclusivePatner`
- Chat form: `/api/chat`

Common fields across forms:

- Name
- Company
- Designation
- Department
- Phone
- Email
- Country
- State
- City
- Message/requirement
- Product/category/model where applicable
- Tracking metadata where applicable

Price enquiry fields:

- Name
- Designation
- Email
- Phone
- Company
- GST number
- Industry
- Department
- City
- State
- Country
- Message/requirements
- Selected product/model
- Traffic tracking metadata

Service/AMC fields:

- Name
- Company
- Designation
- Department
- Phone
- Email
- Country
- State
- City
- Instrument
- Model
- Serial number
- PO date
- Purchase date
- Warranty
- Message/issue description

## 15. Technical Architecture

Frontend:

- Next.js App Router
- React client components for interactive sections
- Tailwind CSS and inline component styles
- Next/Image for optimized images
- Product search overlays and modals
- Responsive desktop/mobile layouts

Backend:

- API routes under `src/app/api`
- MongoDB client in `src/app/library/mongodb.js`
- Email helper in `src/app/library/mailer.js`
- OTP helper in `src/app/library/otp.js`
- Form submissions stored in MongoDB collections and sent through email

Key dependencies:

- `next`
- `react`
- `react-dom`
- `mongodb`
- `mongoose`
- `nodemailer`
- `react-icons`
- `lucide`
- `gsap`
- `odometer`

Environment variables likely required:

- `MONGODB_URI`
- `MONGODB_DB`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_FROM`
- `EMAIL_TO`
- `OTP_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- Vercel deployment variables if deployed on Vercel

## 16. Assets Structure

Public assets include:

- Logo: `/logo.webp`
- Favicon: `/favicon.png`
- Contact icons: `/location.svg`, `/mail.svg`, `/phone.svg`
- Home/quick-link assets:
  - `/service-tools.gif`
  - `/warranty.gif`
  - `/services.gif`
  - `/assistance.gif`
- Banner images:
  - `/Furnace-Banner.png`
  - `/Chiller-Banner.png`
  - `/Ovens-Banner.png`
- Product images:
  - `/products/[category]/[model].webp`
- Customer assets:
  - `/assets/customers/[customer-category]/...`
- Event assets:
  - `/assets/events/...`
- About assets expected by code:
  - `/assets/about/headquarters.webp`
  - `/assets/about/manufacturing-floor.webp`
  - `/assets/about/quality-rd.webp`
  - `/assets/about/india-map.webp`

## 17. Presentation Document Outline

Use this order for a client/internal presentation:

1. Website Objective
   - Explain that the site is a product-led corporate website for laboratory equipment sales, service, enquiries, and brand trust.

2. Target Users
   - Researchers, procurement teams, lab managers, QA/QC heads, service customers, channel partners.

3. Main Navigation
   - Home, About Us, Products, Events, Contact Us.

4. Home Page Flow
   - Hero, product categories, product recommendations, quick actions, about preview, customers, testimonials, blogs/events.

5. Product Architecture
   - Nine core product categories
   - Subcategories
   - Dynamic product detail pages
   - Search and filters
   - SEO/product schema

6. Conversion Strategy
   - Search
   - Price enquiry
   - Product enquiry
   - Service/AMC
   - Chat
   - Contact
   - Partner request

7. About/Trust Content
   - BEING Technology background
   - Inkarp backing
   - India customer footprint
   - Certifications
   - Service promise

8. Customers and Events
   - Customer category filtering
   - Event showcase and post-event summaries

9. Backend and Integrations
   - MongoDB
   - Email notifications
   - OTP verification
   - Google Tag Manager
   - Product APIs

10. Recommended Improvements
   - Complete real blog content
   - Add individual blog detail pages
   - Add clearer customer logos/assets instead of repeated placeholder data
   - Fix text encoding issues visible in some files
   - Add stronger form validation consistency across all forms
   - Add analytics events consistently for every conversion form
   - Add sitemap coverage for every dynamic product route
   - Add loading/error states for all dynamic product and form flows
   - Add tests for API routes and form submissions

## 18. Reusable Prompt to Generate or Modify the Website Structure

Use this prompt when asking an AI or developer to regenerate/modify the website:

```text
Build a Next.js App Router website for Being Instruments India, a laboratory equipment supplier/distributor in Hyderabad, India. The website should be product-led, professional, responsive, SEO-friendly, and optimized for enquiries.

Use the following global layout:
- Fixed header with logo, navigation, product search, mobile menu, and social links.
- Main navigation: Home, About Us, Products, Events, Contact Us.
- Footer with office address, email, phone, quick links, product category links, social links, privacy policy, and terms.
- Floating chat/enquiry launcher.
- Last viewed product reminder.
- Google Tag Manager support.

Create these routes:
- / for Home
- /about-us for About
- /products for product catalogue
- /products/[category]
- /products/[category]/[subcategory]
- /products/[category]/[subcategory]/[model]
- /events
- /blogs
- /customers
- /contact-us
- /thank-you
- /privacy-policy
- /terms-and-conditions

Home page sections:
1. Hero with Being India, Scientific Solutions message and product search CTA.
2. Product category tabs/cards.
3. Picks for You product carousel/grid using product API data.
4. Quick actions: Exclusive Partner, Buy AMC, Service.
5. About preview with stats and trust points.
6. Customers preview.
7. Testimonials.
8. Blogs/events preview.

About page sections:
- Story in one line: global engineering with Indian support.
- BEING Technology background: Shanghai headquarters, 20+ years, 30,000 sq. metre facility, 100+ product lines, 200+ patents, ISO 9001, ISO 13485, CE, selected UL.
- Facility images.
- Why Being India exists: fast quotes, application advice, installation, training, AMC, spares.
- Backed by Inkarp.
- India footprint: 742 customer accounts, 1,789 instruments installed, 25 states/UTs.
- Product/application areas.
- Industries served.
- Why labs choose us.
- Brand promise.

Products:
- Build product data APIs by category.
- Create /api/products that returns searchable flat product data.
- Product categories:
  1. laboratory-ovens
  2. incubators
  3. biological-safety-cabinets
  4. pumps
  5. rotary-evaporators
  6. water-baths
  7. freezers
  8. chillers
  9. muffle-furnace
- Product catalogue page should group products by category and subcategory, support category filtering, search, model badges, and links to product detail pages.
- Product detail pages should include product title, model, image, overview, features, safety features, applications, specs, related models, comparison modal, price enquiry, product enquiry, SEO metadata, canonical URL, Open Graph metadata, and JSON-LD Product schema.

Contact page:
- Banner with Contact Us heading.
- Office hours: Mon-Fri, 09:30AM-05:30PM.
- Main phone: +91 9966634008.
- Email: info@beinglab.co.in.
- Location: Nacharam, Habsiguda, Hyderabad, Telangana, 500076.
- Service and Support: +91 7330731315.
- Dispatch Support: +91 9515365959.
- Application Support: +91 9100712689.
- Contact form with tracking metadata.

Events page:
- Banner.
- Event cards with title, date, location, description, main image, and collage/gallery image.
- Include current event: Mumbai Analytica, April 22, 2026, Mumbai.

Customers page:
- Categories: Academia-Government, Academia-Private, Government, Private, Dealer.
- Filterable grid.
- Customer cards with product-purchased tooltip.

Forms and APIs:
- Contact form -> /api/contact
- Price enquiry -> /api/priceEnquiry
- Product enquiry -> /api/enquiry, with OTP send/verify support
- Service request -> /api/service
- Service renewal/AMC -> /api/serviceRenewal
- Exclusive partner -> /api/exclusivePatner
- Chat enquiry -> /api/chat
- Subscription -> /api/subscribe and/or /api/subscription
- Store submissions in MongoDB and send email notifications using Nodemailer.

Design direction:
- Professional scientific/laboratory equipment brand.
- Blue/white corporate palette with restrained accents.
- Clear product imagery.
- Dense but readable product pages.
- Strong CTAs for enquiry, quote, service, and AMC.
- Fully responsive mobile and desktop behavior.
- Avoid placeholder content except where clearly marked.
```

## 19. Modification Checklist

Before making future changes, verify:

- Does the new page need a route under `src/app`?
- Does it require a new API route?
- Does it need to be added to header/footer navigation?
- Does it need sitemap inclusion?
- Does it need metadata/SEO?
- Does it need a form submission collection in MongoDB?
- Does it need email notification changes?
- Does it need tracking/GTM event names?
- Does it use existing product/category data patterns?
- Are images placed under `public` with stable paths?
- Are mobile and desktop layouts tested?

