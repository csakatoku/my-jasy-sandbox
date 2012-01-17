#!/usr/bin/env jasy
import shutil
import json
import subprocess

LOCALES = ["en", "ja"]
PACKAGE = json.load(open('jasyproject.json'))


#
# Utils
#

def getSession():
    session = Session()

    session.addProject(Project("../externals/core/"))
    session.addProject(Project("../externals/jquery/"))
    session.addProject(Project("../externals/scroller/"))
    session.addProject(Project("."))

    return session

#
# Tasks
#

@task
def clean():
    logging.info("Clearing cache...")
    session = getSession()
    session.clearCache()
    session.close()


@task
def makemessages():
    cmd = [
        'xgettext',
        '-L', 'C',
        '--keyword=tr',
        '--from-code', 'UTF-8',
        '--add-comments=Translators',
        '-o', 'source/translation/messages.pot',
        'source/class/App.js',
        ]
    subprocess.call(cmd)

    for locale in LOCALES:
        po = 'source/translation/%s.po' % locale
        cmd = [
            'msgmerge',
            '-o', po,
            po,
            'source/translation/messages.pot',
            ]
        subprocess.call(cmd)


@task
def build():
    session = getSession()

    # Configure permutations
    session.setField("es5", True)
    session.permutateField("debug")
    session.permutateField("locale", LOCALES)

    # Prepare assets
    resolver = Resolver(session.getProjects())
    resolver.addClassName("%s.App" % PACKAGE['name'])
    assets = Asset(session, resolver.getIncludedClasses()).exportBuild()

    # Write kernel script
    includedByKernel = storeKernel("build/loader.js", session, assets=assets)

    # Copy files from source
    for staticFile in ["index.html"]:
        updateFile("source/%s" % staticFile, "build/%s" % staticFile)

    # Compiler configuration
    optimization = Optimization("variables", "declarations", "blocks", "privates")
    formatting = Formatting()

    # Process every possible permutation
    for permutation in session.getPermutations():

        # Resolving dependencies
        resolver = Resolver(session.getProjects(), permutation)
        resolver.addClassName("%s.App" % PACKAGE['name'])
        resolver.excludeClasses(includedByKernel)

        # Compressing classes
        locale = permutation.get("locale")
        #storeLocale(locale)
        translation = session.getTranslation(locale)

        classes = Sorter(resolver, permutation).getSortedClasses()
        compressedCode = storeCompressed("build/app-%s.js" % permutation.getChecksum(), classes,
            permutation=permutation, translation=translation, optimization=optimization, formatting=formatting, bootCode="new %s.App();" % PACKAGE['name'])

    session.close()
