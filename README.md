My Jasy Sandbox
================

JasyとCoreの使い方を練習するための個人的なレポジトリです。

- https://github.com/wpbasti/jasy
- https://github.com/wpbasti/core

cloneした直後に以下のコマンドを実行して、サブモジュールを取得してください。

    $ git submodule init
    $ git submodule update

現在のところ、jasy==0.5.0でしか動きません。

    $ pip install https://github.com/wpbasti/jasy/zipball/0.5-beta5

各プロジェクトのビルドの仕方は、

    $ cd helloworld
    $ jasy jasyscript.py build
