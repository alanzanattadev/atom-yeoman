'use babel'
// @flow weak

import {React, ReactDOM} from 'react-for-atom';
import ProjectSelectionPanel from './components/ProjectSelectionPanel';

function selectCurrentFileProject({name, type}) {
  let parentFolders = [];
  let parentFolder = atom.workspace.getActivePaneItem().buffer.file.getParent();
  while (parentFolder.getBaseName() != "") {
    parentFolders.push(parentFolder);
    parentFolder = parentFolder.getParent();
  }
  let existsPromises = parentFolders.map((path) => new Promise((resolve, reject) => {
    path[type == "file" ? "getFile" : "getSubdirectory"](name).exists().then((fileExists) => {
      resolve(fileExists);
    });
  }));
  return Promise.all(existsPromises).then(
    (results) => (results.includes(true) ? parentFolders[results.findIndex((exists) => exists)].getPath() : null)
  );
}

function selectProjectWithUI(panel, container) {
  return new Promise(function(resolve, reject) {
    ReactDOM.render(
      <ProjectSelectionPanel
        directories={atom.project.getDirectories()}
        onProjectSelected={(project) => {
          disposable.dispose();
          panel.hide();
          resolve(project);
        }}
      />, container
    );
    let disposable = panel.onDidChangeVisible((visible) => {
      if (!visible) {
        disposable.dispose();
        reject("Cancelled");
      }
    });
    panel.show();
  });
}

function selectProject({name, type}, panel, container, forceUserSelection) {
  if (!forceUserSelection && atom.workspace.getActivePaneItem()) {
    return selectCurrentFileProject({name, type}).then((path) => path || selectProject({name, type}, panel, container, true));
  } else if (atom.project.getDirectories().length > 1) {
    return selectProjectWithUI(panel, container);
  } else if (atom.project.getDirectories().length == 1) {
    return Promise.resolve(atom.project.getDirectories()[0].getPath())
  } else {
    return Promise.reject();
  }
}

export default {selectProject};
