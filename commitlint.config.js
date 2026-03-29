module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // optional custom rules
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "test",
      ],
    ],
    "subject-case": [0, "never", []],
  },
};
