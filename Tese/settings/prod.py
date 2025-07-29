from .base import *

# Production-specific settings
DEBUG = False

# ⚠️ IMPORTANT: Replace with your actual domain later
ALLOWED_HOSTS = [
    'yourdomain.com',
    'www.yourdomain.com',
    'teseapp.com',
]

# Security settings (uncomment when ready to deploy)
# SECURE_SSL_REDIRECT = True
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True

# Database (PostgreSQL - we'll set this up later)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'tese_db',
        'USER': 'tese_user',
        'PASSWORD': '',  # Set via environment variable later
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Email backend for production (example using SMTP)
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.yourprovider.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'your@email.com'
# EMAIL_HOST_PASSWORD = 'yourpassword'