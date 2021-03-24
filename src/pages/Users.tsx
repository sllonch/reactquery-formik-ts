import React, { useState } from "react";
import { Redirect } from "react-router";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
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
import { ArrowBack } from "@material-ui/icons";
import { UserRow } from "../components/UserRow"; 
import { useUsers } from "../api";

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
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleClick = () => {
    setRedirect(true);
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
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
