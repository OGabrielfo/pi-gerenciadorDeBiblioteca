from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Nicho, Livro, Professor_Funcionario, Aluno, StatusEmprestimo, Emprestimo, LivroEmprestimo
from .serializers import NichoSerializer, LivroSerializer, Professor_FuncionarioSerializer, AlunoSerializer, StatusEmprestimoSerializer, EmprestimoSerializer, LivroEmprestimoSerializer, LoginSerializer

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
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)