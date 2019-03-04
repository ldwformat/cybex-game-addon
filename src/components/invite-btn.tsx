import * as React from "react";
import { Subscription } from "indefinite-observable";
import { fromEvent, merge, NEVER } from "rxjs";
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
  const touchEnds = fromEvent(window, "touchend").pipe(
    map(touchEventToCoordinate)
  );

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
          position: "fixed"
        }}
      />
    );
  }
}
