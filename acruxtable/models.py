# coding: utf-8

from django.db import models


class Email(models.Model):
    name = models.CharField('Nome', max_length=55)
    subject = models.TextField('Corpo da mensagem')
    send_date = models.DateTimeField(editable=False, auto_now_add=True)

    class Meta:
        verbose_name = u'Email'
        verbose_name_plural = u'Emails'

    def __unicode__(self):
        return self.name
