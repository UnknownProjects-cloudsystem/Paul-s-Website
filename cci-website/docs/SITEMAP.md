# Sitemap & Information Architecture

_Caissie Canine Instruction — content structure, navigation hierarchy and internal linking._

## Navigation hierarchy

**Primary nav (header):**

```
Home
About
Private Training ▾
   ├─ Private Dog Training      /private-dog-training
   ├─ Puppy Training            /puppy-training
   ├─ Behaviour Training        /behaviour-training
   ├─ E-Collar Training         /e-collar-training
   └─ Service & Therapy Dogs    /service-therapy-dog-training
Corporate K9                    /corporate-k9-services
Partners                        /partners
Knowledge Hub                   /k9-knowledge-hub
Contact                         /contact
```

Persistent CTAs: header "Book Assessment" + phone; mobile sticky bar "Call / Text / Inquiry".

**Footer:** Services column, Company column (incl. **Success Stories**, **K9 Legacy**), Contact column. Legacy and Testimonials live primarily in the footer/secondary nav so they don't distract from the conversion path (per PRD).

## Full page map

| Route                            | Page                         | Primary SEO target                            |
| -------------------------------- | ---------------------------- | --------------------------------------------- |
| `/`                              | Home                         | Professional dog training Ontario             |
| `/about`                         | About Paul Caissie           | Retired police K9 instructor Ontario          |
| `/private-dog-training`          | Private Dog Training (hub)   | Private dog training Durham Region / GTA      |
| `/puppy-training`                | Puppy Training               | Puppy training Ontario                        |
| `/behaviour-training`            | Behaviour Training           | Dog behaviour correction Ontario              |
| `/e-collar-training`             | E-Collar Training            | Professional e-collar dog training            |
| `/service-therapy-dog-training`  | Service & Therapy Dogs       | Service & therapy dog training Ontario        |
| `/corporate-k9-services`         | Corporate K9 Services        | Corporate K9 consultation & evaluation        |
| `/partners`                      | Partner Network              | (brand)                                       |
| `/testimonials`                  | Success Stories              | Dog training results / reviews Ontario        |
| `/k9-knowledge-hub`              | Knowledge Hub (blog index)   | Dog training tips & canine safety             |
| `/k9-knowledge-hub/[slug]`       | Article                      | Long-tail topic keywords                      |
| `/legacy`                        | K9 Legacy / Memorial         | (brand/emotional)                             |
| `/contact`                       | Contact / Assessment         | Dog training assessment Ontario               |

Separating **private** services from **corporate K9** is intentional — clearer for users and stronger topical SEO.

## Internal linking strategy

- **Home** links down into every major area (about, private hub, corporate, gallery→testimonials, partners, contact).
- **Private hub** links to each specialized service sub-page (puppy/behaviour/e-collar/service-therapy) and to Contact.
- **Service pages** each link → About (authority) and → Contact (assessment), and carry FAQ schema.
- **Knowledge Hub articles** link → a relevant service page (`relatedService`) and → related posts in the same category, funnelling readers toward services.
- **Corporate** is a self-contained funnel: capabilities → process → authority → video → consultation CTA.
- Every page ends in a conversion CTA (assessment / call / text).
