# Coffee Chat Tracker - Full Stack Setup Guide

A complete guide for setting up a full-stack application with Next.js frontend and Django backend in a single project.

## Prerequisites

Install these first:
- **Node.js**: https://nodejs.org/en/download/package-manager
- **Python 3**: https://www.python.org/downloads/

Verify installations:
```bash
node --version
npm --version
python3 --version
```

---

## Project Setup

### 1. Create Project Structure
```bash
# Create main project folder
mkdir coffee-chat-tracker
cd coffee-chat-tracker

# Initialize git
git init
git branch -m main
```

---

### 2. Frontend Setup (Next.js)
```bash
# Create Next.js app
npx create-next-app@latest client

# Setup options:
# ✓ TypeScript? No
# ✓ ESLint? Yes
# ✓ Tailwind CSS? Your choice
# ✓ src/ directory? No
# ✓ App Router? Yes
# ✓ Customize default import alias? No

# Remove nested git repo
rm -rf client/.git

# Test frontend
cd client
npm run dev
# Visit http://localhost:3000
# Stop server with Ctrl+C

cd ..
```

---

### 3. Backend Setup (Django)
```bash
# Create server folder
mkdir server
cd server

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

# Install packages
pip install django djangorestframework django-cors-headers

# Optional: upgrade pip
python3 -m pip install --upgrade pip

```
**Configure VS Code Python Interpreter (if using VS Code):**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Python: Select Interpreter"
3. Enter interpreter path: `/Users/[username]/Projects/coffee-chat-tracker/server/venv/bin/python`
   - Or use relative path: `./server/venv/bin/python`
```bash

# Create Django project
django-admin startproject coffee_chat_api .

# Create chats app (IMPORTANT: Do this BEFORE editing settings.py)
python3 manage.py startapp chats

# Run initial migrations
python3 manage.py migrate

# Create requirements.txt
pip freeze > requirements.txt

cd ..
```

---

### 4. Configure Django

**IMPORTANT:** The `chats` app must already exist from Step 3 before doing this configuration.

**File: `server/coffee_chat_api/settings.py`**

**Add to INSTALLED_APPS (around line 33):**
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',      # ADD
    'corsheaders',         # ADD
    'chats',               # ADD (app created in Step 3)
]
```

**Add to MIDDLEWARE - corsheaders MUST be first (around line 44):**
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ADD FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

**Add to BOTTOM of settings.py:**
```python
# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

---

### 5. Create .gitignore

**Delete the Next.js .gitignore:**
```bash
rm client/.gitignore
```

**Create root .gitignore file:**
```bash
touch .gitignore
```

**File: `.gitignore` (in project root)**
```gitignore
# Client (Next.js)
client/node_modules/
client/.next/
client/.env.local
client/out/
client/.env*.local

# Server (Django)
server/venv/
server/__pycache__/
server/**/__pycache__/
server/*.pyc
server/**/*.pyc
server/*.pyo
server/**/*.pyo
server/*.pyd
server/**/*.pyd
server/db.sqlite3
server/db.sqlite3-journal
server/.env
server/*.log
server/**/*.log
server/*.egg-info/
server/**/*.egg-info/
server/dist/
server/build/
server/.Python
server/media/
server/staticfiles/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# General
.DS_Store
*.log
Thumbs.db
```

---

### 6. Initial Commit
```bash
git add .
git commit -m "Initial commit: Next.js and Django setup"
```

---

## Final Project Structure
```
coffee-chat-tracker/
├── client/                    # Next.js frontend
│   ├── app/
│   ├── package.json
│   └── .env.local
├── server/                    # Django backend
│   ├── venv/
│   ├── coffee_chat_api/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── chats/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── .gitignore
└── README.md
```

---

## Running the Application

### In VS Code

Open the project root in VS Code:
```bash
code .
```

Open integrated terminal and split it (Ctrl+Shift+5 or Cmd+Shift+5):

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
```
Visit: http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd server
source venv/bin/activate
python3 manage.py runserver
```
Visit: http://localhost:8000

**Both servers run simultaneously on different ports.** The Next.js frontend (port 3000) makes API requests to the Django backend (port 8000).

---

## Common Commands

### Virtual Environment

**Activate (do this every time you open a new terminal for Django):**
```bash
cd server
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

**Deactivate:**
```bash
deactivate
```

### Django Commands (run in server/ with venv active)
```bash
python3 manage.py runserver          # Start development server
python3 manage.py makemigrations     # Create new migrations
python3 manage.py migrate            # Apply migrations
python3 manage.py createsuperuser    # Create admin user
python3 manage.py startapp <name>    # Create new app
```

### Frontend Commands (run in client/)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

---

## Testing Setup

**Test Django:**
```bash
cd server
source venv/bin/activate
python3 manage.py runserver
```
Visit http://localhost:8000 - should see Django rocket 🚀

**Test Next.js:**
```bash
cd client
npm run dev
```
Visit http://localhost:3000 - should see Next.js welcome page

**Test both together:**
Run both servers simultaneously in split terminals

---

## Cloning/Setting Up on New Machine
```bash
# Clone repo
git clone <your-repo-url>
cd coffee-chat-tracker

# Setup frontend
cd client
npm install
cd ..

# Setup backend
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
cd ..
```

---

## Troubleshooting

### "No module named 'chats'" error

This happens if you add `'chats'` to `INSTALLED_APPS` before creating the app.

**Solution:**
1. Comment out `'chats'` in `settings.py`
2. Run `python3 manage.py startapp chats`
3. Uncomment `'chats'` in `settings.py`

### Virtual environment not activating

Make sure you're in the `server/` directory before running:
```bash
source venv/bin/activate
```

### Port already in use

If port 3000 or 8000 is already in use:
```bash
# Find and kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

---

## Useful Documentation

- **Next.js**: https://nextjs.org/docs
- **Django**: https://docs.djangoproject.com/
- **Django REST Framework**: https://www.django-rest-framework.org/
- **django-cors-headers**: https://github.com/adamchainz/django-cors-headers

---

## Tech Stack

- **Frontend**: Next.js 14+ (React), App Router
- **Backend**: Django 4.2+, Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)
- **CORS**: django-cors-headers