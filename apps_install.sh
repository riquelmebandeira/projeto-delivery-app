#!/bin/bash

printf "\n> Instalando o front-end\n"
frontFolder="./front-end"
cacheFolderFront="/tmp/frontend-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${frontFolder} --cache $cacheFolderFront

printf "\n> Instalando o back-end\n"
backFolder="./back-end"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack
