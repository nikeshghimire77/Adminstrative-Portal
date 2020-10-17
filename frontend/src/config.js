const prod = {
  apiGateway: {
    URL: "http://localhost:2000"
  }
};

const local = {
  apiGateway: {
    URL: "http://localhost:2000"
  }
};

let getConfig = () => {
  switch (process.env.REACT_APP_STAGE) {
    case "local":
      return local;
    default:
      return prod;
  }
};

const config = getConfig();

export default {
  ...config
};
