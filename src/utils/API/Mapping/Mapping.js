const azure_url = "https://aientranceapi.azurewebsites.net";
const local_url = "http://localhost:5122";
const global_url = azure_url;

const FILE_ENUMS = {
  Example: 0,
  SigmaExample: 1,
  CustomerTemplate: 2,
  SigmaTemplate: 3,
};

const getHeader = () => {
  return {
    APIkey: "vlora-pizza-speciale",
    accept: "*/*",
    "Content-Type": "application/json",
  };
};

const PostMapping = async (data, clientId) => {
  const body = {
    mappings: data,
  };
  const url = `${global_url}/api/InvoiceTemplate/client/${clientId}/mappings`;
  const res = await fetch(url, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(body),
  });

  return res;
};

const PostExampleFile = async (file, clientId) => {
  const url = `${global_url}/api/InvoiceTransformation/example/${clientId}`;
  const formData = new FormData();
  formData.append("file", file, file.name);

  const res = await fetch(url, {
    method: "POST",
    headers: getHeader(),
    body: formData,
  });
  return res;
};

const GetSigmaExampleFile = async (clientId) => {
  const url = `${global_url}/api/InvoiceTemplate/client/${clientId}/files?type=${FILE_ENUMS.SigmaExample}`;
  const res = await fetch(url, {
    method: "GET",
    headers: getHeader(),
  });

  return await res.text();
};

const PostTransformationFile = async (file, clientId) => {
  const url = `${global_url}/api/InvoiceTransformation/transform/${clientId}`;
  const formData = new FormData();
  formData.append("file", file, file.name);

  const res = await fetch(url, {
    method: "POST",
    headers: getHeader(),
    body: formData,
  });
  return await res.text();
};

export {
  PostMapping,
  PostExampleFile,
  GetSigmaExampleFile,
  PostTransformationFile,
};
