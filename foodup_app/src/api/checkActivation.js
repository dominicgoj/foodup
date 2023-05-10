import axios from "axios";
import { BACKEND_URL } from "../../config";

export async function checkActivation(type, input, code) {
  try {
    const response = await axios.post(BACKEND_URL + "/activation/check/", {
      [type]: input,
      code: code
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}