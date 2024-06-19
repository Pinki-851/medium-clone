import { CONSTANT } from "@/constants";
import axios from "axios";

export async function uploadCludinary(formData: FormData) {
  const file = formData.get("file") as File;

  formData.append("upload_preset", `${CONSTANT.upload_preset}`);
  if (!file) {
    throw new Error("Image not found to upload");
  }

  const cloudinaryUploadUrl = ``;

  try {
    const response = await axios.post(cloudinaryUploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.log("error", error);
    throw new Error("somthing went wrong");
  }
}
