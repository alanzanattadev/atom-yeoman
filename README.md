# Yeoman

Yeoman integration for Atom, scaffold projects and components directly from Atom !

![Yeoman Logo](http://yeoman.io/static/yeoman-02.83c46c7213.png)
## REQUIRED PACKAGES
  - ### task-runner

## Features

  - Generator listed in a beautiful side panel
  - Answer to questions from Atom !
  - Project selection with default to current opened file project
  - Generator runtime status

## Generator Panel

Automated lookup of globally installed packages with beautiful UI.
You just have to click to run a generator, it's faster than ever

![Generators screenshot](https://raw.githubusercontent.com/alanzanattadev/atom-yeoman/master/right-panel-screenshot.png)

## Questions / Answers

### Supported question type
  - List
  - RawList
  - Checkbox
  - Expand (limited support for now)
  - Input
  - Password
  - Confirm

![Question form screenshot](https://raw.githubusercontent.com/alanzanattadev/atom-yeoman/master/question-form-screenshot.png)

## Runtime status

A real time status of running generators is printed in the status bar.

![Task runner screenshot](https://raw.githubusercontent.com/alanzanattadev/atom-yeoman/master/task-runner-screenshot.png)

## How it works

It execs generator lookup in Atom to render the generator list and then forks to execute the selected generator, communicate with child process to get the questions and to send answers.

This way it can cancel the generation and keep the current working directory.

## KNOWN ISSUES
  - filters, validaters and defaults (as function) attributs of questions are not supported yet
  - InquireJS Separators are not supported yet

## Contributions

Feel free to send me PR !
