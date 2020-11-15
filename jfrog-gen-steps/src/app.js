const parsers = require('./parsers')

async function createStep({pipeline, name, type, configuration, execution}){
  return {
    type : "step",
    pipeline: pipeline,
    data :{
      name,
      type,
      configuration,
      execution
    }
  }
}

async function dockerBuildStep(action){
  const stepData = {
    pipeline: action.params.pipeline,
    name: action.params.name,
    type: "DockerBuild",
    configuration : {
      affinityGroup: action.params.affinityGroup,
      dockerFileLocation: action.params.dockerFileLocation,
      dockerFileName: action.params.dockerFileName,
      dockerImageName: action.params.dockerImageName,
      dockerImageTag: action.params.dockerImageTag,
      dockerOptions: action.params.dockerOptions || undefined,
      integrations: [
        {name : action.params.artifactoryIntegrationName}
      ],
      inputResources: [
        {name : "git repo resouece name"}
      ]
    }
  };

  if (action.params.imageResourceNamne){
    stepData.configuration.inputResources.push({name : action.params.imageResourceNamne});
  }

  if (action.params.filespecResourceNamne){
    stepData.configuration.inputResources.push({name : action.params.filespecResourceNamne});
  }
  
  return createStep(stepData);
}

async function dockerPushStep(action){
  const parsedInputSteps = parsers.text(action.params.inputSteps);
  const inputSteps = (!parsedInputSteps) ? undefined : parsedInputSteps.map(step=>{return {name: step}});
  
  const stepData = {
    pipeline: action.params.pipeline,
    name: action.params.name,
    type: "DockerPush",
    configuration : {
      inputSteps: inputSteps,
      affinityGroup: action.params.affinityGroup,
      targetRepository: action.params.targetRepository,
      forceXrayScan: parsers.boolean(action.params.forceXrayScan),
      failOnScan: parsers.boolean(action.params.failOnScan),
      // will be set only if buildInfo Resource is specified
      autoPublishBuildInfo: undefined,
      integrations: [
        {name : action.params.artifactoryIntegrationName}
      ],
      outputResources: []
    }
  };

  if (action.params.imageResourceNamne){
    stepData.configuration.outputResources.push({name : action.params.imageResourceNamne});
  }

  if (action.params.buildInfoResourceNamne){
    stepData.configuration.autoPublishBuildInfo = true;
    stepData.configuration.outputResources.push({name : action.params.buildInfoResourceNamne});
  };
  
  return createStep(stepData);
}

async function publishBuildInfoStep(action){
  const parsedInputSteps = parsers.text(action.params.inputSteps);
  const inputSteps = (!parsedInputSteps) ? undefined : parsedInputSteps.map(step=>{return {name: step}});
  
  const stepData = {
    pipeline: action.params.pipeline,
    name: action.params.name,
    type: "PublishBuildInfo",
    configuration : {
      envInclude: action.params.envInclude || undefined,
      envExclude: action.params.envExclude || undefined,
      forceXrayScan: parsers.boolean(action.params.forceXrayScan),
      failOnScan: parsers.boolean(action.params.failOnScan),
      inputSteps: inputSteps,
      outputResources: [
        {name : action.params.buildInfoResourceNamne}
      ]
    }
  };
  
  return createStep(stepData);
}

async function promoteBuildStep(action){
  const stepData = {
    pipeline: action.params.pipeline,
    name: action.params.name,
    type: "PromoteBuild",
    configuration : {
      targetRepository: action.params.targetRepository,
      includeDependencies: parsers.boolean(action.params.includeDependencies),
      status: action.params.status || undefined,
      comment: action.params.comment || undefined,
      copy: parsers.boolean(action.params.copy),
      inputResources: [
        {name : action.params.inputBuildInfoResourceNamne, trigger: false}
      ],
      outputResources: [
        {name : action.params.outputBuildInfoResourceNamne}
      ]
    }
  };
  
  return createStep(stepData);
}

async function bashStep(action){
  const environmentVariables = parsers.environmentVariables(action.params.environmentVariables);
  const integrations = !action.params.integrations ? undefined : parsers.text(action.params.integrations).map(integration=>{return {name:integration}});
  const inputSteps = !action.params.inputSteps ? undefined : parsers.text(action.params.inputSteps).map(step=>{return {name:step}});
  const inputResources = !action.params.inputResources ? undefined : parsers.text(action.params.inputResources).map(resource=>{return {name:resource}});
  const outputResources = !action.params.outputResources ? undefined : parsers.text(action.params.outputResources).map(resource=>{return {name:resource}});
  
  const stepData = {
    pipeline: action.params.pipeline,
    name: action.params.name,
    type: "Bash",
    configuration : {
      affinityGroup: action.params.affinityGroup,
      priority: parsers.number(action.params.priority),
      timeoutSeconds: parsers.number(action.params.timeoutSeconds),
      nodePool: action.params.nodePool,
      chronological: parsers.boolean(action.params.chronological),
      environmentVariables : environmentVariables,
      integrations : integrations,
      inputSteps: inputSteps,
      inputResources: inputResources,
      outputResources: outputResources  
    },
    execution: {
      onStart: !action.parmas.onStart ? undefined : parsers.text(action.params.onStart),
      onExecute: !action.parmas.onExecute ? undefined : parsers.text(action.params.onExecute),
      onSuccess: !action.parmas.onSuccess ? undefined :  parsers.text(action.params.onSuccess),
      onFailure: !action.parmas.onFailure ? undefined : parsers.text(action.params.onFailure),
      onComplete: !action.parmas.onComplete ? undefined : parsers.text(action.params.onComplete), 
    }
  };
  
  return createStep(stepData);
}




module.exports = {
  dockerBuildStep,
  dockerPushStep,
  publishBuildInfoStep,
  promoteBuildStep,
  bashStep
};