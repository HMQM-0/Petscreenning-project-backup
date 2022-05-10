export const parseHomePageCollectionJson = (descriptionJson: any): string => {
  if (!descriptionJson) {
    return "";
  }
  
  const object = JSON.parse(descriptionJson);
  return object.blocks[0].text;
};
