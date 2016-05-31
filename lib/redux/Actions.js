'use babel'

import yeoman from "yeoman-environment";
import YeomanAdapter from '../YeomanAdapter';
let env = yeoman.createEnv();
env.adapter = YeomanAdapter;

let creators = {
  createGeneratorsRefreshedAction: function(generators) {
    return {
      type: "GENERATORS_REFRESHED",
      generators
    };
  },
  refreshGenerators: function() {
    return (dispatch) => {
      // dispatch(creators.createGeneratorsRefreshAction());
      env.lookup(function() {
        let meta = env.getGeneratorsMeta();
        console.log(meta);
        let generators = Object.keys(meta).map(str => ({namespace: str.split(':')[0], name: str.split(':')[1]}));
        dispatch(creators.createGeneratorsRefreshedAction(generators));
      })
      // dispatch(creators.createGeneratorsRefreshedErrorAction(, error));
    };
  },
};

export default creators;
