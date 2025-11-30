import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "carbon_bloom_code.settings")

app = get_asgi_application()
