import json
import os

#Use this for quick and easy access to the project from all servers.
#Before linking, you need to create the branch via the ingame editor. Duno why

def linkDirectory(directory, project):
    if (not os.path.isdir(directory)):
        print("ERROR: " + directory + " not found")
        return

    projectPath = os.path.join(directory, project)

    if (os.path.isdir(projectPath)):
        print(projectPath + " cant create a symlink- there is already a folder with this name!")
        return

    rootDir = os.path.join(os.path.abspath(os.curdir), "code")

    try:
        os.symlink(rootDir, projectPath)
        print(projectPath + " successfully linked!")
    except:
        print("ERROR:" + projectPath + " failed to link")


def linkProject():
    with open('config.json') as file:
        data = json.load(file)

    name = data["projectName"]
    print("Building project '" + name + "'...")

    for directory in data["directories"]:
        linkDirectory(directory, name)

#=========================#
if __name__ == "__main__":
    linkProject()
