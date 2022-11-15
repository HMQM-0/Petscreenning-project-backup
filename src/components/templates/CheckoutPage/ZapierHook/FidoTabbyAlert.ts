import axios from "axios";
export const FIDO_TABBY_ALERT_TAGS_COOKIE = "FidoTabbyAlertTags";

export interface IFidoTabbyAlertTag {
  petName: string;
  tagId: string;
  name: string;
}

const ZAPIER_HOOK_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/13667700/bpmf9jp/";
const sendFidoTabbyAlertTag = async (
  tag: IFidoTabbyAlertTag,
  userEmail?: string | null,
  orderNumber?: string | null,
) => {
  try {
    const response = await axios.post(ZAPIER_HOOK_ENDPOINT, {
      pet_name: tag.petName.toUpperCase(),
      tag_id: tag.tagId,
      order_number: orderNumber,
      email: userEmail,
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
