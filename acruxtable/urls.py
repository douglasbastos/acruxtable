# coding: utf-8
from django.conf.urls import url
from .views import list_emails, TableEmails

urlpatterns = [
    url(r'emails.json', list_emails, name='emails'),
    url(r'tabela-emails.html', TableEmails.as_view(), name='table_emails'),
]
