/* eslint-disable no-undef */
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
