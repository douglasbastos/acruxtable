# coding: utf-8

from django.http import JsonResponse
from django.views.generic import TemplateView
from .models import Email


def list_emails(request, **kwargs):
    emails = Email.objects.all()
    items = []
    for email in emails:
        item_email = {
            'name': email.name,
            'subject': email.subject,
            'date': email.send_date
            }
        items.append(item_email)
    response = JsonResponse(items, safe=False)
    return response


class TableEmails(TemplateView):
    template_name = 'acruxtable/table.html'
