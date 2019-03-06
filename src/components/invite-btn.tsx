import * as React from "react";
import { Subscription } from "indefinite-observable";
import { fromEvent, merge, NEVER, zip } from "rxjs";
import { map, takeUntil, switchMap } from "rxjs/operators";

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
  const touchEnds = merge(
    fromEvent(domItem, "touchend")
    // fromEvent(window, "touchend")
  ).pipe(map(touchEventToCoordinate));

  const starts$ = merge(mouseDowns, touchStarts);
  const moves$ = merge(mouseMoves, touchMoves);
  const ends$ = merge(mouseUps, touchEnds);

  return { starts$, moves$, ends$ };
}

export class InviteBtn extends React.Component<any> {
  wrapper: HTMLDivElement | null = null;
  subscription: Subscription | null = null;
  componentDidMount() {
    if (this.wrapper) {
      let { starts$, moves$, ends$ } = getObservables(this.wrapper);
      let { height, width } = this.wrapper.getBoundingClientRect();
      this.wrapper.style.left = window.innerWidth - width + "px";
      this.wrapper.style.top =
        Math.floor((window.innerHeight - height) * 0.75) + "px";
      this.wrapper.addEventListener("click", e => {
        if (this.props.onClick) {
          this.props.onClick();
        }
      });
      starts$
        .pipe(
          // takeUntil(moves$),
          switchMap(startP => ends$.pipe(map(endP => ({ startP, endP }))))
        )
        .subscribe(({ startP, endP }) => {
          if (
            Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2) <
            256
          ) {
            if (this.props.onClick) {
              this.props.onClick();
            }
          }
        });
      // zip(starts$, ends$).subscribe(([start, end]) => {
      //   console.debug("One pair");
      //   if (Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2) < 256) {
      //     if (this.props.onClick) {
      //       this.props.onClick();
      //     }
      //   }
      // });
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

  render() {
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        onClick={this.props.onClick}
        style={{
          width: 46,
          height: 46,
          borderRadius: "46px",
          opacity: 0.8,
          background: "lightsteelblue",
          boxShadow: "rgb(255, 255, 255) 0px 0px 8px",
          position: "fixed"
        }}
      />
    );
  }
}
