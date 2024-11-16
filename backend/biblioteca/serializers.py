from rest_framework import serializers
from .models import Nicho, Livro, Professor_Funcionario, Aluno, StatusEmprestimo, Emprestimo, LivroEmprestimo, ReservaLivro, SugestaoLivro

class NichoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nicho
        fields = ['id_nicho', 'numero_nicho', 'local', 'observacao']
        read_only_fields = ['id_nicho']

class LivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = ['id_livro', 'nome_do_livro', 'autor', 'tipo', 'quantidade_exemplar', 'saldo_exemplar', 'id_nicho', 'observacao_livro']

class Professor_FuncionarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor_Funcionario
        fields = ['id_professor_funcionario','nome_do_professor_funcionario',  'ocupacao', 'telefone', 'email']

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ['id_aluno', 'nome_do_aluno', 'sala', 'telefone', 'email']

class StatusEmprestimoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusEmprestimo
        fields = ['id_status', 'status']

class EmprestimoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emprestimo
        fields = ['id_emprestimo', 'id_usuario_aluno', 'id_usuario_professor', 'data_emprestimo', 'data_devolucao', 'situacao_emprestimo']

class LivroEmprestimoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LivroEmprestimo
        fields = ['id_livro', 'id_emprestimo', 'quantidade', 'id_status']

class ReservaLivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaLivro
        fields = ['id_reserva', 'livro', 'nome_aluno', 'email', 'telefone', 'sala', 'aluno', 'data_reserva']

class SugestaoLivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = SugestaoLivro
        fields = ['id_sugestao', 'nome_completo', 'sala', 'periodo', 'nome_autor', 'titulo_livro', 'comentario']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
