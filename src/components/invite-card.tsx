import * as React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  colors,
  CardContent,
  withStyles,
  StyleRulesCallback,
  StyledComponentProps,
  Grid
} from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RoundedCardWithShadow } from "./styles";

type InviteCardProps = {
  children?: any;
  color?: string;
  title: string;
  IconComponent: React.ComponentType<SvgIconProps>;
};

const styles: StyleRulesCallback = theme => ({
  avatar: {
    marginRight: theme.spacing.unit
  }
});

export const InviteCard = withStyles(styles)(
  ({
    children,
    IconComponent,
    title,
    classes,
    color = colors.grey[300]
  }: InviteCardProps & StyledComponentProps) => {
    classes = classes || {};
    return (
      <Card style={{ ...RoundedCardWithShadow, height: "100%" }}>
        <CardHeader
          avatar={
            <Avatar style={{ background: color, width: 32, height: 32 }}>
              <IconComponent />
            </Avatar>
          }
          style={{
            padding: "16px 24px 8px 24px"
          }}
          classes={{
            avatar: classes.avatar
          }}
          title={title}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Grid
          container
          component={CardContent}
          alignItems="center"
          justify="space-around"
          style={{ minHeight: "6.4em" }}
        >
          {children}
        </Grid>
      </Card>
    );
  }
);
