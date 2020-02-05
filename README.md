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
Takes the relative file path to a source fluid file. Replaces the function statement with the specified file contents. Only fluid files (*.fjson, .fjs, .fts, .fcss, .fscss, .fliquid, .fhtml*) can be referenced at this time.

`{{ @inject './foo.fjs' }}`

#### use
Takes the relative file path to a template fluid file and the relative file path to a source fluid file. Replaces the occurrence of `{{ content }}` in the specified template fluid file with the contents of the specified source file, then replaces the function statement with the results of the template replacement. Only fluid files (*.fjson, .fjs, .fts, .fcss, .fscss, .fliquid, .fhtml*) can be referenced at this time.

`{{ @use './some-template.fjs' 'foo.fjs' }}`

The template file must include `{{ content }}`.
In the following example, the contents of a specified fluid file will be injected into the _container-thing_ div.
```
<div class="container-thing">
	{{ content }}
</div>
```

## Release History
* 0.2.17
	* Fixed bug with file including itself passed circular dependency test.
	* Added templates
	* Fixed bug in fluid file regex.
* 0.2.16
    * Added logger module
    * colored warning and errors
    * Trimmed whitespace on injected files
    * Trimmed leading whitespace on files with export-module
    * Checking for file collision on non-fluid file write
* 0.2.13
    * Small refactor
* 0.2.12
    * Refactored file structure
    * Broke fluid.ts into CommandRunners
* 0.2.11
    * Started file structure refactor
* 0.2.10
    * Fixed mispelled .fscss file extension
    * Output modules now have the correct types
* 0.2.8
    * Fixed package.json
* 0.2.6
    * Fixed problem caused by npm using the .gitignore file and not fetching the bin/ directory
* 0.2.5
    * Updated package.json versioning
* 0.2.1
    * Removed unimplemented fluid function
* 0.2.0
    * The first working release
    * Rewrite in TypeScript
* 0.1.0
    * Not really working JavaScript version

## Known Issues
* Files included more than once may incorrectly pass the circular dependency test.
* Templates using the inject keyword may exhibit strange behavior.

## Future Additions/Changes
* Big refactor
