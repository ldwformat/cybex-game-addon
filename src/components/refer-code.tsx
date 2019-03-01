import * as React from "react";
import { Observable, from, fromEvent } from "rxjs";
import { Subscription } from "indefinite-observable";
import { debounceTime } from "rxjs/operators";
import {
  StyleRulesCallback,
  withStyles,
  StyledComponentProps,
  Grid,
  Typography
} from "@material-ui/core";

const ReferBg = require("../assets/images/refer-bg.jpg");

const referCodeStyle: StyleRulesCallback = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px`,
    height: 160,
    filter: `drop-shadow(0 ${(theme.spacing.unit * 3) / 4}px ${(theme.spacing
      .unit *
      3) /
      4}px rgba(0,0,0,0.25))`
  },
  cardRoot: {
    clipPath: "url(#mask)",
    width: "100%",
    height: "100%",
    borderRadius: `${theme.spacing.unit}px`
  },
  cardMain: {
    backgroundImage: `url(${ReferBg})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textRoot: {
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  }
});

export const ReferCode = withStyles(referCodeStyle)(
  class extends React.Component<
    { code?: string } & StyledComponentProps<
      "root" | "cardRoot" | "cardMain" | "cardShadow" | "textRoot"
    >
  > {
    wrapper: HTMLDivElement | null = null;
    resize$: Subscription | null = null;
    state = {
      width: 279
    };

    componentDidMount() {
      this.fixWidth();
      this.resize$ = fromEvent(window, "resize")
        .pipe(debounceTime(100))
        .subscribe(() => this.fixWidth());
    }

    componentWillUnmount() {
      if (this.resize$) {
        this.resize$.unsubscribe();
      }
    }

    componentDidCatch() {
      this.fixWidth();
    }

    fixWidth = () => {
      if (
        this.wrapper &&
        this.wrapper.getBoundingClientRect().width !== this.state.width
      ) {
        this.setState({
          width: this.wrapper.getBoundingClientRect().width
        });
      }
    };

    render() {
      let { classes, code } = this.props;
      return (
        <div className={classes && (classes.root as string)}>
          <svg style={{ position: "fixed", zIndex: -1 }}>
            <defs>
              <clipPath id="mask" viewBox="0 0 279 160">
                <path
                  d={`M 0 0 V 70 A 10 10 0 1 1 0 90 V 160 H ${
                    this.state.width
                  } V 90 a 10 10 0 0 1 0 -20 V 0 z`}
                />
              </clipPath>
            </defs>
          </svg>
          <div
            ref={wrapper => (this.wrapper = wrapper)}
            className={
              classes && (classes.cardRoot as string) + " " + classes.cardMain
            }
          >
            <Grid container item xs justify="center" alignItems="center">
              <Typography
                classes={{ root: classes && classes.textRoot }}
                variant="body1"
              >
                您的推荐码
              </Typography>
            </Grid>
            <div
              style={{
                borderBottom: "2px dashed rgba(255,255,255,0.5)",
                margin: "0 16px"
              }}
            />
            <Grid container item xs justify="center" alignItems="center">
              <Typography
                variant="h5"
                classes={{ root: classes && classes.textRoot }}
              >
                {code && code}
              </Typography>
            </Grid>
          </div>
        </div>
      );
    }
  }
);
