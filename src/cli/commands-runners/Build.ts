import * as path from 'path';
import * as fs from 'fs';
import { CommandRunner } from './CommandRunner';
import { ICommandRunner } from './ICommandRunner';
import { analyzer, executor, Preprocessor, indexer, FluidIndex, FileCache, IFluidConfig, ConfigReader } from '../../base/core';

export class Build extends CommandRunner implements ICommandRunner {
  fluidConfig: IFluidConfig;

  private getFluidConfig() {
    const configReader = new ConfigReader(this.workingDirectory);
    const config = configReader.getFluidConfig();
    return config;
  }

  constructor(params: string[]) {
    super(params);
    this.fluidConfig = this.getFluidConfig();
  }

  private getProcessedFiles(fluidFiles: FluidIndex) {
    const preprocessor = new Preprocessor();
    const processedFiles = preprocessor.processFiles(fluidFiles);
    return processedFiles;
  }

  private getCorrectFileExtension(filePath: string) {
    const correctFileExtension = filePath.replace(/\.f(\S*)/, '.$1')
    return correctFileExtension;
  }

  private getOutputPath(filePath: string, fluidConfig: IFluidConfig) {
    const srcPath = fluidConfig.src_dir;
    const outPath = fluidConfig.output_dir;
    const outputFilePath = filePath.replace(srcPath, outPath);
    const correctedExtension = this.getCorrectFileExtension(outputFilePath);
    return correctedExtension;
  }

  private writeFileData(filePath: string, modifiedFluidData: string) {
    const outputFilePath = this.getOutputPath(filePath, this.fluidConfig);
    const parentDirectory = path.dirname(outputFilePath);
    if (!fs.existsSync(parentDirectory)) {
      fs.mkdirSync(parentDirectory, { recursive: true });
    }
    fs.writeFileSync(outputFilePath, modifiedFluidData);
  }

  execute() {
    const { src_dir, exclude } = this.fluidConfig;
    const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(src_dir, exclude);
    const processedFiles = this.getProcessedFiles(fluidFiles);
    const fileCache = FileCache.shared();

    processedFiles.forEach((file) => {
      if (!fileCache.has(file.name)) {
        const fileData = fs.readFileSync(file.name, 'utf8');
        fileCache.set(file.name, fileData);
      }
      let fileData = fileCache.get(file.name)!;
      const fluidFunctions = analyzer.getFluidFunctions(fileData);
      fluidFunctions.forEach((fluidFunction) => {
        fileData = fileCache.get(file.name)!;
        const fluidResults = executor.execute(fluidFunction, fileData, { fluidFile: file, referenceFilePath: file.name });
        fileCache.set(file.name, fluidResults);
      })
      if (file.shouldOutput) {
        // ****
        // check filecache maybe?
        console.warn('Check if is written by fluid function');
        // ****
        const modifiedFluidData = fileCache.get(file.name)!;
        this.writeFileData(file.name, modifiedFluidData);
      }
    });

    nonFluidFiles.foreach((_, filePath) => {
      const fileData = fs.readFileSync(filePath, 'utf8');
      this.writeFileData(filePath, fileData);
    });
  }
}