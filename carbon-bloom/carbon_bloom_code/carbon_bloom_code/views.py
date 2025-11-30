from django.urls import path
from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, "home.html", {"title": "CarbonBloom - Authentic Carbon Credits"})

def reg_frm(request):
    return render(request, "reg_frm.html", {"title": "Farmer Registration - CarbonBloom"})

def vol_login(request):
    return render(request, "vol_login.html", {"title": "Volunteer Login - CarbonBloom"})
