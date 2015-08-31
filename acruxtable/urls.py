# coding: utf-8
from django.conf.urls import url
from .views import list_emails

urlpatterns = [
    url(r'list', list_emails, name='list_emails'),
]
