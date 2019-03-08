import * as React from "react";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  Paper,
  Typography
} from "@material-ui/core";
import { ShareButton } from "../components/share-btn";

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

const Paragraph = ({
  title,
  contents = []
}: {
  title: string;
  contents?: string[];
}) => (
  <>
    <Typography
      variant="body1"
      style={{ marginTop: "1em", marginBottom: "0.5em" }}
      color="secondary"
    >
      {title}
    </Typography>
    {contents.map((p, i) => (
      <Typography key={i} variant="body2">
        {p}
      </Typography>
    ))}
  </>
);

export const ReferRule = withStyles(styles)(
  class ReferRule extends React.Component<
    StyledComponentProps<"root" | "copyCard" | "innerWrapper" | "buttonRoot">
  > {
    render() {
      let classes = this.props.classes || {};
      return (
        <Paper classes={{ root: classes.root }} square elevation={0}>
          <div style={{ flex: "1 10 auto", overflowY: "auto", margin: 16 }}>
            <Paragraph
              title="示例标题1"
              contents={[
                "这是一个测试段落",
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?`
              ]}
            />
            <Paragraph
              title="示例标题2"
              contents={[
                "这是一个测试段落",
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?`
              ]}
            />
          </div>
          <ShareButton />
        </Paper>
      );
    }
  }
);
