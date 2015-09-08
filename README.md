# Requirements

    Django >= 1.7

Versão abaixo da citado acima, existe dependência do South para rodar as migrations

# Instalação

    pip install https://github.com/douglasbastos/acruxtable/archive/master.zip

#### Inclua app no INSTALLED_APPS

    INSTALLED_APPS = (
        ...
        'acruxtable',
    )


#### Adicione uma rota para app

    urlpatterns = [
        ...
        url(r'^', include('acruxtable.urls')),
    ]

#### Rode as migrations

    python manage.py migrate acruxtable

