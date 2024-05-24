from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from .models import Nicho, Livro, Professor_Funcionario, Aluno, StatusEmprestimo, Emprestimo, LivroEmprestimo
from .serializers import NichoSerializer, LivroSerializer, Professor_FuncionarioSerializer, AlunoSerializer, StatusEmprestimoSerializer, EmprestimoSerializer, LivroEmprestimoSerializer

class NichoViewSet(viewsets.ModelViewSet):
    queryset = Nicho.objects.all()
    serializer_class = NichoSerializer
    permission_classes = [AllowAny]

class LivroViewSet(viewsets.ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    permission_classes = [AllowAny]

class Professor_FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Professor_Funcionario.objects.all()
    serializer_class = Professor_FuncionarioSerializer
    permission_classes = [AllowAny]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [AllowAny]

class StatusEmprestimoViewSet(viewsets.ModelViewSet):
    queryset = StatusEmprestimo.objects.all()
    serializer_class = StatusEmprestimoSerializer
    permission_classes = [AllowAny]

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoSerializer
    permission_classes = [AllowAny]

class LivroEmprestimoViewSet(viewsets.ModelViewSet):
    queryset = LivroEmprestimo.objects.all()
    serializer_class = LivroEmprestimoSerializer
    permission_classes = [AllowAny]

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request):
        view = TokenObtainPairView.as_view()
        response = view(request._request)
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=['post'])
    def refresh(self, request):
        view = TokenRefreshView.as_view()
        response = view(request._request)
        return Response(response.data, status=response.status_code)