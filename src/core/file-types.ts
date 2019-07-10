import * as path from 'path'

export const fluidFileTypes = ['.fjson', '.fjs', '.fts', '.fcss', '.fcscc', '.fliquid', '.fhtml'];

export const isFluidFile = (fileName: string) => {
  const fileExtension = path.extname(fileName);
  const isValidFluidFile = fluidFileTypes.reduce((previous: boolean, current: string) => previous || fileExtension == current, false);
  return isValidFluidFile;
};
