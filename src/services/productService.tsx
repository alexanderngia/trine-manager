import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/warehouse`;

export interface RegisterProps {
  imgItemNew: string;
  nameItemNew: string;
  qualityItemNew: string;
  colorItemNew: string;
  sizeItemNew: string;
  priceItemNew: string;
}
export interface UpdateProps extends RegisterProps {
  id: number;
}

const getProductBoard = (idProduct: string | number) => {
  return axios.get(API_URL + `?id=${idProduct}`);
};

const handleRegisterApi = ({
  imgItemNew,
  nameItemNew,
  qualityItemNew,
  colorItemNew,
  sizeItemNew,
  priceItemNew,
}: RegisterProps) => {
  return axios.post(API_URL + "/create", {
    imgItem: imgItemNew,
    nameItem: nameItemNew,
    qualityItem: qualityItemNew,
    colorItem: colorItemNew,
    sizeItem: sizeItemNew,
    priceItem: priceItemNew,
  });
};

const handleUpdateApi = async ({
  id,
  imgItemNew,
  nameItemNew,
  qualityItemNew,
  colorItemNew,
  sizeItemNew,
  priceItemNew,
}: UpdateProps) => {
  return await axios.put(API_URL + "/edit", {
    id: id,
    imgItem: imgItemNew,
    nameItem: nameItemNew,
    qualityItem: qualityItemNew,
    colorItem: colorItemNew,
    sizeItem: sizeItemNew,
    priceItem: priceItemNew,
  });
};
const handleDeleteApi = async (userId: any) => {
  return await axios.delete(API_URL + "/delete", {
    data: {
      id: userId,
    },
  });
};

const productService = {
  handleRegisterApi,
  handleUpdateApi,
  handleDeleteApi,
  getProductBoard,
};
export default productService;
