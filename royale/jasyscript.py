#!/usr/bin/env jasy
import shutil
import json

PACKAGE = json.load(open('jasyproject.json'))


#
# Utils
#

def getSession():
    session = Session()

    session.addProject(Project("../externals/core/"))
    session.addProject(Project("./external/hogan.js/"))
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
def build():
    session = getSession()

    # Configure permutations
    session.setField("es5", True)
    session.permutateField("debug")

    # Prepare assets
    resolver = Resolver(session.getProjects())
    resolver.addClassName("%s.App" % PACKAGE['name'])
    assets = Asset(session, resolver.getIncludedClasses()).exportBuild()

    # Write kernel script
    includedByKernel = storeKernel("build/loader.js", session, assets=assets)

    # Copy files from source
    for staticFile in ["index.html", "zepto.min.js"]:
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
        classes = Sorter(resolver, permutation).getSortedClasses()
        compressedCode = storeCompressed("build/app-%s.js" % permutation.getChecksum(), classes,
            permutation=permutation, optimization=optimization, formatting=formatting, bootCode="window.APP = new %s.App();window.APP.boot();" % PACKAGE['name'])

        compressedTestCode = storeCompressed("build/app-test-%s.js" % permutation.getChecksum(), classes,
            permutation=permutation, optimization=optimization, formatting=formatting, bootCode="")

    session.close()
