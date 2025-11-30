from django.shortcuts import render

# Create your views here.
def com_dashboard(request):
    if request.method == 'POST':
        data = request.POST

        if data.get('login_status') == 1:
            if request.session.get('user_role') == 'volunteer':
                pass
            elif request.session.get('user_role') == 'farmer':
                return render(request, 'company/company_dashboard.html', {'title': 'Company Dashboard'})
            elif request.session.get('user_role') == 'admin':
                pass
            elif request.session.get('user_role') == 'company':
                pass
        
        if data.get('email') != None and data.get('password') != None and data.get('email') != '' and data.get('password') != '':
            email = data.get('email')
            password = data.get('password')

            # Authenticate company user (pseudo code)
            if email == 'company@gmail.com' and password == 'Comp@12345':
                request.session['user_role'] = 'company'
                request.session['user_email'] = email,
                request.session['login_status'] = 1
                return render(request, 'company/company_dashboard.html', {'title': 'Company Dashboard'})
            else:
                error_message = "Invalid phone number or password."
                return render(request, 'company/company_login.html', {'error_message': error_message})
    return render(request, 'company/company_login.html', {'title': 'Company Login'})
        
    