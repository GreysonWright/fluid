import * as path from 'path';
import * as fs from 'fs';
import { CommandRunner } from './CommandRunner';
import { ICommandRunner } from './ICommandRunner';
import { analyzer, executor, Preprocessor, indexer, FluidIndex, FileCache, IFluidConfig, ConfigReader } from '../../base/core';

export class Build extends CommandRunner implements ICommandRunner {
  fluidConfig: IFluidConfig;
  writtenFiles: Map<string, boolean>;

  private getFluidConfig() {
    const configReader = new ConfigReader(this.workingDirectory);
    const config = configReader.getFluidConfig();
    return config;
  }

  constructor(params: string[]) {
    super(params);
    this.fluidConfig = this.getFluidConfig();
    this.writtenFiles = new Map<string, boolean>();
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
    if (!this.writtenFiles.has(outputFilePath)) {
      fs.writeFileSync(outputFilePath, modifiedFluidData);
      this.writtenFiles.set(outputFilePath, true);
    } else {
      console.warn(`File conflict! The exported file at '${outputFilePath}' already exists and will not be overwitten.`);
    }
  }

  execute() {
    const { src_dir, exclude } = this.fluidConfig;
    const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(src_dir, exclude);
    const processedFiles = this.getProcessedFiles(fluidFiles);
    const fluidFileCache = FileCache.shared();

    processedFiles.forEach((file) => {
      if (!fluidFileCache.has(file.name)) {
        const fileData = fs.readFileSync(file.name, 'utf8');
        fluidFileCache.set(file.name, fileData);
      }
      let fileData = fluidFileCache.get(file.name)!;
      const fluidFunctions = analyzer.getFluidFunctions(fileData);
      fluidFunctions.forEach((fluidFunction) => {
        fileData = fluidFileCache.get(file.name)!;
        const fluidResults = executor.execute(fluidFunction, fileData, { fluidFile: file, referenceFilePath: file.name });
        fluidFileCache.set(file.name, fluidResults);
      })
      if (file.shouldOutput) {
        const modifiedFluidData = fluidFileCache.get(file.name)!;
        this.writeFileData(file.name, modifiedFluidData);
      }
    });

    nonFluidFiles.foreach((_, filePath) => {
      const fileData = fs.readFileSync(filePath, 'utf8');
      this.writeFileData(filePath, fileData);
    });
  }
}