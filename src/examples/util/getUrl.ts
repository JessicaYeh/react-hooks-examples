interface Options {
  text: string;
  monochrome: boolean;
  width?: number;
  height?: number;
}

export const getUrl = (options: Options) => {
  const { text, monochrome, width = 600, height = 400 } = options;
  return `https://cataas.com/cat${
    text ? `/says/${text}` : ''
  }?width=${width}&height=${height}${monochrome ? '&filter=mono' : ''}`;
};
