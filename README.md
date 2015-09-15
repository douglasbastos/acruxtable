# Requisitos

    Django >= 1.7

`Obs: Versões abaixo da citado acima, pode existe dependência do South para rodar as migrations. (Não testada)`


# Instalação

#### 1. Instalação via github

```
$ pip install https://github.com/douglasbastos/acruxtable/archive/master.zip
```
#### 2. Inclua app no INSTALLED_APPS
```
INSTALLED_APPS = (
    ...
    'acruxtable',
)
```
#### 3. Adicione uma rota para app

```
urlpatterns = [
    ...
    url(r'^', include('acruxtable.urls')),
]
```
#### 4. Rode as migrations
```
$ python manage.py migrate acruxtable
```
#### 5. Crie superusuário caso tenha necessidade
```
$ python manage.py createsuperuser
```
# Desenvolvimento
```
$ git clone git@github.com:douglasbastos/acruxtable.git
```
```
$ make setup
```
```
$ make run
```
# Conhecendo o projeto

[Cadastro de emails](http://localhost:8000/admin/acruxtable/email/)

[Json com emails](http://localhost:8000/emails.json)

# Configurando acruxTable.js

Para customização da listagem de emails é necessário instânciar e configurar os itens abaixo.
```
    $(document).ready(function() {
        new AcruxTable({
            'url': 'emails.json',
            'sortBy': 'date',
            'selectClass': ".items_json",
            'paginate': 10,
            'sortOrder': 'asc',
        });
    });
```
## url
* Obrigatório

Definimos em qual endereço será buscado o json.

## sortBy
* Obrigatório

Definimos por qual elemento do json queremos ordenar.
No nosso caso pode ser `[date|name|subject]`.

## selector
* Obrigatório

Adicionamos essa classe onde a tabela será carregada.
```
<table>
    <thead>
        <tr>
            <th class="name">Nome</th>
            <th class="subject">Assunto</th>
            <th class="date">Data</th>
        </tr>
    </thead>
    <tbody class="items_json">
    </tbody>
</table>
```
## paginate
* Opcional

Definimos quantos elementos queremos por página. Valor default é 10.

## sortOrder
* Opcional

Definimos qual ordenação será feito no primeiro carregamento. Aceita apenas `[asc|desc]`  sendo `asc` seu valor default.

## page
* Opcional

Definimos em qual página de itens a tabela será iniciada. Seu valor default é 1.

# Acessando página final

Se tudo foi instalado e configurado corretamente. Acessando o link abaixo no seu ambiente local será possível visualizar, ordenar e pesquisar nos itens como quiser.

[Resultado](http://localhost:8000/tabela-emails.html)
--------------------

![Exemplo!](http://oi59.tinypic.com/szzxg0.jpg)


#### Bibliotecas usadas no desenvolvimento
* [Jquery](https://jquery.com/)
* [Underscore.js](http://underscorejs.org/)
* [simplePagination](http://flaviusmatis.github.io/simplePagination.js/)


