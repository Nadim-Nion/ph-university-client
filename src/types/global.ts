import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import type React from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  totalDoc: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  message: string;
  success: boolean;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = { name: string; value: boolean | React.Key };

export type TFaculty = {
 _id: string;
  name: string;
}
