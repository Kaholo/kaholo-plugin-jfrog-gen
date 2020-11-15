# JFrog-Steps
JFrog yml generator for steps


## Method: Add DockerBuild step

**Description:**

Create a new DockerBuild step.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/DockerBuild]

**Parameters:**

* Pipeline - the name of the pipeline to add the step to.
* Step name - The name of the new step.
* Affinity Group - Must specify an affinity group string that is the same as specified in a subsequent DockerPush step.	
* Dockerfile Location - Directory containing the Dockerfile or the file that has Docker build configuration.
* Dockerfile Name - Name of the Dockerfile.
* Docker Image Name - The name of the Docker image to create. This can be set using environment variables or triggering a run using parameters.	
* Docker Image Tag - The tag for the Docker image to create. This can be set using environment variables or triggering a run using parameters.	
* Docker build options - Additional options for the  docker build command.
* Artifactory Integration Name - Artifactory integration name.
* GitRepo Resource Name - a GitRepo resource (that contains the DockerFile).
* Image Resource Namne - (optional) an Image resource of a base Image to include in the built Image.
* Filespec Resource Namne - (optional) a FileSpec resource that specifies what files to include in the built Image. These files are automatically copied to dockerFileLocation.


## Method: Add DockerPush step

**Description:**

Create a new DockerPush step.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/DockerPush]

**Parameters:**

* Pipeline - the name of the pipeline to add the step to.
* Step name - The name of the new step.
* Affinity Group - Must specify an affinity group string that is the same as specified in a prior DockerBuild step.	
* Target Repository - The name of the Docker repository in Artifactory.
* Force Xray Scan - When true, forces a scan of the pushed image by JFrog Xray. Default is false.
* Fail On Scan - When true, a failed Xray scan will result in a failure of the step. Default is true.
* Artifactory Integration Name - Must specify an Artifactory Integration.
* Input Steps - Must specify the named DockerBuild step in the same affinity group.	
* Image Resource Namne - (optional) May specify an Image resource. If one is specified, the imageTag  property of that resource will be updated with the dockerImageTag of the preceding DockerBuild step.
* BuildInfo Resource Name - (optional) if specified, sets `autoPublishBuildInfo` to `true`. The buildName and buildNumber properties are automatically set to $pipeline_name and $run_number.


## Method: Add PublishBuildInfo step

**Description:**

Create a new PublishBuildInfo step.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/PublishBuildInfo]

**Parameters:**

* Pipeline - the name of the pipeline to add the step to.
* Step name - The name of the new step.
* Env Include - Pattern for which environment variables to include. Default is to include all the environment variables.
* Env Exclude - Pattern for which environment variables to exclude. This is applied in addition to the base exclude pattern applied to all build info.	
* Force Xray Scan - When true, forces a scan of the pushed image by JFrog Xray. Default is false.
* Fail On Scan - When true, a failed Xray scan will result in a failure of the step. Default is true.
* Input Steps - Must specify a named step. The step must not have set autoPublishBuildInfo to true.
* BuildInfo Resource Name - Must specify a BuildInfo resource to publish. The buildName and buildNumber properties are automatically set to $buildName and $buildNumber if defined, or $pipeline_name and $run_number if the are not and inputSteps is a native step.

## Method: Add PromoteBuild step

**Description:**

Create a new PromoteBuild step.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/PromoteBuild]

**Parameters:**

* Pipeline - the name of the pipeline to add the step to.
* Step name - The name of the new step.
* Target Repository - The name of the repository in Artifactory to promote the build to.
* Include Dependencies - When set to true, promotion will include the build dependencies. Defaults to false.
* Status - Name of the status to promote the build to.
* Comment - Comment to include for the promotion.
* Copy - When set to true, copies the artifacts to the targetRepository vs moving them to the targetRepository. Defaults to false.
* Input BuildInfo Resource - Must specify a named BuildInfo resource whose buildName and buildNumber properties identify the build to promote.	
* Output BuildInfo Resource - Must specify a named BuildInfo resource to map to the promoted build. The BuildInfo will be updated with the buildName and buildNumber of the input BuildInfo resource, and its targetRepo with the value of targetRepository.

## Method: Add Bash step

**Description:**

Create a new Bash step.
Further infomration can be found on (JFrog's documentation)[https://www.jfrog.com/confluence/display/JFROG/Bash]

**Parameters:**

* Pipeline - the name of the pipeline to add the step to.
* Step name - The name of the new step.
* Affinity Group - Label that controls affinity to a Node. All the steps with the same affinityGroup will be executed on the same node. This will allow sharing state between the steps. An example is having the same affinityGroup for DockerBuild and DockerPush steps in a Pipeline so that Image being built in the DockerBuild step can be used to published in the DockerPush step.
* Priority - Controls the priority of a step when there are parallel steps in a pipeline or multiple pipelines executing.  Steps will a lower number will run before steps with higher numbers. For example, priority 10 will run before priority 100. The default priority is 9999.
* Status - Time limit, in the number of seconds, for the step to complete. If the step does not complete in the given time limit, the step will be forced to a completion state of failed.	
* Node Pool - Assigns the node pool the step executes on. If node pool isn't specified, a step will execute on the default node pool. See here to learn more about node pool.
* Chronological - Specifies the step must execute in chronological order, to ensure receipt of all state updates from preceding steps.
A step with chronological:true will execute only when previously triggered chronological steps in that pipeline are complete across all runs.
* Environment Variables - Assigns any environment variables and their strings in key:value format. All environment variables assigned within a step definition are active only for the scope of the execution of that step.
* Integrations names - A collection of integrations that will be used by this step. Integrations can be used directly in step without a resource.
* Input steps names - A collection of named steps whose completion will trigger execution of this step.	
* Input resources names - A collection of named resources that will be used by this step as inputs. 
* Output resources names - A collection of named resources that will be generated or changed by this step.
* On Start - Commands to execute in advance of onExecute.
* On Execute - Main commands to execute for the step.
* On Success - Commands to execute on successful completion of onExecute.
* On Failure - Commands to execute on failed completion of onExecute.
* On Complete - Commands to execute on any completion of onExecute.