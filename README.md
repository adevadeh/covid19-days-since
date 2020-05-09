<!--
title: 'covid-19 days since'
description: 'This is a trivial example site built to practice with new technologies and give us some hope in these days with the COVID-19 crisis circling the globe.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
-->

# covid19-days-since

## Overview
This is a trivial example site built to practice with new technologies and give us some hope in these days with the COVID-19 crisis circling the globe. It is a take on the "0 days since" idea that you find in many work sites and 

### Built using:
* Serverless Framework
* Node JS
* AWS Lambda

Data sourced from the excellent data department at John's Hopkins: https://github.com/CSSEGISandData/COVID-19

Data also provided by: https://github.com/BlankerL/DXY-COVID-19-Data

### Goals:
* M1 - deploy a function to AWS Lambda
* M2 - make it minimally functional
* M3 - use real data from the data repo
* M4 - automate updates using another lambda

### Contributions

If you wish to contribute, pull requests are welcome. 
If interested in collaboration, contact jinyaodesandies@gmail.com

### Getting Started

$ npm install
$ sls offline
$ open http://localhost:3000
