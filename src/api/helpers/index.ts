import axiosInstance from '..';

export const getDataList = async <T>(
  table_name: string,
  params?: Record<string, string | number>,
): Promise<T[]> => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data;
};

export const getDataDetails = async <T>(
  table_name: string,
  params?: Record<string, string | number>,
): Promise<T> => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendNewData = async (table_name: string, newData: Record<string, any>) => {
  await axiosInstance.post(`/${table_name}`, newData);
};

export const updateData = async (
  table_name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedData: Record<string, any>,
  params?: Record<string, string | number>,
) => {
  await axiosInstance.patch(`/${table_name}`, updatedData, { params });
};

export const deleteData = async (table_name: string, params?: Record<string, string>) => {
  await axiosInstance.delete(`/${table_name}`, { params });
};
