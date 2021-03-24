import React from "react";
import { Link } from "react-router-dom";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useDeleteUser } from "../api";

interface UserRowProps {
  user: {
    name: string;
    email: string;
    phone: string;
    id: number;
  };
}
export const UserRow: React.FC<UserRowProps> = (
  props: UserRowProps
): JSX.Element => {
  const { user } = props;
  const { mutate } = useDeleteUser();

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
      <TableRow>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">{user.phone}</TableCell>
        <TableCell align="right">
          <Link to={`/users/${user.id}`}>
            <IconButton aria-label="details">
              <Edit fontSize="small" />
            </IconButton>
          </Link>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
  );
};
