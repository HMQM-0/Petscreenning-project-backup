import axios from "axios";
import Cookies from "js-cookie";

const ZAPIER_HOOK_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/13667700/bpmf9jp/";
const sendFidoTabbyAlertTag = async () => {
  try {
    const response = await axios.post(ZAPIER_HOOK_ENDPOINT, {
      pet_name: Cookies.get("petName"),
      tag_id: Cookies.get("tagId"),
    });
    return {
      error: "",
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      error: "An error has occured",
      data: null,
    };
  }
};

export default sendFidoTabbyAlertTag;
