from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from drp03_pi import settings


def mail(request):
    context = { "livro": "It" , "nome": "Matheus" }
    html_content= render_to_string('mail/test-mail.html', context)
    #plain_content = render_to_string('mail/test-mail.txt', context)
    text_content = strip_tags(html_content)
    #send_mail(
        #subject='O prazo de devolução do livro emprestado da venceu!', 
        #message=plain_content,
        #from_email=settings.EMAIL_HOST_USER,
        #recipient_list=['matheussutani@hotmail.com'],
        #html_message=html_content
        #)
    
    mail = EmailMultiAlternatives(
        subject = 'O prazo de devolução do livro emprestado da venceu!', 
        body = text_content,
        from_email = settings.EMAIL_HOST_USER,
        to = ['matheussutani@hotmail.com'],
        )
    
    mail.attach_alternative(html_content, 'text/html')
    mail.send()
    
    return HttpResponse("Email enviado com sucesso!")