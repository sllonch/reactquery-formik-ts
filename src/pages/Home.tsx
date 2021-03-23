import React, { useState } from "react";
import { Redirect } from "react-router";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Formik, FormikProps, Form, Field } from "formik";
import { FormTextField } from "../components/FormTextField";
import { validationSchema } from "../validations";
import { useCreateUser } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      lineHeight: 1.25,
      marginBottom: 16,
      maxWidth: "50%",
      display: "block",
      margin: "0 auto",
    },
  })
);

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

export const Home: React.FC<FormValues> = () => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState<boolean>(false);
  const { mutate } = useCreateUser();

  const handleSubmit = async (values: Object, actions: any) => {
    mutate(values);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    setRedirect(true);
  };

  if (redirect) return <Redirect to={"/users"} />;

  return (
    <div>
      <Container maxWidth="md">
        <Box mb={3} p={2}>
          <Typography variant="h5" className={classes.box}>
            Formik with TypeScript and Material UI <br />
            with Validation by Yup
          </Typography>
          <Typography className={classes.box}>
            Submit the form with empty fields to view validation errors.
          </Typography>
        </Box>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid
                container
                justify="space-around"
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <Field
                    name="name"
                    label="Name"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    label="Email"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="phone"
                    label="Phone"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    color="primary"
                    disabled={formikProps.isSubmitting}
                    endIcon={<Send />}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};
