import axios from "axios";
import { BACKEND_URL } from "../../config";

export default createAccount = async ({ datasetToCreate, setAccountCredentials }) => {
    try {
      console.log(datasetToCreate)
      const input = await axios.post(
        BACKEND_URL + "/user/create/",
        datasetToCreate
      );
      createdDataSet = {
        username: input.data.username,
        email: input.data.email,
        telephone: input.data.telephone,
        id: input.data.id,
      };
      setAccountCredentials(createdDataSet);
      return createdDataSet;
    } catch (error) {
      console.log(error);
    }
  };