# coding: utf-8

from django.db import models


class Email(models.Model):
    name = models.CharField('Nome', max_length=55)
    subject = models.CharField('Assunto', max_length=55)
    send_date = models.DateTimeField()

    class Meta:
        verbose_name = u'Email'
        verbose_name_plural = u'Emails'

    def __unicode__(self):
        return self.name
