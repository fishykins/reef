import json
import os
import shutil

#This script deploys the project to screeps. Its not as quick as using link, but is a nice alternative if the project requires any extra build functionality

def deployDirectory(directory, project):
    if (not os.path.isdir(directory)):
        print("ERROR: " + directory + " not found")
        return

    rootDir = os.path.join(os.path.abspath(os.curdir), "code")
    deploymentDir = os.path.join(directory, project)

    #prep file
    if (os.path.isdir(deploymentDir)):
        print("Wiping " + deploymentDir + "...")
        shutil.rmtree(deploymentDir)

    #Deploy
    shutil.copytree(rootDir, deploymentDir)

def deployProject():
    with open('config.json') as file:
        data = json.load(file)

    name = data["projectName"]
    print("Building project '" + name + "'...")

    for directory in data["directories"]:
        deployDirectory(directory, name)

    print("project deployed")

#=========================#
#if __name__ == "__main__":
deployProject()
exit
