from .base import *

# Development-specific settings
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]

# Use SQLite (already defined in base, but safe to repeat)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Email backend: Print to console instead of sending
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'hello@tese.africa'