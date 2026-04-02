# PetHub (the_pet_hub)

A full-stack pet care platform offering adoption services, community posts, veterinary clinic finder, and emergency resources. This repository contains a Django REST backend and a Next.js frontend.

## Table of Contents

- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Backend](#backend)
  - [Apps](#apps)
  - [Models](#models)
  - [API Routing](#api-routing)
  - [Settings](#settings)
- [Frontend](#frontend)
  - [Pages](#pages)
  - [Data Access](#data-access)
- [Local Setup](#local-setup)
  - [Backend](#backend-setup)
  - [Frontend](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Deployment Notes](#deployment-notes)
- [Known Improvements](#known-improvements)

---

## Project Architecture

PetHub splits responsibilities into:

1. **Backend** (`backend/`)
   - Django 5.2 with Django REST Framework (DRF)
   - SQLite on local dev via `db.sqlite3`
   - Apps: `api`, `community`, `FindVet`, `adopt`
   - REST endpoints for resources via `ModelViewSet` + router
   - CORS enabled for `http://localhost:3000`

2. **Frontend** (`frontend/`)
   - Next.js 14.2 with React 18
   - UI built using Tailwind + Radix components
   - routing-based React pages under `app/`
   - data fetches via `axios` from the backend API

3. **Integration**
   - Frontend fetches backend resources at `http://127.0.0.1:8000`.
   - Example in `frontend/app/page.tsx`: GET `/user/2`.

---

## Tech Stack

- Backend
  - Python 3.11+ (recommended)
  - Django 5.2
  - Django REST Framework
  - django-cors-headers
  - SQLite (default dev database)

- Frontend
  - Node 18+ (recommended)
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Radix UI + Lucide Icons
  - Axios

---

## Backend

### Apps

- `api`: user authentication/profile endpoints
- `adopt`: pet listing and adoption CRUD
- `community`: posts (community discussion)
- `FindVet`: veterinary clinic discovery

### Models

- `api.User`: user identity fields (`First_name`, `Last_name`, `Uname`, `mail`, `password`)
- `adopt.Pet`: pet profile and adoption metadata
- `community.Post`: community post content
- `FindVet.VeterinaryClinic`: clinic details, rating, services
- `FindVet.Service`: service taxonomy

### API Routing

Backend route configuration in `myproject/urls.py`:

- `path('', include('api.urls'))`
- `path('community/', include('community.urls'))`
- `path('vet/', include('FindVet.urls'))`
- `path('adopt/', include('adopt.urls'))`

Each app uses DRF `DefaultRouter`, exposing all CRUD endpoints.

### Settings

Source: `backend/myproject/settings.py`

- `DEBUG = True` (set `False` in production)
- `SECRET_KEY` hardcoded (replace for production)
- `CORS_ALLOWED_ORIGINS`: [`http://localhost:3000`]
- `MEDIA_URL`, `MEDIA_ROOT` for image upload storage
- `INSTALLED_APPS` includes `rest_framework`, `corsheaders`, plus app names

---

## Frontend

### Pages

Located in `frontend/app/`:

- `/` home dashboard
- `/adoption` adoption listing
- `/community` community posts
- `/vet-finder` find veterinarian clinics
- `/health`, `/emergency`, `/stray-help`, `/login`, `/register`

### Data Access

- Axios HTTP calls to backend endpoints.
- Example call: `axios.get('http://127.0.0.1:8000/user/2')` in `app/page.tsx`.

---

## Local Setup

### Backend Setup

```powershell
cd "d:\New folder (2)\the_pet_hub\backend"
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # if requirements.txt exists
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

If there is no `requirements.txt`, install packages by name: 
`Django==5.2`, `djangorestframework`, `django-cors-headers`.

### Frontend Setup

```powershell
cd "d:\New folder (2)\the_pet_hub\frontend"
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## API Endpoints

`base_url`: `http://127.0.0.1:8000`

- `GET /user/`, `POST /user/`, `PUT /user/{id}/`, `DELETE /user/{id}/`
- `GET /community/post/`, etc.
- `GET /vet/findvet/`, etc.
- `GET /adopt/pet/`, etc.

### Sample Pet payload

```json
{
  "name": "Bella",
  "type": "dog",
  "breed": "Labrador",
  "age": "2",
  "gender": "female",
  "size": "medium",
  "color": "yellow",
  "location": "Shelter A",
  "description": "Friendly and playful",
  "personality": "playful,affectionate",
  "goodWith": "children,dogs",
  "specialNeeds": "",
  "adoptionFee": "150.00",
  "vaccinated": true,
  "spayedNeutered": true,
  "houseTrained": true
}
```

---

## Usage Examples

Inside `frontend/app/page.tsx`, the dashboard component fetches a user by ID and logs data:

```ts
useEffect(() => {
  axios.get('http://127.0.0.1:8000/user/2')
    .then((response) => setUsers(response.data))
    .catch(console.error);
}, []);
```

To test from CLI:

```bash
curl http://127.0.0.1:8000/adopt/pet/
```

---

## Testing

- Django tests: `python manage.py test`
- Next.js lint: `npm run lint`

---

## Deployment Notes

- Use a production-grade DB (PostgreSQL) and static/media storage (S3 or similar).
- Set `DEBUG = False` and secure `SECRET_KEY` via environment variables.
- Use `gunicorn`/`uvicorn` + `nginx` for backend.
- Use `next build` and `next start` for frontend, or deploy to Vercel.

---

## Known Improvements

- Add real auth (JWT / sessions) instead of storing plaintext `password`.
- Add pagination & sorting on DRF endpoints.
- Add search and filtering for vet/adopt listings.
- Add field validation and optional relation constraints (e.g., `Service` M2M for clinics).
- Add tests for viewsets and serializers.

---

## Contacts

You can reach the maintainer through the repo’s issue tracker (add README link in GitHub).