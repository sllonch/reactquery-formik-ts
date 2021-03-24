import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";

const API_URL = "http://localhost:4000";

export function useUsers() {
  const queryClient = useQueryClient();
  //HOOK via useQuery
  return useQuery(
    "users",
    () => axios.get(`${API_URL}/users`).then((res) => res.data),
    {
      onSuccess: (users) => {
        users.forEach((user: any) => {
          queryClient.setQueryData(["users", user.id], user);
        })
      },
    }
  );
}

export function useUser(id: string) {
  const queryClient = useQueryClient();
  //HOOK via useQuery
  return useQuery(
    ["users", id],
    () => axios.get(`${API_URL}/users/${id}`).then((res) => res.data),
    {
      initialData: () => {
        return queryClient
          .getQueryData<any>("users")
          ?.find((d: any) => d.id === parseInt(id));
      }
    }
  );
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  //HOOK via useMutation
  return useMutation(
    (user: object) =>
      axios.post(`${API_URL}/users`, user).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  //HOOK via useMutation
  return useMutation(
    (user: any) =>
      axios
        .put(`${API_URL}/users/${user.id}`, user)
        .then((res) => res.data),
    {
      onMutate: (user: any) => {
        queryClient.setQueryData<any>(["users", user.id], user);
      },
      onSuccess: (user: any) => {
        queryClient.setQueryData<any>(["users", user.id], user);
        if(queryClient.getQueryData<any>("users")) {
          queryClient.setQueryData<any>("users", (old: any) => {
            return old.map((d: any) => {
              if (d.id === user.id) {
                return user;
              }
              return d;
            });
          });
        } else {
          queryClient.setQueryData<any>("users", [user]);
        }
      },
    }
  );
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  //HOOK via useMutation
  return useMutation(
    (id: number) =>
      axios.delete(`${API_URL}/users/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries("users");
      },
    }
  );
}
