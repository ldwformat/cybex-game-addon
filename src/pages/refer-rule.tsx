import * as React from "react";
import {
  withStyles,
  StyledComponentProps,
  StyleRulesCallback,
  Paper,
  Typography
} from "@material-ui/core";
import { ShareButton } from "../components/share-btn";
import {
  withTranslation,
  WithTranslation,
  useTranslation
} from "react-i18next";
import { Dict } from "../providers/i18n";

const styles: StyleRulesCallback = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

export const Paragraph = ({
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
      dangerouslySetInnerHTML={{ __html: title }}
    />
    {contents.map((p, i) => (
      <Typography
        style={{ marginTop: "1em", textAlign: "justify" }}
        key={i}
        variant="body2"
        dangerouslySetInnerHTML={{ __html: p }}
      />
    ))}
  </>
);

export const Rules = () => {
  const { t, i18n } = useTranslation();
  return (
    <Paragraph
      title={t(Dict.RefererRuleTitle)}
      contents={[0, 1, 2, 3, 4, 5].map(num =>
        t(Dict["RefererRuleContent_" + num])
      )}
    />
  );
};

export const ReferRule = withStyles(styles)(
  withTranslation()(
    class ReferRule extends React.Component<
      StyledComponentProps<
        "root" | "copyCard" | "innerWrapper" | "buttonRoot"
      > &
        WithTranslation
    > {
      render() {
        let classes = this.props.classes || {};
        let { t } = this.props;
        return (
          <Paper classes={{ root: classes.root }} square elevation={0}>
            <div style={{ flex: "1 10 auto", overflowY: "auto", margin: 16 }}>
              <Paragraph
                title={t(Dict.RefererRuleTitle)}
                contents={[0, 1, 2, 3, 4, 5].map(num =>
                  t(Dict["RefererRuleContent_" + num])
                )}
              />
            </div>
            <ShareButton />
          </Paper>
        );
      }
    }
  )
);
