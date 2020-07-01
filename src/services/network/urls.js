const getBaseUrl = () => {
  return 'https://aveosoft-react-assignment.herokuapp.com/'
};

export const getUrl = (type) => {
  const baseUrl = getBaseUrl();

  switch (type) {
    //Common
    case 'product_list':
      return `${baseUrl}products`;
    case 'product_detail':
      return `${baseUrl}products`;
    case 'category':
      return `${baseUrl}categories`;
   
    default:
      return `${baseUrl}/`;
  }
};
