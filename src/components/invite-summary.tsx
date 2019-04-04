import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  withStyles,
  StyledComponentProps,
  Card,
  colors,
  StyleRulesCallback
} from "@material-ui/core";
import { RoundedCardWithShadow } from "./styles";
import { Dict } from "../providers/i18n";
type InviteSummaryProps = {
  amount: string | number;
  title: string;
};

const styles: StyleRulesCallback = theme => ({
  container: {
    height: "231px",
    background: `url(${require("../assets/images/invite-bg.svg")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    ...RoundedCardWithShadow,
    boxShadow: "0 8px 8px -4px rgba(120,129,154,0.5)"
  },
  font: {
    color: theme.palette.getContrastText("#000")
  }
});

export const InviteSummary = withStyles(styles)(
  ({
    amount = 0,
    title,
    classes
  }: InviteSummaryProps & StyledComponentProps<"container" | "font">) => {
    classes = classes || {};
    let { t, i18n } = useTranslation();
    return (
      <Grid
        classes={{ container: classes.container }}
        component={({ children, ...rest }) => <Card {...rest}>{children}</Card>}
        xs
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography classes={{ root: classes.font }} component="p" variant="h6">
          {t(Dict.TotalRebates)}
        </Typography>
        <Typography
          classes={{ root: classes.font }}
          component="h1"
          variant="h1"
          style={{ fontWeight: 500 }}
        >
          {Number(amount).toFixed(2)}
        </Typography>
      </Grid>
    );
  }
);
