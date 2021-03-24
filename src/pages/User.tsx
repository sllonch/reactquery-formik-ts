import React, { useState } from "react";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Input,
  InputLabel,
  Grid,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Save, ArrowBack } from "@material-ui/icons";
import { useUpdateUser, useUser } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      lineHeight: 1.25,
      marginBottom: 16,
    },
  })
);

interface Data {
  name: string;
  email: string;
  phone: string;
  id: string;
}

interface ParamTypes {
  id: string;
}

export const User: React.FC<Data> = () => {
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();
  const { data, isLoading } = useUser(id);
  const { mutate } = useUpdateUser();
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async () => {
    mutate(data);
    setRedirect(true);
  };

  const handleBack = async () => {
    setRedirect(true);
  };

  const handleChange = (e: any) => {
    const key = e.target.id;
    data[key] = e.target.value;
  };

  if (isLoading) return <div>Loading...</div>;

  if (redirect) return <Redirect to={"/users"} />;

  return (
    <Container maxWidth="md">
      <Box mb={3} p={2}>
        <Typography variant="h5" className={classes.box}>
          User #{data.id}
        </Typography>
      </Box>
      <Grid container spacing={3} justify="center">
        {Object.entries(data as Data).filter(field => field[0] !== "id").map(([key, value]) => {
            return (
              <Grid key={key} item xs={8}>
                <InputLabel shrink>{key}</InputLabel>
                <Input
                  id={key}
                  defaultValue={value}
                  name={key}
                  type="text"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            );
        })}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={8}>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              size="large"
              color="primary"
              onClick={handleBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              endIcon={<Save />}
              variant="outlined"
              size="large"
              color="primary"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
