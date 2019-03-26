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
  th: {
    position: "sticky",
    background: theme.palette.grey[100],
    top: 0
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
    return (
      <Grid
        component={Card}
        container
        direction="column"
        item
        xs
        style={{ height: "100%", ...RoundedCardWithShadow }}
      >
        <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
        <Divider light />
        <Grid item xs container style={{ overflow: "auto" }}>
          {listData.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  {colConfig.map(col => (
                    <TableCell
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
                  <TableRow key={i}>
                    {colConfig.map(col => (
                      <TableCell
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
