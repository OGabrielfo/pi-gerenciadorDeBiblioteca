from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Nicho, Livro, Professor_Funcionario, Aluno, StatusEmprestimo, Emprestimo, LivroEmprestimo
from .serializers import (
    NichoSerializer,
    LivroSerializer,
    Professor_FuncionarioSerializer,
    AlunoSerializer,
    StatusEmprestimoSerializer,
    EmprestimoSerializer,
    LivroEmprestimoSerializer
)

class NichoViewSet(viewsets.ModelViewSet):
    queryset = Nicho.objects.all()
    serializer_class = NichoSerializer
    permission_classes = [IsAuthenticated]

class LivroViewSet(viewsets.ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class Professor_FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Professor_Funcionario.objects.all()
    serializer_class = Professor_FuncionarioSerializer
    permission_classes = [IsAuthenticated]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAuthenticated]

class StatusEmprestimoViewSet(viewsets.ModelViewSet):
    queryset = StatusEmprestimo.objects.all()
    serializer_class = StatusEmprestimoSerializer
    permission_classes = [IsAuthenticated]

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoSerializer
    permission_classes = [IsAuthenticated]

class LivroEmprestimoViewSet(viewsets.ModelViewSet):
    queryset = LivroEmprestimo.objects.all()
    serializer_class = LivroEmprestimoSerializer
    permission_classes = [IsAuthenticated]

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

#class TesteViewSet(viewsets.ModelViewSet):
 #   queryset = LivroEmprestimo.objects.all()
  #  serializer_class = LivroEmprestimoSerializer
   # permission_classes = [AllowAny]

class TesteViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def teste(self, request):
        return Response({"message": "Hello, this is a test response!"}, status=status.HTTP_200_OK)
