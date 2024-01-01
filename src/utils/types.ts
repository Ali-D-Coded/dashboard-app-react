import { UploadFile } from "antd";

export interface editSeller {
    key: string;
    username: string;
    shopName: string;
    email: string;
    password: string;
    contact: string;
    verified: boolean;
    files: UploadFile[];
  }