from .base import *

# Production-specific settings
DEBUG = False

# ⚠️ IMPORTANT: Replace with your actual domain later
ALLOWED_HOSTS = [
    'ourmoney-backend.onrender.com',
]

# Security settings (uncomment when ready to deploy)
# SECURE_SSL_REDIRECT = True
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True

# We'll add PostgreSQL later — for now, use SQLite
# DATABASES config is inherited from base.py

# Email backend for production (example using SMTP)
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.yourprovider.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'your@email.com'
# EMAIL_HOST_PASSWORD = 'yourpassword'