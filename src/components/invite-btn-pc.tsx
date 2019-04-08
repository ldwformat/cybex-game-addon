import * as React from "react";
import { Subscription } from "indefinite-observable";
import { fromEvent, merge, NEVER, zip } from "rxjs";
import { map, takeUntil, switchMap } from "rxjs/operators";
import { Colors } from "./colors";
import { Fab, withStyles } from "@material-ui/core";
import { MoreVert, Image, Link, HelpOutline } from "@material-ui/icons";
import { PositionProperty } from "csstype";
import { StyleRules } from "@material-ui/core/styles";
import color from "@material-ui/core/colors/yellow";
import CopyToClipboard from "react-copy-to-clipboard";
import { Poster } from "./poster";
import { ShareButton, Panels } from "./share-btn";
import { DialogWrapper } from "./dialog-wrapper";
import { Paragraph, Rules } from "../pages/refer-rule";

function getObservables(domItem) {
  const mouseEventToCoordinate = mouseEvent => {
    mouseEvent.preventDefault();
    return {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY
    };
  };

  const touchEventToCoordinate = touchEvent => {
    touchEvent.preventDefault();
    touchEvent.stopPropagation();
    return {
      x: touchEvent.changedTouches[0].clientX,
      y: touchEvent.changedTouches[0].clientY
    };
  };

  const mouseDowns = fromEvent(domItem, "mousedown").pipe(
    map(mouseEventToCoordinate)
  );
  const mouseMoves = fromEvent(window, "mousemove").pipe(
    map(mouseEventToCoordinate)
  );
  const mouseUps = fromEvent(window, "mouseup").pipe(
    map(mouseEventToCoordinate)
  );

  const touchStarts = fromEvent(domItem, "touchstart").pipe(
    map(touchEventToCoordinate)
  );
  const touchMoves = fromEvent(domItem, "touchmove").pipe(
    map(touchEventToCoordinate)
  );
  const touchEnds = merge(fromEvent(domItem, "touchend")).pipe(
    map(touchEventToCoordinate)
  );

  const starts$ = merge(mouseDowns, touchStarts);
  const moves$ = merge(mouseMoves, touchMoves);
  const ends$ = merge(mouseUps, touchEnds);

  return { starts$, moves$, ends$ };
}

const menuBtnStyle = (left: number, top: number) => ({
  position: "absolute" as PositionProperty,
  width: "52px",
  height: "52px",
  left: left + "px",
  top: top + "px",
  boxShadow: "unset",
  transition: "0.2s all"
});

export const MenuBtn = ({
  onClick,
  open
}: {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
  open: boolean;
}) => (
  <Fab
    onClick={onClick}
    style={{ ...menuBtnStyle(0, 0), background: Colors.btnBgPrimary }}
  >
    <MoreVert
      style={{
        transform: `rotate(${open ? -90 : 0}deg)`,
        transition: "transform 0.2s",
        color: "white"
      }}
      fontSize="large"
    />
  </Fab>
);

const helpBtnStyle: StyleRules = {
  root: {
    backgroundColor: color[700],
    "&:hover": {
      backgroundColor: color[900]
    }
  }
};
export const HelpBtn = withStyles(helpBtnStyle)(
  ({
    onClick,
    open,
    classes
  }: {
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => any;
    open: boolean;
    classes?;
  }) => (
    <Fab
      className={classes.root}
      onClick={onClick}
      style={open ? menuBtnStyle(-104, -0) : menuBtnStyle(0, 0)}
    >
      <HelpOutline style={{ color: "white" }} fontSize="large" />
    </Fab>
  )
);

export class InviteBtnPC extends React.Component<
  {
    onCopyLinkClick;
    onHelpClick;
    copyText;
    accountName;
    accountReferUrl;
  },
  { [menuOpen: string]: boolean }
> {
  wrapper: HTMLDivElement | null = null;
  subscription: Subscription | null = null;

  state = {
    [Panels.Drawer]: false,
    [Panels.QRCode]: false,
    [Panels.RefReadme]: false
  };

  componentDidMount() {
    if (this.wrapper) {
      let { starts$, moves$, ends$ } = getObservables(this.wrapper);
      let { height, width } = this.wrapper.getBoundingClientRect();
      this.wrapper.style.left = window.innerWidth - width + "px";
      this.wrapper.style.top =
        Math.floor((window.innerHeight - height) * 0.75) + "px";

      let closeSub = fromEvent(window, "click").subscribe(e => {
        console.debug("Close: ", e);
        if (this.state[Panels.Drawer]) {
          this.setState({
            [Panels.Drawer]: false
          });
        }
      });

      this.subscription = starts$
        .pipe(
          switchMap(startE => {
            if (this.wrapper) {
              let { left, top } = this.wrapper.getBoundingClientRect();
              let deltaX = startE.x - left;
              let deltaY = startE.y - top;
              return moves$.pipe(
                takeUntil(ends$),
                map(origin => ({
                  ...origin,
                  startX: left,
                  startY: top,
                  deltaX,
                  deltaY
                }))
              );
            }
            return NEVER;
          })
        )
        .subscribe(({ x, y, deltaX, deltaY }) => {
          if (this.wrapper) {
            let { height, width } = this.wrapper.getBoundingClientRect();
            this.wrapper.style.left =
              Math.min(Math.max(0, x - deltaX), window.innerWidth - width) +
              "px";
            this.wrapper.style.top =
              Math.min(Math.max(0, y - deltaY), window.innerHeight - height) +
              "px";
          }
        });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  switchMenu = e => {
    console.debug("E: ", e);
    e.stopPropagation();
    this.handleExpand(Panels.Drawer);
  };

  handleExpand = (panel: Panels) => {
    this.setState(prev => ({
      [panel]: !prev[panel]
    }));
  };

  render() {
    let { accountReferUrl, accountName } = this.props;
    let menuOpen = this.state[Panels.Drawer];
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        style={{
          width: 52,
          height: 52,
          borderRadius: "52px",
          position: "fixed"
        }}
      >
        <Fab
          onClick={this.handleExpand.bind(this, Panels.QRCode)}
          color="secondary"
          style={menuOpen ? menuBtnStyle(-66, -66) : menuBtnStyle(0, 0)}
        >
          <Image style={{ color: "white" }} fontSize="large" />
        </Fab>
        <CopyToClipboard
          text={this.props.copyText}
          onCopy={this.props.onCopyLinkClick}
        >
          <Fab
            color="primary"
            style={menuOpen ? menuBtnStyle(-0, -104) : menuBtnStyle(0, 0)}
          >
            <Link style={{ color: "white" }} fontSize="large" />
          </Fab>
        </CopyToClipboard>
        <HelpBtn
          open={menuOpen}
          onClick={this.handleExpand.bind(this, Panels.RefReadme)}
        />
        <MenuBtn open={menuOpen} onClick={this.switchMenu} />
        <DialogWrapper
          hideHeader
          open={this.state[Panels.RefReadme]}
          onCloseClick={this.handleExpand.bind(this, Panels.RefReadme)}
        >
          <Rules />
        </DialogWrapper>
        <Poster
          open={this.state[Panels.QRCode]}
          onClose={this.handleExpand.bind(this, Panels.QRCode)}
          posterLink={accountReferUrl}
          filename={`cybex_invite_${accountName}.png`}
        />
      </div>
    );
  }
}
