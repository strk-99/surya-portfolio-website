# Surya Learning DevOps Platform

**Production-grade, future-proof personal DevOps platform.**

Live URL: `https://suryalearningdevops.online` (Target)

## Architectural Philosophy
- **Static-first**: Fast, cheap, secure.
- **Infrastructure-aware**: Designed to map cleanly to S3 buckets and CloudFront distributions.
- **Container Pattern**: The `/apps` directory is designed to host independent micro-applications.

## Site Structure

- `/`: Home
- `/about`: Professional Summary
- `/skills`: Skills Matrix
- `/projects`: Projects Showcase
- `/apps`: Apps Container (See `apps/README.md`)
- `/contact`: Contact Info

## Deployment

### Prerequisites
- AWS Account
- S3 Bucket (Public Read or OAC)
- Cloudfront Distribution (Standard)

### Build
```bash
npm install
npm run build
```

The output will be in `dist/`.

### Infrastructure-as-Code (Terraform)
*Coming soon to /infrastructure directory.*

# surya-portfolio-website
