# coding:utf-8

from ...models import Email
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Alimentar base de emails'

    def handle(self,  *args,  **kwargs):
        emails = self.lista_emails();
        for email in emails:
            Email.objects.create(name=email['name'], send_date=email['send_date'], subject=email['subject'])
        print 'Comando executado com sucesso.'

    def lista_emails(self):
        emails = [
            {'name': 'Douglas Bastos', 'subject': 'Primeiro email enviado', 'send_date': '2015-09-05 18:34:23'},
            {'name': 'Joaquim barboza', 'subject': 'Está tudo bem com você?', 'send_date': '2015-09-01 12:00:00'},
            {'name': 'Rayssa Bastos', 'subject': 'Oi, tudo bem?', 'send_date': '2015-08-11 20:19:51'},
            {'name': 'Davi Henrique', 'subject': 'Eu tenho o melhor pai do mundo!', 'send_date': '2015-09-03 10:20:33'},
            {'name': 'Joaquim barboza', 'subject': 'Você viu meu email?', 'send_date': '2015-09-07 19:38:28'},
            {'name': 'Maysa Souza', 'subject': 'Confirmado para amanhã', 'send_date': '2015-09-10 19:38:58'},
            {'name': 'Carlos Henrique', 'subject': '[IMPORTANTE] - Reunião amanhã', 'send_date': '2015-09-07 22:23:06'},
            {'name': 'Carla Ramos', 'subject': 'Ramal Cidade nova', 'send_date': '2015-09-08 22:23:33'},
            {'name': 'Playstation', 'subject': 'Você vai ficar bem até o amanhecer?', 'send_date': '2015-09-01 22:25:36'},
            {'name': 'Facebook', 'subject': 'Solicitação de redefinição de senha', 'send_date': '2015-09-10 22:26:02'},
            {'name': 'Shell', 'subject': 'Promoção Experiências dos Sonhos - Cadastro', 'send_date': '2015-09-30 22:26:26'},
            {'name': 'Itaú', 'subject': 'Confira as ofertas imperdíveis do Sempre Presente', 'send_date': '2015-09-09 22:26:46'},
            {'name': 'Globosat Play!', 'subject': 'Temporadas fresquinhas chegaram no Globosat Play!', 'send_date': '2015-09-07 22:27:21'},
            {'name': 'Hugo Pacheco', 'subject': 'Para quem se interessa', 'send_date': '2015-09-08 18:27:10'}
        ]

        return emails
