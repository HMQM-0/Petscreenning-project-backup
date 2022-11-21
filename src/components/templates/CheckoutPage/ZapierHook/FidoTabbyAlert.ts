import axios from "axios";
export const FIDO_TABBY_ALERT_TAGS_COOKIE = "FidoTabbyAlertTags";

export interface IFidoTabbyAlertTag {
  petName: string;
  tagId: string;
  variantId: string;
}

const ZAPIER_HOOK_ENDPOINT = "https://hooks.zapier.com/hooks/catch/13667700/bpmf9jp/";
const sendFidoTabbyAlertTag = async (tag: IFidoTabbyAlertTag, userEmail?: string | null) => {
  try {
    console.log("variantId:", tag?.variantId);
    const response = await axios
      .create({ transformRequest: [(data, _headers) => JSON.stringify(data)] })
      .post(ZAPIER_HOOK_ENDPOINT, {
        pet_name: tag?.petName?.toUpperCase(),
        tag_id: tag?.tagId,
        order_number: tag?.variantId,
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
