from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
#from django.contrib import messages  # Importar messages para mostrar mensagens na interface



# Create your views here.

def index(request):
    return render(request, 'html/index.html')

def principal(request):
    return render(request, 'principal.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/admin/')  # Redireciona para a página principal após o login
        else:
            return HttpResponse('Usuário e/ou senha incorretos!')
           # return redirect('index')  # Redireciona de volta para a página de login
    return render(request, 'index.html')

def test_api(request):
    data = { "message": "Conexão bem-sucedida!" }
    return JsonResponse(data)