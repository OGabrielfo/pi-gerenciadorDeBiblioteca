from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.contrib import messages  # Importar messages para mostrar mensagens na interface
from django.shortcuts import redirect
#from django.contrib.auth import authenticate, login
#from django.http import JsonResponse
#from django.views.decorators.csrf import ensure_csrf_cookie


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

"""


from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

# Tornar a view compatível com o acesso de um frontend externo
@csrf_exempt  # Desativando a verificação CSRF para permitir requisições externas (se necessário)
def login_view(request):
    if request.method == 'POST':
        # Obtenção de dados JSON enviados pelo frontend (Node.js, por exemplo)
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Autenticar o usuário
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            # Retornar um JSON indicando sucesso e redirecionamento
            return JsonResponse({'status': 'success', 'message': 'Usuário autenticado com sucesso!'})
        else:
            # Retornar um erro JSON se a autenticação falhar
            return JsonResponse({'status': 'error', 'message': 'Usuário e/ou senha incorretos!'}, status=401)

    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)
"""