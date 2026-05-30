import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
console.log(API_BASE);

export const uploadAndTranscribe = async (payload) => {
  // Use the validated API_BASE
  console.log(`${API_BASE}/transcribe/process-image`);

  const response = await axios.post(
    `${API_BASE}/transcribe/process-image`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};

export const downloadDocument = async ({ userId, folder, fileName }) => {
  const response = await axios.get(
    `${API_BASE}/users/download-document/${userId}/${folder}/${fileName}`,
    { responseType: "blob" },
  );

  const url = URL.createObjectURL(
    new Blob([response.data], { type: response.headers["content-type"] }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
