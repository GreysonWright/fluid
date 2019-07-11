# Product Name
> Please note that fluid is in its early stages, so there are probably lots of bugs.

**Commands**
 * **init** - creates fluid.json in current directory
 * **build** - builds files in specified source directory and outputs the results in the specified output directory
 * **more to come**

## Installation

OS X Linux & Windows:

```sh
npm install fluid -g --registry https://npm.southernshirt.com
```

## Usage Examples

#### export-module
Takes no parameters. All files including this function will be written to the output directory. It is preferred that this function is included at the very top of the file.

`{{ @export-module }}`

#### inject
Takes the relative file path of a fluid file. Replaces the function statement with the specified file contents. Only fluid files (*.fjson, .fjs, .fts, .fcss, .fcscc, .fliquid, .fhtml*) can be referenced at this time. 

`{{ @inject './foo.fjs' }}`


## Release History
* 0.2.9
    * Updated readme
* 0.2.8
    * Fixed package.json
* 0.2.7
    * Updated readme
* 0.2.6
    * Fixed problem caused by npm using the .gitignore file and not fetching the bin/ directory
* 0.2.5
    * Updated package.json versioning
* 0.2.4
    * Updated readme
* 0.2.3
    * Fixed npm readme
* 0.2.2
    * Attempted to add readme to npm
* 0.2.1
    * Removed unimplemented fluid function
* 0.2.0
    * The first working release
    * Rewrite in TypeScript
* 0.1.0
    * Not really working JavaScript version

## Known Issues

## Future Additions/Changes
* Big refactor
