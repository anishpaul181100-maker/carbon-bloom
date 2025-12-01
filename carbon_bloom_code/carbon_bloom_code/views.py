from django.urls import path
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from utils.decorators import no_cache


def home(request):
    request.session['base_url'] = request.build_absolute_uri('/')[:-1]
    request.session['login_status'] = request.session.get('login_status', 0)
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "home.html", {"title": "CarbonBloom - Authentic Carbon Credits", 'base_url': request.build_absolute_uri('/')[:-1]})

def reg_frm(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "reg_frm.html", {"title": "Farmer Registration - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

def vol_login(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "vol_login.html", {"title": "Volunteer Login - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

def com_login(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "com_login.html", {"title": "Company Login - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

def frm_login(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "frm_login.html", {"title": "Farmer Login - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

def reg_com(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "reg_comp.html", {"title": "Company Registration - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

def vol_apply(request):
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass
    return render(request, "vol_apply.html", {"title": "Volunteer Application - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})

@no_cache
def frm_dashboard(request):
    if (not request.session.get('login_status') and request.session.get('login_status') != 1):
        return redirect('/')
    if request.session.get('login_status') == 1:
        if request.session.get('user_role') == 'volunteer':
            pass
        elif request.session.get('user_role') == 'farmer':
            return render(request, "farmer/dashboard.html", {"titile": "Farmer Dashboard - CarbonBloom", 'base_url': request.build_absolute_uri('/')[:-1]})
        elif request.session.get('user_role') == 'admin':
            pass
        elif request.session.get('user_role') == 'company':
            pass

def logout_view(request):
    request.session.flush()
    request.session['base_url'] = request.build_absolute_uri('/')[:-1]
    request.session['login_status'] = 0
    return redirect("/")