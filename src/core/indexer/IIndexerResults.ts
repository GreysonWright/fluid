import { FluidIndex, NonFluidIndex } from './indexer-core';


export interface IIndexerResults {
  fluidFiles: FluidIndex;
  nonFluidFiles: NonFluidIndex;
}
