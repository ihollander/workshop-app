const prismTheme = {
  plain: {
    color: "var(--color-primary)",
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
      types: [
        "property",
        "tag",
        "boolean",
        "number",
        "function-name",
        "constant",
        "symbol",
        "deleted",
      ],
      style: {
        color: "var(--font-color)",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char"],
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
      types: ["function", "builtin", "inserted", "dom"],
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
