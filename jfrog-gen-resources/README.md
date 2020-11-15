# JFrog-Resources
JFrog yml generator for resources


## Method: Add GitRepo Resource

**Description:**

Create a new resource of type GitRepo.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/GitRepo]

**Parameters:**

* Resource name - The name of the new resouece.
* git integration name - The name of the source control integration.
* Path - The path of the repository from the integration root.
* Branches Include - (optional) Regular expression to include branches from the repo.
* Branches Exclude - (optional) Regular expression to exclude branches from the repo 
* Tags Include - (optional) Regular expression to include tags meeting the pattern from the repo
* Tags Exclude - (optional) Regular expression to exclude tags meeting the pattern from the repo

## Method: Add BuildInfo Resource

**Description:**

Create a new resource of type BuildInfo.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/BuildInfo]

**Parameters:**

* Resource name - The name of the new resouece.
* Source Artifactory - The name of the Artifactory Integration	
* Build Name - The name of the build to associate with this BuildInfo. Recommend using the environment variable available from the  step that generated the build.
* Build Number - The number of the build to associate with this BuildInfo. Recommend using the environment variable available from the step that generated the build.

## Method: Add Image Resource

**Description:**

Create a new resource of type Image.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/Image]

**Parameters:**

* Resource name - The name of the new resouece.
* Registry - The name of a Docker Registry Integration	
* Source Repository - The name of the repository in Artifactory to which the images will be published
* Region - An  AWS region identifier
* Image Name - The file path of the Docker image, of the form imageRepo/imageName
* Tage Tag - The version tag of the initial version of the Docker image
* Auto Pull - When true, the image is automatically pulled to the machine running the step.
