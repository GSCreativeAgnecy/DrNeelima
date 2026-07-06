# Dr. Neelima Talari — Obstetrician & Gynecologist Website

A modern, responsive medical website built with **FastAPI** + **Jinja2** + **Tailwind CSS** for Dr. Neelima Talari, an experienced Obstetrician & Gynecologist.

## 🏥 Features

- **Hero Section** — Professional intro with CTA buttons
- **About** — Doctor profile, experience, qualifications
- **Services** — 12 medical service cards with icons and hover animations
- **Why Us** — Feature highlights with stats counter
- **Consultation Fee** — Pricing card with ₹1000 fee
- **Online Appointment Booking** — Full form with backend validation
- **Payment Section** — Google Pay placeholder with UPI
- **Office Hours** — Consultation timing display
- **Testimonials** — Patient reviews
- **Contact Section** — Phone, email, address, map placeholder
- **Responsive Design** — Mobile-first, works on all devices
- **Sticky Navbar** — Fixed top navigation with scroll effects
- **WhatsApp & Call** — Floating action buttons
- **Scroll-to-Top** — Auto-appears on scroll
- **Smooth Animations** — Fade-in reveal, hover effects, loading spinner
- **SEO Optimized** — Meta tags, Open Graph, structured schema
- **Custom 404 Page**

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| Backend | FastAPI (Python 3.11) |
| Templates | Jinja2 |
| Styling | Tailwind CSS (CDN) |
| Icons | Font Awesome 6 |
| Database | SQLite via SQLAlchemy |
| Container | Docker + Docker Compose |

## 🚀 Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/GSCreativeAgnecy/DrNeelima.git
cd DrNeelima

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app:app --reload --port 8000
```

Visit **http://localhost:8000** in your browser.

### Using Docker

```bash
docker compose up -d --build
```

Visit **http://localhost:8000** in your browser.

## 📁 Project Structure

```
dr-neelima/
├── app.py                  # FastAPI entry point
├── database.py             # SQLAlchemy engine & session
├── models.py               # Appointment ORM model
├── schemas.py              # Pydantic validation schemas
├── requirements.txt        # Python dependencies
├── Dockerfile              # Docker build instructions
├── docker-compose.yaml     # Docker Compose configuration
├── README.md               # This file
├── routes/
│   ├── __init__.py
│   ├── main.py             # GET route handlers
│   └── appointments.py     # POST /api/appointments
├── templates/
│   ├── base.html           # Base layout (nav, footer, floats)
│   ├── index.html          # Homepage (all sections)
│   ├── appointment.html    # Standalone booking form
│   ├── success.html        # Booking confirmation
│   └── 404.html            # Not found page
└── static/
    ├── css/style.css       # Custom styles & animations
    ├── js/main.js          # Form submission, scroll, interactions
    └── images/favicon.svg  # SVG favicon
```

## 📋 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Homepage |
| GET | `/appointment` | Appointment booking page |
| GET | `/success` | Booking confirmation page |
| POST | `/api/appointments` | Submit appointment booking |

### POST /api/appointments

**Request body:**
```json
{
    "full_name": "Jane Doe",
    "age": 28,
    "phone": "9876543210",
    "email": "jane@example.com",
    "appointment_date": "2026-07-10",
    "preferred_time": "10:30",
    "reason": "Regular checkup"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Appointment booked successfully!",
    "appointment_id": 1
}
```

## 🎨 Design

- **Colors:** Rose/pink (`#f43f5e`), sky blue (`#0ea5e9`), soft gradients
- **Fonts:** Playfair Display (headings), Inter (body)
- **Cards:** Rounded corners, soft shadows, hover elevation
- **Animations:** Fade-in on scroll, pulse on WhatsApp button, smooth transitions

## 🐳 Docker Deployment

### Production

```bash
docker compose up -d --build
```

The app serves on port 8000 with:
- 4 uvicorn workers
- Auto-restart policy
- Healthcheck every 30s
- SQLite volume persistence

### Coolify / Cloud Deployment

1. Push to GitHub
2. Connect to Coolify
3. Set build pack to **Docker Compose**
4. Deploy

## ⚙️ Environment Variables

Set via `docker-compose.yaml` environment section:

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | Dr. Neelima Talari | Site name |
| `DEBUG` | false | Debug mode |

## 📄 License

All Rights Reserved. © 2026 Dr. Neelima Talari.

## 📞 Contact

- **Email:** contact@drneelima.com
- **Phone:** +91 XXXXXXXXXX
- **Website:** https://drneelima.com
