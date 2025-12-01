from django.utils.decorators import decorator_from_middleware
from django.middleware.cache import UpdateCacheMiddleware, FetchFromCacheMiddleware

def no_cache(view_func):
    def wrapper(request, *args, **kwargs):
        response = view_func(request, *args, **kwargs)
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response['Pragma'] = 'no-cache'
        response['Expires'] = '0'
        return response
    return wrapper
