const prismTheme = {
  plain: {
    color: "var(--color-secondary)",
    fontFamily: "Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace",
  },
  styles: [
    {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#7f848e",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "var(--font-color-light)",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["attr-name", "boolean", "number"],
      style: {
        color: "var(--font-color)",
      },
    },
    {
      types: ["tag", "function-name", "constant", "symbol", "deleted"],
      style: {
        color: "var(--color-secondary)",
      },
    },
    {
      types: ["selector", "string", "char"],
      style: {
        color: "var(--purple)",
      },
    },
    {
      types: ["operator", "entity", "url"],
      style: {
        color: "gray",
      },
    },
    {
      types: ["property", "function", "builtin", "inserted", "dom"],
      style: {
        color: "var(--color-primary)",
      },
    },
    {
      types: ["atrule", "attr-value", "keyword", "class-name", "variable"],
      style: {
        color: "var(--pink)",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#e90",
      },
    },
  ],
};

export default prismTheme;
