async function createResource({name, type, configuration}){
  return {
    type : "resource",
    data :{
      name,
      type,
      configuration
    }
  }
}

async function gitRepoResource(action){
  return createResource({
    name: action.params.name,
    type: "GitRepo",
    configuration : {
      gitProvider: action.params.gitProvider,
      path: action.params.path,
      branches: {
        include: action.params.branchesInclude || undefined,
        exclude: action.params.branchesExclude || undefined
      },
      tags: {
        include: action.params.tagsInclude || undefined,
        exclude: action.params.tagsExclude || undefined
      }
    }
  })
}

async function buildInfoResource(action){
  return createResource({
    name: action.params.name,
    type: "BuildInfo",
    configuration : {
      sourceArtifactory: action.params.sourceArtifactory,
      buildName: action.params.buildName,
      buildNumber: action.params.buildNumber
    }
  })
}

async function imageResource(action){
  return createResource({
    name: action.params.name,
    type: "Image",
    configuration : {
      registry:action.params.registry,
      sourceRepository:action.params.sourceRepository,
      region:action.params.region || undefined,
      imageName:action.params.imageName,
      imageTag:action.params.imageTag,
      autoPull: action.params.autoPull && action.params.autoPull!=="false"
    }
  })
}



module.exports = {
  gitRepoResource,
  buildInfoResource,
  imageResource
};