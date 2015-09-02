# coding: utf-8
import json

from django.test import TestCase
from django.test.client import Client
from django.core.urlresolvers import reverse as r

from ...models import Email
from ... import views


class EmailsJsonTest(TestCase):

    def setUp(self):
        self.client = Client()

        self.email = Email.objects.create(name='name1', subject='Assunto 1')
        self.email2 = Email.objects.create(name='name2', subject='Assunto 2')

        url = r(views.list_emails)
        self.resp = self.client.get(url)

    def test_url(self):
        self.assertEqual(self.resp.status_code, 200)

    def test_count_items_json(self):
        items = json.loads(self.resp.content)
        self.assertEqual(len(items), 2)
