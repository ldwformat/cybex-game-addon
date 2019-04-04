import * as React from "react";
import {
  StyleRulesCallback,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  StyledComponentProps,
  colors,
  Avatar,
  Typography,
  Grid
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RoundedCardWithShadow } from "./styles";

export const EmptyTip = ({
  IconComponent,
  title,
  style
}: {
  IconComponent: React.ComponentType<SvgIconProps>;
  title: string;
  style?: any;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style
    }}
  >
    <IconComponent />
    <Typography
      style={{ color: colors.grey[500], marginTop: "0.8em" }}
      variant="body1"
    >
      {title}
    </Typography>
  </div>
);

export type ListColConfig = {
  header: string;
  name: string;
  align: "left" | "center" | "right";
  cell?: (value: any) => any;
  cellStyle?: React.CSSProperties;
};

type ListPanelProps = {
  title: string;
  listData: any[];
  colConfig: ListColConfig[];
  emptyComponent?: any;
};

const listPanelStyle: StyleRulesCallback = theme => ({
  card: {},
  cardHeader: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    boxSizing: "border-box",
    height: "48px"
  },
  th: {
    position: "sticky",
    background: theme.palette.grey[100],
    color: theme.palette.text.primary,
    fontSize: "14px",
    top: 0
  },
  trh: {
    height: "40px"
  },
  tr: {
    height: "48px"
  },
  td: {
    fontSize: "14px",
    border: 0,
    boxShadow: "inset 0 -1px 0 0 #f8f8f8"
  }
});

export const ListPanel = withStyles(listPanelStyle)(
  ({
    title,
    listData,
    colConfig,
    classes,
    emptyComponent
  }: ListPanelProps & StyledComponentProps) => {
    const { t, i18n } = useTranslation();
    classes = classes || {};
    return (
      <Grid
        component={Card}
        container
        direction="column"
        item
        xs
        style={{ height: "100%", ...RoundedCardWithShadow }}
      >
        <CardHeader
          classes={{ root: classes.cardHeader }}
          title={title}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider light />
        <Grid item xs container style={{ overflow: "auto" }}>
          {listData.length ? (
            <Table>
              <TableHead>
                <TableRow classes={{ root: classes.trh }}>
                  {colConfig.map(col => (
                    <TableCell
                      padding="dense"
                      classes={{ root: classes && classes.th }}
                      key={col.name}
                      align={col.align}
                    >
                      {t(col.header as string)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listData.map((item, i) => (
                  <TableRow key={i} classes={{ root: (classes as any).tr }}>
                    {colConfig.map(col => (
                      <TableCell
                        padding="dense"
                        classes={{ root: (classes as any).td }}
                        style={col.cellStyle}
                        align={col.align}
                        key={col.name}
                      >
                        {col.cell ? col.cell(item[col.name]) : item[col.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Grid
              container
              item
              xs
              direction="column"
              alignItems="center"
              justify="center"
            >
              {emptyComponent ? emptyComponent : <h1>Empty</h1>}
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
);
