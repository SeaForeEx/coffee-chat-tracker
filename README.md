# Coffee Chat Tracker - Full Stack Setup Guide

A complete guide for setting up a full-stack application with Next.js frontend and Django backend in a single project.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/DRF-ff1709?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Running the Application](#running-the-application)
4. [Building the Back End](#building-the-back-end)
5. [Building the Front End](#building-the-front-end)
6. [Useful Documentation](#useful-documentation)

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

# Create README
touch README.md
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
    "http://localhost:3000",      # Next.js dev server
    "http://127.0.0.1:3000",      # Alternative localhost
]
```

# Django REST Framework settings (optional for now)
```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Public API for development
    ],
}
```

**When you'd modify REST_FRAMEWORK settings:**
- **Authentication:** Change `AllowAny` to `IsAuthenticated` when you add user login
- **Pagination:** Uncomment pagination settings when you have many chats and want to limit results per page (e.g., 10 chats at a time)
- **Rate Limiting:** Add throttling classes to prevent API abuse in production
- **Custom Renderers:** Configure JSON/XML response formats for different clients

For this project, `AllowAny` permissions keep things simple during development. You'll add stricter permissions later when deploying to production.

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

**Verify setup:** You should see the Django rocket at http://localhost:8000 and the Next.js welcome page at http://localhost:3000.

---

## Building the Back End

### 1. Create Django Model

**Create the Chat model in `server/chats/models.py`:**
```python
from django.db import models

class Chat(models.Model):
    guest = models.CharField(max_length=50)
    chat_date = models.DateTimeField("date chatted")
    notes = models.TextField()  # TextField allows for long-form notes
```

**Create and run migrations:**
```bash
# Navigate to server directory
cd server

# Create migration files
python3 manage.py makemigrations

# Apply migrations to database
python3 manage.py migrate

# Return to project root
cd ..
```

### 2. Setup Django Admin

**Why Set Up Django Admin?**

Django's built-in admin interface provides a free, auto-generated UI for managing your data. This lets you:
- Create, read, update, and delete coffee chats without building a frontend first
- Test your model and API endpoints before writing React code
- Verify your database structure is working correctly
- Provide a quick admin panel for data management

Setting up the admin takes 2 minutes and saves hours of debugging later.

**Create an admin user**
```bash
# Superuser will be able to login to admin site
python3 manage.py createsuperuser

# Enter desired username and press enter
Username: admin

# Enter desired email address:
Email address: admin@example.com

# Enter password twice (first to create, second to confirm):
Password: **********
Password (again): *********
Superuser created successfully.
```

**Start the development server**
```bash
# Make sure server is running
python3 manage.py runserver
```

**Make chats modifiable in the admin**

**File: `server/chats/admin.py`**
```python
from django.contrib import admin
from .models import Chat

# Register the CoffeeChat model with the admin site
admin.site.register(Chat)
```

**Test Django admin by creating a chat**

- Visit [Django admin page](http://127.0.0.1:8000/admin/) in web browser.
- Click on "Chats" and follow directions to Add a Chat.

### 3. Create Chat Serializer

**Why we need a serializer:**
Serializers convert Django model instances to/from JSON format so they can be sent over HTTP. They also handle data validation when creating or updating Chat objects through the API.

**Create `server/chats/serializers.py`:**
```python
from rest_framework import serializers
from .models import Chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'guest', 'chat_date', 'notes']
        read_only_fields = ['id']
```

**Code explanation:**
- `model = Chat` - Tells the serializer which model to use
- `fields = ['id', 'guest', 'chat_date', 'notes']` - Specifies which model fields to include in the JSON output
- `read_only_fields = ['id']` - The `id` field is auto-generated by Django and can't be modified by API requests

**What this enables:**
- Convert Chat objects to JSON: `{"id": 1, "guest": "Alice", "chat_date": "2025-01-31T10:00:00Z", "notes": "Great chat!"}`
- Validate incoming JSON data when creating/updating chats
- Handle serialization/deserialization automatically

### 4. Create Chat ViewSet

**Why we need a ViewSet:**
ViewSets handle the logic for API requests (GET, POST, PUT, DELETE). They work with serializers to process data and interact with the database. ViewSets automatically provide standard CRUD (Create, Read, Update, Delete) operations with minimal code.

**File `server/chats/views.py`:**
```python
from rest_framework import viewsets
from .models import Chat
from .serializers import ChatSerializer

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
```

**Code explanation:**
- `from rest_framework import viewsets` - Import DRF's ViewSet classes
- `from .models import Chat` - Import our Chat model
- `from .serializers import ChatSerializer` - Import the serializer we created
- `viewsets.ModelViewSet` - Provides complete CRUD functionality (list, create, retrieve, update, delete) automatically
- `queryset = Chat.objects.all()` - Defines which Chat objects this ViewSet can access (in this case, all of them)
- `serializer_class = ChatSerializer` - Tells the ViewSet which serializer to use for converting data to/from JSON

**What this enables:**
- `GET /api/chats/` - List all chats
- `POST /api/chats/` - Create a new chat
- `GET /api/chats/{id}/` - Retrieve a specific chat
- `PUT /api/chats/{id}/` - Update a chat
- `DELETE /api/chats/{id}/` - Delete a chat

All of these endpoints are created automatically with just these 2 lines of configuration!

### 5. Configure URLs

**Why we need URL configuration:**
URLs map HTTP requests to the appropriate ViewSet. The router automatically creates all the REST API endpoints (list, create, retrieve, update, delete) based on our ChatViewSet, and we connect them to our Django project's URL structure.

**Update `server/coffee_chat_api/urls.py`:**
```python
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chats.views import ChatViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'chats', ChatViewSet, basename='chat')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

**Code explanation:**
- `from chats.views import ChatViewSet` - Import our ViewSet
- `DefaultRouter(trailing_slash=False)` - Creates a router that generates URLs without requiring trailing slashes
- `router.register(r'chats', ChatViewSet, basename='chat')` - Registers ChatViewSet under the 'chats' path with a base name for URL reversing
- `path('admin/', admin.site.urls)` - Django's built-in admin panel URL
- `path('api/', include(router.urls))` - Includes all auto-generated chat endpoints under the `/api/` prefix

**Available endpoints (auto-generated by ModelViewSet):**
- `GET /api/chats` - List all chats
- `POST /api/chats` - Create a new chat
- `GET /api/chats/{id}` - Retrieve a specific chat
- `PUT /api/chats/{id}` - Update a chat
- `PATCH /api/chats/{id}` - Partially update a chat
- `DELETE /api/chats/{id}` - Delete a chat

**API Request Flow**

Before moving to Step 6, here's how a typical API request flows through our Django backend:

**Example: User requests all chats with `GET /api/chats`**

1. **Router** receives the request and matches the URL + HTTP method to the appropriate ViewSet method
2. **ViewSet** processes the request and queries the database for Chat objects
3. **Serializer** converts the Chat model instances from the database into JSON format
4. **ViewSet** wraps the JSON data in an HTTP response
5. **Response** is sent back to the user's browser

**Example: User creates a chat with `POST /api/chats`**

1. **Router** directs the POST request to ViewSet's `create()` method
2. **ViewSet** receives the JSON data from the request
3. **Serializer** validates the data and converts JSON into a Chat model instance
4. **ViewSet** saves the Chat object to the database
5. **Serializer** converts the saved Chat back to JSON for the response
6. **Response** is sent back with the newly created chat data

**Key takeaway:** Router maps URLs → ViewSet handles logic → Serializer transforms data

### 6. Test the API



---

## Building the Front End



---

## Useful Documentation

- **Next.js**: https://nextjs.org/docs
- **Django**: https://docs.djangoproject.com/
- **Django REST Framework**: https://www.django-rest-framework.org/
- **django-cors-headers**: https://github.com/adamchainz/django-cors-headers

---
