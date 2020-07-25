import tlds from "./tlds";
import markdownIt from "markdown-it";

const md = markdownIt({
  html: false,
  breaks: false,
  linkify: true
});

md.linkify.tlds(tlds);

const defaultRender =
  md.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

// eslint-disable-next-line @typescript-eslint/camelcase
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex("target");

  if (aIndex < 0) {
    tokens[idx].attrPush(["target", "_blank"]);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    tokens[idx].attrs[aIndex][1] = "_blank";
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

export default (value: string) => md.render(value);
