import axios from "axios";
export const FIDO_TABBY_ALERT_TAGS_COOKIE = "FidoTabbyAlertTags";

export interface IFidoTabbyAlertTag {
  petName: string;
  tagId: string;
  name: string;
  variantId: string;
}

const ZAPIER_HOOK_ENDPOINT = "/api/handleZapierTags";

const sendFidoTabbyAlertTag = async (tag: IFidoTabbyAlertTag, userEmail?: string | null, orderId?: string) => {
  try {
    const response = await axios.post(ZAPIER_HOOK_ENDPOINT, {
      pet_name: tag?.petName?.toUpperCase(),
      tag_id: tag?.tagId,
      order_number: orderId,
      email: userEmail,
      tag_type: tag?.name,
      line_id: tag?.variantId,
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
