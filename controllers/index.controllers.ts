import {
  Response,
  Request,
  Body,
  RouteParams,
} from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [{
  id: "1",
  name: "Andres",
}];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "successful Query",
    users,
  };
};

export const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const userFound = users.find((user) => user.id === params.id);
  if (userFound) {
    response.status = 200;
    response.body = {
      message: "You got a single user",
      userFound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  }
};

export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body: Body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Body is required",
    };
  } else {
    const newUser: User = body.value;
    newUser.id = v4.generate();
    users.push(newUser);

    response.status = 200;
    response.body = {
      message: "New user created",
      newUser,
    };
  }
};

export const updateUser = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: { id: string };
  },
) => {
  const userFound = users.find((user) => user.id === params.id);
  if (!userFound) {
    response.status = 404;
    response.body = {
      message: "User Not Found",
    };
  } else {
    const body = await request.body();
    const updatedProduct = body.value;

    users = users.map((user) =>
      user.id === params.id ? { ...user, ...updatedProduct } : user
    );

    response.status = 200;
    response.body = {
        users,
    }
  }
};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "User Deleted Successfully",
    users,
  };
};
