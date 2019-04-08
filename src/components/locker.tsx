import * as React from "react";
import PatternLock from "patternlock";
// import "patternlock/dist/patternlock.css";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  Typography
} from "@material-ui/core";
import { Colors } from "./colors";
import { MapDispatchToProps, connect } from "react-redux";
import { authSetWalletPass, authUnlock } from "../core/auth";
import { withTranslation, WithTranslation } from "react-i18next";
import { Dict } from "../providers/i18n";

type LockerPropsDispatch = {
  setPassword: typeof authSetWalletPass;
  unlock: typeof authUnlock;
};
const mapDispatch: MapDispatchToProps<LockerPropsDispatch, {}> = {
  setPassword: authSetWalletPass,
  unlock: authUnlock
};

const styles: StyleRulesCallback = theme => ({
  locker: {
    background: "transparent",
    margin: "auto",
    "&.patt-hidden ": {
      "& .patt-lines": {
        display: "none"
      }
    },
    "&.patt-error": {
      "& .patt-circ.hovered": {
        border: `3px solid ${theme.palette.error.main}`,
        background: theme.palette.error.light,
        opacity: 0.4
      },
      "& .patt-dots": {
        background: theme.palette.error.main
        // background: theme.palette.secondary.main
      }
    },
    "& .patt-wrap": {
      margin: 0,
      position: "relative",
      cursor: "pointer",
      "& ul, & li": {
        listStyle: "none",
        margin: 0,
        padding: 0
      }
    },
    "& .patt-dots": {
      background: Colors.btnBgPrimary,
      width: "10px",
      height: "10px",
      borderRadius: "5px",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: "-5px",
      marginLeft: "-5px"
      // background: theme.palette.secondary.main
    },
    "& .patt-lines": {
      background: Colors.btnBgPrimary,
      opacity: 0.5,
      borderRadius: "5px",
      height: "10px",
      position: "absolute",
      transformOrigin: "5px 5px"
    },
    "& .patt-circ.hovered": {
      boxShadow: `0 0 3px ${theme.palette.secondary.main}, inset 0 0 3px ${
        theme.palette.secondary.main
      }`,
      border: `3px solid ${theme.palette.secondary.main}`
    },
    "& .patt-circ": {
      position: "relative",
      float: "left",
      boxSizing: "border-box",
      transition: "0.3s all",
      color: "transparent"
    }
  }
});
export enum LockerType {
  Lock,
  Unlock
}
export const Locker = withStyles(styles)(
  connect(
    null,
    mapDispatch
  )(
    withTranslation()(
      class extends React.Component<
        WithTranslation &
          StyledComponentProps<"locker"> & {
            type: LockerType;
          } & Partial<LockerPropsDispatch>
      > {
        static defaultProps = { type: LockerType.Lock };
        wrapper: HTMLDivElement | null = null;
        lock: any | null = null;
        state = {
          current: "",
          notMatchError: false
        };

        setPass = (pattern: string) => {
          if (!this.state.current) {
            this.lock && this.lock.reset();
            return this.setState({
              current: pattern
            });
          }
          if (pattern !== this.state.current) {
            if (this.lock) {
              this.lock.error();
            }
            return this.setState(
              {
                notMatchError: true
              },
              () => {
                setTimeout(() => {
                  this.lock.reset();
                  if (this.state.notMatchError) {
                    this.setState({
                      notMatchError: false,
                      current: ""
                    });
                  }
                }, 2000);
              }
            );
          }
          this.lock && this.lock.reset();
          return this.props.setPassword && this.props.setPassword(pattern);
        };

        unlock = (pattern: string) => {
          this.props.unlock && this.props.unlock(pattern);
          if (this.lock) {
            this.lock.reset();
          }
        };

        setupLock = () => {
          if (this.wrapper) {
            let lock = (this.lock = new PatternLock(`#patternLocker`, {
              allowRepeat: true,
              enableSetPattern: true,
              onDraw:
                this.props.type === LockerType.Lock ? this.setPass : this.unlock
            }));
          }
        };

        componentDidMount() {
          this.setupLock();
        }

        render() {
          let classes = this.props.classes || {};
          let { t, type } = this.props;
          return (
            <>
              {type === LockerType.Lock && (
                <Typography align="center" variant="body1">
                  {t(Dict.SetLockTitle)}
                </Typography>
              )}
              <div
                id="patternLocker"
                className={classes.locker}
                ref={wrapper => (this.wrapper = wrapper)}
              />
              {type === LockerType.Lock && (
                <div style={{ height: "2em" }}>
                  {this.state.current && !this.state.notMatchError && (
                    <Typography
                      align="center"
                      variant="body1"
                      color="secondary"
                    >
                      {t(Dict.SetLockAgain)}
                    </Typography>
                  )}
                  {this.state.notMatchError && (
                    <Typography align="center" variant="body1" color="error">
                      {t(Dict.SetLockError)}
                    </Typography>
                  )}
                </div>
              )}
            </>
          );
        }
      }
    )
  )
);
