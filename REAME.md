#Instalação

#### Inclua app no INSTALLED_APPS

    INSTALLED_APPS = (
        'acruxtable'
    )


#### Adicione uma rota para app

    urlpatterns = [
        ...
        url(r'^', include('acruxtable.urls')),
        ...
    ]
