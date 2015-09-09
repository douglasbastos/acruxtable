# coding: utf-8
from setuptools import find_packages, setup

setup(
    name='acruxtable',
    description='Desafio',
    author='Douglas Bastos',
    author_email='douglashsb@gmail.com',
    url='https://github.com/douglasbastos/acruxtable',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Django >= 1.7
    ]
)
