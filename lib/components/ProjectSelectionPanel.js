'use babel'
// @flow weak

import {React} from 'react-for-atom';

let Project = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },
  render: function() {
    return (
      <div className="project" onClick={this.props.onClick}>
        <span>{this.props.path}</span>
      </div>
    );
  },
});

let Projects = React.createClass({
  propTypes: {
    projects: React.PropTypes.array.isRequired,
    onProjectSelected: React.PropTypes.func.isRequired,
  },
  render: function() {
    return (
      <div className="projects">
        {this.props.projects.map((project, i) => <Project onClick={() => this.props.onProjectSelected(project)} key={`project${i}`} path={project.path}/>)}
      </div>
    );
  },
});

export default React.createClass({
  propTypes: {
    directories: React.PropTypes.array.isRequired,
    onProjectSelected: React.PropTypes.func.isRequired,
  },
  render: function() {
    return (
      <div className="project-selection-panel">
        <Projects onProjectSelected={this.props.onProjectSelected} projects={this.props.directories.map(directory => ({path: directory.getPath()}))}/>
      </div>
    );
  }
});
