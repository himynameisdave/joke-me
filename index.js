#!/usr/bin/env node
"use strict";
const commander  = require("commander");
const clor       = require("clor");
const request    = require("request-promise");
const version    = require("./package.json").version;
const endpoint   = {
                      main:  "https://www.reddit.com/r/jokes/.json",
                      clean: "https://www.reddit.com/r/cleanjokes/.json"
                    };

//    Register arguments with commander
commander.version(version)
          .option('-s, --sfw', 'tells a SFW joke')
          .parse(process.argv);
//    See if it should be a SFW joke or not
let url = commander.sfw ? endpoint.clean : endpoint.main;
console.log("Preparing your joke...\n\n\n")
//  Request the JSON data
request(url)
  .then( data => {
    let parsed   = JSON.parse(data).data.children,
        l = parsed.length,
        n = Math.floor(Math.random() * (l - 1)) + 1,
        title = parsed[n].data.title,
        selftext = parsed[n].data.selftext;
        console.log("\n"+clor.blue.underline(title));
        console.log(clor.yellow(selftext)+"\n\n\n");
        process.exit(1);
  })
  .catch( err => {
    console.warn(err);
    process.exit(0);
  });
