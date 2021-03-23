import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Edit, Delete, ArrowBack } from "@material-ui/icons";
import { useUsers, useDeleteUser } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    box: {
      lineHeight: 1.25,
      marginBottom: 16,
    },
  })
);

export const Users: React.FC = () => {
  const classes = useStyles();
  const { data, isLoading } = useUsers();
  const { mutate } = useDeleteUser();
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleClick = () => {
    setRedirect(true);
  };

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  if (redirect) return <Redirect to={"/"} />;

  return (
    <Container maxWidth="md">
      <Box mb={3} p={2}>
        <Typography variant="h5" className={classes.box}>
          Users
        </Typography>
        <Grid container justify="flex-end">
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleClick}
          >
            Back
          </Button>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user: any) => (
              <TableRow key={user.id}>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
