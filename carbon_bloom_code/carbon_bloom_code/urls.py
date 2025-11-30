"""
URL configuration for carbon_bloom_code project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from . import views
import farmer.views as fviews
import company.views as cviews
urlpatterns = [
    path('', views.home),
    path('a/', admin.site.urls),
    path('company_login/', views.com_login, name='com_login'),
    path('farmer_login/', views.frm_login, name='frm_login'),
    path('volunteer_login/', views.vol_login, name='vol_login'),
    path('registration_farmer/', views.reg_frm, name='reg_frm'),
    path('company_dashboard/', cviews.com_dashboard, name='dash_com'),
    path('farmer_register/', fviews.register_farmer, name='register_farmer'),
    # path('registration_company/', views.reg_com, name='reg_com'),
    # path('farmer_dashboard/', views.frm_dashboard, name='dash_frm'),
    # path('volunteer_dashboard/', views.vol_dashboard, name='dash_vol'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

