from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .routers import router
from .views import index, login_view # Importa a view index para testes de backend
from django.contrib import admin  # Importa o módulo admin do Django

urlpatterns = [
    # Rota para a API de login usando Simple JWT
    path('', index),  # Rota para a raiz do servidor
    #path('api/', include(api_patterns)),  # Inclui as rotas da API
    path('admin/', admin.site.urls),  # Rota para a interface administrativa
    path('login/', login_view, name='login_view'),  # URL para a página de login
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Substitua login_view
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Para refrescar o token
    path('api/', include((router.urls, 'core_api'), namespace='core_api')),  # Rota para a API
    #path('api/nicho/', NichoViewSet.as_view({'get': 'list'}), name='nicho-list'),  # Para listar todos os nichos
]

