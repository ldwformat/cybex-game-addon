import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { PositionProperty } from "csstype";
import {
  Dialog,
  IconButton,
  DialogTitle,
  Grid,
  Typography
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { DialogProps } from "@material-ui/core/Dialog";
import { unstable_useMediaQuery } from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";
import { TypographyProps } from "@material-ui/core/Typography";

type DialogWrapperProps = {
  title?: string;
  open: boolean;
  onCloseClick: any;
  children?: any;
  titleProps?: TypographyProps;
  dialogProps?: DialogProps;
};

const useStyles = makeStyles(
  theme => ({
    paper: {
      position: "relative" as PositionProperty,
      width: "90vw",
      maxWidth: "536px"
    },
    header: {
      position: "absolute" as PositionProperty,
      right: "36px",
      top: 0,
      zIndex: 100,
      "(max-width:599px)": {
        right: 0
      },
      "(min-width:600px)": {
        right: "36px"
      }
    }
  }),
  { withTheme: true }
);

export const DialogWrapper = ({
  title,
  open,
  onCloseClick,
  children,
  dialogProps,
  titleProps,
  ...rest
}: DialogWrapperProps) => {
  const classes = useStyles();
  const matches = unstable_useMediaQuery("(min-width:600px)");
  const { t, i18n } = useTranslation();
  return (
    <Dialog
      open={open}
      classes={{
        paper: classes.paper,
        ...(dialogProps || { classes: {} }).classes
      }}
      onClose={onCloseClick}
      {...dialogProps}
    >
      <div
        style={{
          padding: matches ? "16px 48px 0 48px" : 0,
          boxShadow: matches ? "inset 0 -1px 0 0 #f8f9fb" : "unset"
        }}
      >
        {matches ? (
          <Grid
            container
            style={{ height: "64px" }}
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h4" {...titleProps}>
              {title ? t(title) : null}
            </Typography>
            <IconButton onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
          </Grid>
        ) : (
          <div
            className={classes.header}
            style={{ right: matches ? "36px" : 0 }}
          >
            <IconButton onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div
        style={{
          padding: matches ? "0 48px 32px 48px" : "16px"
        }}
      >
        {children}
      </div>
    </Dialog>
  );
};
