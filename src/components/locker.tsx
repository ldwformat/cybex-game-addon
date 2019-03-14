import * as React from "react";
import PatternLock from "patternlock";
import "patternlock/dist/patternlock.css";
// import "./locker.less";
import { withStyles, StyledComponentProps, StyleRulesCallback } from "@material-ui/core";
import { Colors } from "./colors";

const styles: StyleRulesCallback = theme => ({
  locker: {
    background: "transparent",
    margin: "auto",
    "& .patt-wrap": {
      margin: 0
    },
    "& .patt-dots": {
      background: Colors.btnBgPrimary
      // background: theme.palette.secondary.main
    },
    "& .patt-lines": {
      background: Colors.btnBgPrimary,
      opacity: 0.7
    },
    "& .patt-circ.hovered": {
      boxShadow: `0 0 3px ${theme.palette.secondary.main}`,
      border: `3px solid ${theme.palette.secondary.main}`,
    },
  }
});

export const Locker = withStyles(styles)(
  class extends React.Component<StyledComponentProps<"locker">> {
    wrapper: HTMLDivElement | null = null;
    componentDidMount() {
      if (this.wrapper) {
        new PatternLock(`#patternLocker`, {
          // matrix: [4, 4],
          allowRepeat: true,
          onDraw: pattern => console.debug("Pattern: ", pattern)
        });
      }
    }
    render() {
      let classes = this.props.classes || {};
      return (
        <div
          id="patternLocker"
          className={classes.locker}
          ref={wrapper => (this.wrapper = wrapper)}
        />
      );
    }
  }
);
