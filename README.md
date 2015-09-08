# Requisitos

    Django >= 1.7

`Obs: Versão abaixo da citado acima, pode existe dependência do South para rodar as migrations. (Não testada)`


# Instalação

#### 1. Instalação via github

    pip install https://github.com/douglasbastos/acruxtable/archive/master.zip

#### 2. Inclua app no INSTALLED_APPS

    INSTALLED_APPS = (
        ...
        'acruxtable',
    )

#### 3. Adicione uma rota para app

    urlpatterns = [
        ...
        url(r'^', include('acruxtable.urls')),
    ]

#### 4. Rode as migrations

    python manage.py migrate acruxtable

#### 5. Crie superusuário caso tenha necessidade

    python manage.py createsuperuser

# Instalação Desenvolvedor

    git clone git@github.com:douglasbastos/acruxtable.git
    pip install -e .

##### Execute os passos 2, 3 e 4 descritos acima
.

# Conhecendo o projeto

No ambiente de desenvolvimento, acesse o link abaixo e cadastre informações para alimentar json

[Cadastre emails](http://localhost:8000/admin/acruxtable/email/)

Existe um dump com o nome db.sql, para não ter a necessidade de cadastrar diversos itens na mão.

[Dump](https://github.com/douglasbastos/acruxtable/blob/master/db.sql)

Depois do servidor inicializado pode ter acesso ao json no ambiente de desenvolvimento acessando o link abaixo.

[Json com emails](http://localhost:8000/emails.json)


# Configurando make_table.js

Para customização da listagem de emails é necessário instânciar e configurar os itens abaixo.

        $(document).ready(function() {
            new MakeTable({
                'sortBy': 'date',
                'selectClass': ".items_json",
                'paginate': 10,
                'sortOrder': 'asc',
            });
        });

## sortBy
* Obrigatório

Definimos por qual elemento do json queremos ordenar.
No nosso caso pode ser `[date|name|subject]`

## selectClass
* Obrigatório

Adicionamos essa classe onde a tabela será carregada.

    Exemplo:
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

## paginate
* Opcional

Definimos quantos elementos queremos por página. Valor default é 10

## sortOrder
* Opcional

Definimos qual ordenção será feito no primeiro momento. Aceita apenas `[asc|desc]`  sendo `asc` seu valor default.

# Acessando página final

Se tudo foi instalado e configurado corretamente. Acessando o link abaixo no ambiente de desenvolvimento será possível visualizar e ordenar os itens como quiser.

[Página final](http://localhost:8000/tabela-emails.html)
--------------------

