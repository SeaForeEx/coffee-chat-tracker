import os
import dj_database_url
from .settings import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')

DEBUG = False

ALLOWED_HOSTS = [
    '.onrender.com',
    'localhost',
    '127.0.0.1',
]

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Whitenoise for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
MIDDLEWARE.insert(0, 'basicauth.middleware.BasicAuthMiddleware')  
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS - Update with your Render frontend URL later
CORS_ALLOWED_ORIGINS = [
    "https://coffee-chat-tracker.onrender.com",  # Your frontend URL    
    "http://localhost:3000",
]

# Basic Authentication
BASICAUTH_USERS = {
    os.environ.get('BASICAUTH_USERNAME', 'admin'): os.environ.get('BASICAUTH_PASSWORD', 'changeme'),
}
BASICAUTH_DISABLE = False