const JfrogYml = require("./jfrog-yml");

const { writeFile } = require("fs");
const parsers = require("./parsers");

async function createYml(action) {
  const results = action.params.results;
  const yml = new JfrogYml(results);

  const yamlString = yml.toString();

  if (action.params.outputPath){
    await new Promise((resolve,reject)=>{
      writeFile(action.params.outputPath,yamlString,{encoding:"utf-8"},(err)=>{
        if (err) reject(err);
        resolve();
      });
    })
  }

  return yamlString;
}

async function createPipeline(action) {
  const pipeline = {
    type: "pipeline",
    data: {
      name: action.params.name,
      configuration: {},
    },
  };

  const envVariables = parsers.environmentVariables(
    action.params.environmentVariables
  );
  if (envVariables) {
    pipeline.data.configuration.environmentVariables = {
      readOnly: envVariables,
    };
  }

  return pipeline;
}

module.exports = {
  createPipeline,
  createYml,
};
