export const formateNftAddress = (data: string) => {
  return (
    data.substring(0, 5) + "..." + data.substring(data.length - 5, data.length)
  );
};

export const formateTokenId = (data: string) => {
  if (data.length < 6) {
    return data;
  } else {
    return formateNftAddress(data);
  }
};

export const formateEthPrice = (data: string, decimal: number) => {
  return (Number(data) / 10 ** decimal).toFixed(decimal);
};
