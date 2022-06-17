import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/warehouse`;

export interface RegisterProps {
  idItemNew: string;
  imgItemNew: string;
  urlItemNew: string;
  nameItemNew: string;
  bodyItemNew: string;
  bodyHtmlItemNew: string;
  qualityItemNew: string;
  colorItemNew: string;
  sizeItemNew: string;
  priceItemNew: string;
  categoryItemNew: string;
  keywordTagItemNew: string;
  titleTagItemNew: string;
  descripTagItemNew: string;
  authorItemNew: string;
}
export interface UpdateProps extends RegisterProps {
  id: number;
}

const getProductBoard = (idProduct: string | number) => {
  return axios.get(API_URL + `?id=${idProduct}`);
};

const handleRegisterApi = ({
  idItemNew,
  imgItemNew,
  urlItemNew,
  nameItemNew,
  bodyItemNew,
  bodyHtmlItemNew,
  qualityItemNew,
  colorItemNew,
  sizeItemNew,
  priceItemNew,
  categoryItemNew,
  keywordTagItemNew,
  titleTagItemNew,
  descripTagItemNew,
  authorItemNew,
}: RegisterProps) => {
  return axios.post(API_URL + "/create", {
    idItem: idItemNew,
    imgItem: imgItemNew,
    urlItem: urlItemNew,
    nameItem: nameItemNew,
    bodyItem: bodyItemNew,
    bodyHtmlItem: bodyHtmlItemNew,
    qualityItem: qualityItemNew,
    colorItem: colorItemNew,
    sizeItem: sizeItemNew,
    priceItem: priceItemNew,
    categoryItem: categoryItemNew,
    keywordTagItem: keywordTagItemNew,
    titleTagItem: titleTagItemNew,
    descripTagItem: descripTagItemNew,
    authorItem: authorItemNew,
  });
};

const handleUpdateApi = async ({
  id,
  idItemNew,
  imgItemNew,
  urlItemNew,
  nameItemNew,
  bodyItemNew,
  bodyHtmlItemNew,
  qualityItemNew,
  colorItemNew,
  sizeItemNew,
  priceItemNew,
  categoryItemNew,
  keywordTagItemNew,
  titleTagItemNew,
  descripTagItemNew,
  authorItemNew,
}: UpdateProps) => {
  return await axios.put(API_URL + "/edit", {
    id: id,
    idItem: idItemNew,
    imgItem: imgItemNew,
    urlItem: urlItemNew,
    nameItem: nameItemNew,
    bodyItem: bodyItemNew,
    bodyHtmlItem: bodyHtmlItemNew,
    qualityItem: qualityItemNew,
    colorItem: colorItemNew,
    sizeItem: sizeItemNew,
    priceItem: priceItemNew,
    categoryItem: categoryItemNew,
    keywordTagItem: keywordTagItemNew,
    titleTagItem: titleTagItemNew,
    descripTagItem: descripTagItemNew,
    authorItem: authorItemNew,
  });
};
const handleDeleteApi = async (userId: any) => {
  return await axios.delete(API_URL + "/delete", {
    data: {
      idItem: userId,
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
